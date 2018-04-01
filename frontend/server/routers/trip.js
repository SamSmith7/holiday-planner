const fp = require('lodash/fp')
const Router = require('koa-router')
const shortid = require('shortid')
const ErrorCodes = require('../constants/error-codes.js')
const tripVO = require('../parsers/trip-vo.js')
const Auth = require('../auth.js')


module.exports = trips => {

    const router = new Router()

    router.post('/:id', Auth.verify, (ctx, next) => {

        const parsedBody = tripVO(ctx.request.body, false)

        if (parsedBody.error) {
            const { status, message } = ErrorCodes.badRequest(parsedBody.message)
            ctx.throw(status, message)
        }

        const id = ctx.params.id
        const trip = {
            $set: {
                ...fp.pickBy(fp.negate(fp.isEmpty), parsedBody.data),
                id
            }
        }

        return trips.updateOne({ id }, trip).then(
            ({ result }) => {
                if (result.n !== 1) {
                    const err = ErrorCodes.badRequest('The record to update was not found, check the id you supplied.')
                    ctx.throw(err.status, err.message)
                } else {
                    ctx.body = { message: `Trip ${id} updated successfully` }
                }
            },
            () => {
                const err = ErrorCodes.dbWriteError()
                ctx.throw(err.status, err.message)
            }
        )
    })

    router.post('/', Auth.verify, (ctx, next) => {

        const parsedBody = tripVO(ctx.request.body)

        if (parsedBody.error) {
            const { status, message } = ErrorCodes.badRequest(parsedBody.message)
            ctx.throw(status, message)
        }

        const trip = {
            ...parsedBody.data,
            id: shortid.generate()
        }

        const res = new Promise((resolve, reject) => {

            trips.insertOne(trip, (err, result) => {

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
