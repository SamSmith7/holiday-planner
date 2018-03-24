const bcrypt = require('bcrypt')
const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy


const options = {}

module.exports = users => {

    passport.serializeUser((user, done) => {

        done(null, user.username)
    })

    passport.deserializeUser((username, done) => {

        users.find({username})
            .toArray((err, docs) => {

                if (err) { return done(err) }

                return done(null, docs[0])
            })
    })

    passport.use(new LocalStrategy(options, (username, password, done) => {

        users.find({username}).toArray().then(
            docs => {

                const user = docs[0]

                if (!user) { return done(null, false) }

                bcrypt.compare(password, user.password).then(success => {
                    return done(null, success ? user : false)
                })
            },
            err => done(err)
        )
    }))
}
