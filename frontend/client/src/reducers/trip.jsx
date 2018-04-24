import fp from 'lodash/fp'
import { EVENT_ADDED } from '../actions/event-modal'
import { GET_TRIP, SET_RANGE } from '../actions/trip'


export default (state, action) => {

    if (action.type === GET_TRIP) {

        if (fp.get('res.error', action)) {
            return state // TODO: handle errors
        }

        return fp.get('res.data.trip', action)
    }

    if (action.type === SET_RANGE) {

        const end = fp.get('range.end', action)
        const start = fp.get('range.start', action)

        return {
            ...state,
            end,
            start
        }
    }

    if (action.type === EVENT_ADDED) {
        console.log(action)
        if (fp.get('res.error', action)) {
            return state
        }
        console.log({
            ...state,
            events: fp.concat(state.events, action.request)
        })
        return {
            ...state,
            events: fp.concat(state.events, action.request)
        }
    }

    return state
}
