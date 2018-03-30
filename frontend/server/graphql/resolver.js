const tripResolver = require('./resolvers/trip.js')
const userResolver = require('./resolvers/user.js')


module.exports = collections => {

    return {
        hello: () => {
            return 'Hello world!'
        },
        ...tripResolver(collections),
        ...userResolver(collections)
    }
}
