const fp = require('lodash/fp')
const shortid = require('shortid')
const parser = require('../utils/parser.js')
const eventVO = require('./event-vo.js')


const tripVO = (raw, throwOnMissing) => {

    if (throwOnMissing && !fp.isObject(raw)) { throw new Error('Trip should be provided as a json object') }

    if (throwOnMissing && !raw.end) { throw new Error('Trip end date not provided') }

    if (throwOnMissing && !raw.organiserId) { throw new Error('No organiserId provided') }

    if (throwOnMissing && !raw.start) { throw new Error('Trip start date not provided') }

    if (throwOnMissing && !raw.title) { throw new Error('Trip title not provided') }

    const events = eventVO(raw.events || [], throwOnMissing)

    if (events.error) {
        throw new Error(`Error parsing events: ${events.message}`)
    }

    return {
        end: raw.end,
        events: events.data,
        id: raw.id || shortid.generate(),
        organiserId: raw.organiserId,
        start: raw.start,
        title: raw.title
    }
}

module.exports = parser(tripVO)
