const MongoClient = require('mongodb').MongoClient


// Database Connection URL
const url = 'mongodb://localhost:27017'

const connect = config => {

    return new Promise((resolve, reject) => {

        MongoClient.connect(config.url, (err, client) => {

            if (err) { reject(err) }

            resolve(client)
        })
    })
}

module.exports = {
    connect
}
