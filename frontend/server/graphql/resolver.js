const userResolver = require('./resolvers/user.js')


module.exports = collections => {

    return {
        hello: () => {
            return 'Hello world!';
        },
        ...userResolver(collections)
    }
}
