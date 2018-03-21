const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const graphqlHTTP = require('koa-graphql')
const mount = require('koa-mount')
const Router = require('koa-router')
const serve = require('koa-static')
const Errors = require('./constants/error-codes.js')
const resolver = require('./graphql/resolver.js')
const schema = require('./graphql/schema.js')
const UserRouter = require('./routers/users.js')
const db = require('./db.js')


const dbName = 'holiday-planner'
const dbConfig = {
    url: 'mongodb://localhost:27017'
}

const app = new Koa()
const router = new Router({ prefix: '/api'})

db.connect(dbConfig).then(client => {

    const db = client.db('holiday-planner')

    const collections = {
        users: db.collection('users')
    }

    const userRouter = UserRouter(collections.users)
    router.use('/users', userRouter.routes(), userRouter.allowedMethods())

    app.use(bodyparser())

    app.use(router.routes())
    app.use(router.allowedMethods())

    app.use(mount('/api/graphql', graphqlHTTP({
        rootValue: resolver(collections),
        schema,
        graphiql: true
    })));

    app.use(serve('./dist'))

    app.listen(4000);
    console.log('Server Running on Port 4000')
})
