
module.exports = ({ trips }) => {

    return {
        trip: ({ id }) => trips.findOne({ id }),
        trips: ({ username }) => trips.find({ organiserId: username }).toArray()
    }
}
