const fp = require('lodash/fp')
const Router = require('koa-router')
const ErrorCodes = require('../constants/error-codes.js')


module.exports = users => {

    const router = new Router()

    router.post('/', (ctx, next) => {

        const body = ctx.request.body

        const res = new Promise((resolve, reject) => {

            if (fp.isEmpty(body)) reject(ErrorCodes.badRequest('Request body should contain a user object'))

            users.insertOne(body, (err, result) => {

                if (err) reject(ErrorCodes.dbWriteError())

                resolve({
                    message: `${result.ops.length} users written to database`,
                    status: 'success'
                })
            })
        })

        return res.then(
            res => { ctx.body = res },
            err => { ctx.throw(err.status, err.message) }
        )
    })

    return router
}
