const fp = require('lodash/fp')


module.exports = fp.curry((parser, raw, throwOnMissing = true) => {

    try {
        const data = fp.isArray(raw)
            ? fp.map(item => parser(item, throwOnMissing), raw)
            : parser(raw, throwOnMissing)

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
