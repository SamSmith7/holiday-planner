
module.exports = ({ trips }) => {

    return {
        trips: ({ username }) => {

            return new Promise((resolve, reject) => {

                trips.find({ organiserId: username })
                    .toArray((err, docs) => {

                        if (err) { reject(err) }

                        resolve(docs)
                    })
            })
        }
    }
}
