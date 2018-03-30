const fp = require('lodash/fp')


module.exports = fp.curry((parser, raw) => {

    try {
        const data = fp.isArray(raw)
            ? fp.map(parser, raw)
            : parser(raw)

        return {
            data,
            error: false
        }
    } catch (e) {

        return {
            error: true,
            message: e
        }
    }
})
