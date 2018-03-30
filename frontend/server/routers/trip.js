const Router = require('koa-router')
const ErrorCodes = require('../constants/error-codes.js')
const tripVO = require('../parsers/trip-vo.js')
const Auth = require('../auth.js')


module.exports = trips => {

    const router = new Router()

    router.post('/', Auth.verify, (ctx, next) => {

        const body = ctx.request.body

        const trip = tripVO(body)

        if (trip.error) {
            const { status, message } = ErrorCodes.badRequest(trip.message)
            ctx.throw(status, message)
        }

        const res = new Promise((resolve, reject) => {

            trips.insertOne(trip.data, (err, result) => {

                if (err) reject(ErrorCodes.dbWriteError())

                resolve({
                    message: `Trip written to database`,
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
