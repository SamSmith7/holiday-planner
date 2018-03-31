import fp from 'lodash/fp'
import { GET_TRIPS } from '../actions/trips'


export default (state, action) => {

    if (action.type === GET_TRIPS) {

        if (fp.get('res.error', action)) {
            return state // TODO: handle errors
        }

        return {
            state,
            allTrips: fp.compact(fp.get('res.data.trips', action))
        }
    }

    return state
}
