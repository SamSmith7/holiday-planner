const fp = require('lodash/fp')
const parser = require('../utils/parser.js')


const eventVO = raw => {

    if (!fp.isObject(raw)) { throw new Error('Event should be provided as a json object') }

    if (!raw.end) { throw new Error('Event end date not provided') }

    if (!raw.start) { throw new Error('Event start date not provided') }

    if (!raw.title) { throw new Error('Event title not provided') }

    if (!raw.type) { throw new Error('Event type not provided') }

    return {
        end: raw.end,
        location: raw.location,
        providerId: raw.providerId,
        start: raw.start,
        title: raw.title,
        type: raw.type
    }
}

module.exports = parser(eventVO)
