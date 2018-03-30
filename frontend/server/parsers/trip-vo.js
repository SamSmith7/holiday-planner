const fp = require('lodash/fp')
const parser = require('../utils/parser.js')
const eventVO = require('./event-vo.js')


const tripVO = raw => {

    if (!fp.isObject(raw)) { throw new Error('Trip should be provided as a json object') }

    if (!raw.end) { throw new Error('Trip end date not provided') }

    if (!raw.organiserId) { throw new Error('No organiserId provided') }

    if (!raw.start) { throw new Error('Trip start date not provided') }

    if (!raw.title) { throw new Error('Trip title not provided') }

    const events = eventVO(raw.events || [])

    if (events.error) {
        throw new Error(`Error parsing events: ${events.message}`)
    }

    return {
        end: raw.end,
        events: events.data,
        organiserId: raw.organiserId,
        start: raw.start,
        title: raw.title
    }
}

module.exports = parser(tripVO)
