const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fp = require('lodash/fp')
const Router = require('koa-router')
const passport = require('passport')
const Errors = require('../constants/error-codes.js')
const handleError = require('../utils/handle-error.js')


const parseUser = user => {

    return new Promise((resolve, reject) => {

        if (!fp.has('username', user) || !fp.has('password', user)) {
            reject(Errors.BAD_REQUEST)
        }

        bcrypt.hash(user.password, 10)
            .then(
                password => { resolve({...user, password}) },
                err => { reject(Errors.BAD_REQUEST) }
            )
    })
}

const generateToken = ({ username }) => {

    return jwt.sign({ username }, 'super-secret-jwt', { expiresIn: 86400 })
}

const login = ctx => {

    return passport.authenticate('local', (err, user, info, status) => {

        if (user) {
            ctx.login(user)
            ctx.body = {
                message: 'Logged in successfully',
                status: 'ok',
                token: generateToken(user)
            }
        } else {
            ctx.status = 401
            ctx.body = { status: 'error' }
        }
    })(ctx)
}


module.exports = {
    generateToken,
    login,
    parseUser
}
