

module.exports = collections => {

    return {
        user: ({username}) => {

            return new Promise((resolve, reject) => {

                collections.users.find({username})
                    .toArray((err, docs) => {

                        if (err) { reject(err) }

                        resolve(docs[0])
                    })
            })
        },
        users: () => {

            return new Promise((resolve, reject) => {

                collections.users.find({})
                    .toArray((err, docs) => {

                        if (err) { reject(err) }

                        resolve(docs)
                    })
            })
        }
    }
}
