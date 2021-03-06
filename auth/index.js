const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const passport = require('koa-passport')
const Router = require('koa-router')
const session = require('koa-session')
const fp = require('lodash/fp')
const Errors = require('./constants/error-codes.js')
const AuthUtils = require('./utils/auth.js')
const handleError = require('./utils/handle-error.js')
const auth = require('./auth.js')
const db = require('./db.js')


const dbConfig = {
    url: 'mongodb://localhost:27017'
}

const app = new Koa()
const router = new Router({prefix: '/auth'})

app.keys = ['super-secret-key']
app.use(session(app))

db.connect(dbConfig).then(client => {

    const db = client.db('holiday-planner')

    const collections = {
        users: db.collection('users')
    }

    router.post('/register', async ctx => {

        const user = await AuthUtils.parseUser(ctx.request.body)

        if (fp.isEmpty(user)) return handleError(Errors.BAD_REQUEST)

        try {
            await collections.users.insertOne(user)
        } catch (e) {
            return handleError(Errors.DATABASE_WRITE_ERROR)
        }

        return AuthUtils.login(ctx)
    })

    router.post('/login', async ctx => AuthUtils.login(ctx))

    router.get('/authenticated', async ctx => {

        if (ctx.isAuthenticated()) {
            ctx.status = 200
            ctx.body = {
                authenticated: true,
                user: {
                    name: fp.get('state.user.name', ctx),
                    token: AuthUtils.generateToken(ctx.state.user),
                    username: fp.get('state.user.username', ctx)
                }
            }
        } else {
            ctx.status = 401
            ctx.body = { authenticated: false }
        }
    })

    app.use(bodyparser())

    auth(collections.users)
    app.use(passport.initialize())
    app.use(passport.session())

    app.use(router.routes())
    app.use(router.allowedMethods())

    app.listen(5000)
    console.log('Auth Server Running on Port 5000')
})
