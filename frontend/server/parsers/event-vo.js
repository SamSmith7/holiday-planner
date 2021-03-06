const fp = require('lodash/fp')
const shortid = require('shortid')
const parser = require('../utils/parser.js')


const eventVO = (raw, throwOnMissing) => {

    if (throwOnMissing && !fp.isObject(raw)) { throw new Error('Event should be provided as a json object') }

    if (throwOnMissing && !raw.end) { throw new Error('Event end date not provided') }

    if (throwOnMissing && !raw.start) { throw new Error('Event start date not provided') }

    if (throwOnMissing && !raw.title) { throw new Error('Event title not provided') }

    if (throwOnMissing && !raw.type) { throw new Error('Event type not provided') }

    return {
        end: raw.end,
        id: raw.id || shortid.generate(),
        location: raw.location,
        providerId: raw.providerId,
        start: raw.start,
        title: raw.title,
        type: raw.type
    }
}

module.exports = parser(eventVO)
