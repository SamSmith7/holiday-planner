const tripResolver = require('./resolvers/trip.js')
const userResolver = require('./resolvers/user.js')


module.exports = collections => {

    return {
        ...tripResolver(collections),
        ...userResolver(collections)
    }
}
