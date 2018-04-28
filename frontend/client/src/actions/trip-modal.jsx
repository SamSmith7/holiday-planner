import fp from 'lodash/fp'
import { API_REQUEST } from './server'


const eventPayload = [
    'end',
    'id',
    'location',
    'start',
    'title',
    'type'
]

export const TRIP_ADDED = 'TripModal.Added'
export const CANCEL_TRIP = 'TripModal.Cancel'
export const UPDATE_TRIP = 'TripModal.Update'

export const cancelTrip = () => {

    return {
        type: CANCEL_TRIP
    }
}

export const submitTrip = () => {

    return (dispatch, getState) => {

        const currentStore = getState()
        const payload = {
            end: fp.get('tripModal.end', currentStore),
            organiserId: fp.get('user.username', currentStore),
            start: fp.get('tripModal.start', currentStore),
            title: fp.get('tripModal.title', currentStore)
        }

        const id = fp.get('tripModal.id', currentStore)
        const update = id ? `/${id}` : ''

        return dispatch({
            payload,
            returnAction: TRIP_ADDED,
            type: API_REQUEST,
            uri: `/api/trip${update}`
        })
    }
}

export const updateTrip = update => {

    return {
        update,
        type: UPDATE_TRIP
    }
}
