import { CANCEL_EVENT, EVENT_ADDED, UPDATE_EVENT } from '../actions/event-modal'
import { ADD_EVENT } from '../actions/trip'


export default (state, action) => {

    if (action.type === ADD_EVENT) {

        return {
            ...state,
            render: true
        }
    }

    if (action.type === CANCEL_EVENT) {

        return {
            ...state,
            render: false
        }
    }

    if (action.type === UPDATE_EVENT) {

        return {
            ...state,
            ...action.update
        }
    }

    if (action.type === EVENT_ADDED) {

        return {
            render: false
        }
    }

    return state
}
