const fp = require('lodash/fp')
const Router = require('koa-router')


module.exports = users => {

    const router = new Router()

    router.post('/', (ctx, next) => {

        const body = ctx.request.body

        if (fp.isEmpty(body)) reject(Errors.BAD_REQUEST)

        const res = new Promise((resolve, reject) => {

            users.insertOne(body, (err, result) => {

                if (err) reject(Errors.DATABASE_WRITE_ERROR)

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
