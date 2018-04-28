import { CANCEL_TRIP, TRIP_ADDED, UPDATE_TRIP } from '../actions/trip-modal'
import { ADD_TRIP, EDIT_TRIP } from '../actions/trips'


export default (state, action) => {

    if (action.type === ADD_TRIP) {

        return {
            render: true
        }
    }

    if (action.type === EDIT_TRIP) {

        return {
            ...action.event,
            isEdit: true,
            render: true
        }
    }

    if (action.type === CANCEL_TRIP) {

        return {
            ...state,
            render: false
        }
    }

    if (action.type === UPDATE_TRIP) {

        return {
            ...state,
            ...action.update
        }
    }

    if (action.type === TRIP_ADDED) {

        return {
            render: false
        }
    }

    return state
}
