
module.exports = ({ users }) => {

    return {
        user: ({username}) => users.findOne({ username }),
        users: () => users.find({}).toArray()
    }
}
