
module.exports = {
    badRequest: message => ({
        message: `Bad Request: ${message}`,
        status: 400
    }),
    dbWriteError: () => ({
        message: 'Error writing to database',
        status: 500
    }),
    notAuthenticated: () => ({
        message: 'Not Authenticated',
        status: 401
    })
}
