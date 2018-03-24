const bcrypt = require('bcrypt')
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

module.exports = users => {

    const router = new Router()

    router.post('/register', async ctx => {

        const user = await parseUser(ctx.request.body)

        if (fp.isEmpty(user)) return handleError(Errors.BAD_REQUEST)

        try {
            await users.insertOne(user)
        } catch(e) {
            return handleError(Errors.DATABASE_WRITE_ERROR)
        }

        return passport.authenticate('local', (err, user, info, status) => {

            if (user) {
                ctx.login(user)
                ctx.body = { message: 'Logged in successfully', status: 'ok' }
            } else {
                ctx.status = 400
                ctx.body = { status: 'error' }
            }
        })(ctx)
    })

    router.post('/login', async ctx => {

        return passport.authenticate('local', (err, user, info, status) => {

            if (user) {
                ctx.login(user)
                ctx.body = { message: 'Logged in successfully', status: 'ok' }
            } else {
                ctx.status = 400
                ctx.body = { status: 'error' }
            }
        })(ctx)
    })

    return router
}
