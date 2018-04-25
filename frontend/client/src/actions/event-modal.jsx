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

export const EVENT_ADDED = 'Event.Added'
export const CANCEL_EVENT = 'Event.Cancel'
export const SUBMIT_EVENT = 'Event.Submit'
export const UPDATE_EVENT = 'Event.Update'

export const cancelEvent = () => {

    return {
        type: CANCEL_EVENT
    }
}

export const submitEvent = () => {

    return (dispatch, getState) => {

        const currentStore = getState()
        const payload = fp.pick(eventPayload, currentStore.eventModal)

        const update = payload.id ? `/${payload.id}` : ''

        return dispatch({
            payload,
            returnAction: EVENT_ADDED,
            type: API_REQUEST,
            uri: `/api/trip/${currentStore.trip.id}/event${update}`
        })
    }
}

export const updateEvent = update => {

    return {
        update,
        type: UPDATE_EVENT
    }
}
