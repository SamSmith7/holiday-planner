const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const graphqlHTTP = require('koa-graphql')
const Router = require('koa-router')
const serve = require('koa-static')
const resolver = require('./graphql/resolver.js')
const schema = require('./graphql/schema.js')
const TripRouter = require('./routers/trip.js')
const UsersRouter = require('./routers/users.js')
const Auth = require('./auth.js')
const db = require('./db.js')


const dbConfig = {
    url: 'mongodb://localhost:27017'
}

const app = new Koa()
const router = new Router({ prefix: '/api' })

db.connect(dbConfig).then(client => {

    const db = client.db('holiday-planner')

    const collections = {
        trips: db.collection('trips'),
        users: db.collection('users')
    }

    const tripRouter = TripRouter(collections.trips)
    router.use('/trip', tripRouter.routes(), tripRouter.allowedMethods())

    const userRouter = UsersRouter(collections.users)
    router.use('/users', userRouter.routes(), userRouter.allowedMethods())

    router.get('/me', Auth.verify, (ctx, next) => {

        ctx.body = 'Authenticated'
    })

    router.all('/graphql', /* Auth.verify, */ graphqlHTTP({
        rootValue: resolver(collections),
        schema,
        graphiql: true
    }))

    app.use(bodyparser())

    app.use(router.routes())
    app.use(router.allowedMethods())

    app.use(serve('./dist'))

    app.listen(4000)
    console.log('Server Running on Port 4000')
})
