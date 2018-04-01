const jwt = require('jsonwebtoken')
const fp = require('lodash/fp')
const Errors = require('./constants/error-codes.js')


const extractToken = token => fp.last(fp.split(' ', token))

const verify = async (ctx, next) => {

    const token = extractToken(fp.get('headers.authorization', ctx))

    try {
        ctx.user = await new Promise((resolve, reject) => {
            jwt.verify(token, 'super-secret-jwt', (err, res) => {
                if (!err) {
                    resolve(res)
                } else {
                    reject(Errors.notAuthenticated())
                }
            })
        })
    } catch (err) {
        ctx.status = 401
        ctx.body = err
    }

    await next()
}

module.exports = {
    verify
}
