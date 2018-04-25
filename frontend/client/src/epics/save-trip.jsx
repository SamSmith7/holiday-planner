import fp from 'lodash/fp'
import { API_REQUEST } from '../actions/server'
import { TRIP_SAVED } from '../actions/trip'


export default (actions$, store) => {

    return actions$
        .map(() => store.getState())
        .pluck('trip')
        .map(fp.omit(['events']))
        .distinctUntilChanged(fp.isEqual)
        .debounceTime(1000)
        .filter(trip => trip.id)
        .map(payload => ({
            payload,
            returnAction: TRIP_SAVED,
            type: API_REQUEST,
            uri: `/api/trip/${payload.id}`
        }))
}
