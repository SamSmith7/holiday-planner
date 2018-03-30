const { buildSchema } = require('graphql')

const schema = buildSchema(`

    type Event {
        end: String,
        location: String,
        providerId: String,
        start: String,
        title: String,
        type: String
    }

    type Trip {
        end: String,
        events: [Event],
        organiserId: String,
        start: String,
        title: String
    }

    type User {
        name: String,
        username: String
    }

    type Query {
        hello: String,
        trips(username: String): [Trip],
        user(username: String): User,
        users: [User]
    }
`)

module.exports = schema
