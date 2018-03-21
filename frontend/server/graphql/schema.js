const { buildSchema } = require('graphql');

const schema = buildSchema(`

    type User {
        username: String
    }

    type Query {
        hello: String,
        user(username: String): User,
        users: [User]
    }
`);

module.exports = schema
