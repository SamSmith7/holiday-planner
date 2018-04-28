import { routerReducer } from 'react-router-redux'
import { EventTypes } from 'constants'
import eventReducers from './events'
import eventModalReducers from './event-modal'
import headerReducers from './header'
import rootReducers from './root'
import tripReducers from './trip'
import tripModalReducers from './trip-modal'
import tripsReducers from './trips'
import userReducers from './user'


const initialState = {

    eventModal: {
        render: false
    },

    header: {
        login: {},
        showLogin: false,
        showMenu: false
    },

    root: { ready: false },

    router: {},

    user: {},

    trip: {},

    tripModal: {
        render: false
    },

    trips: {}
}


export default (state = initialState, action) => {

    return {
        eventModal: eventModalReducers(state.eventModal, action),
        events: eventReducers(state.events, action),
        header: headerReducers(state.header, action),
        root: rootReducers(state.root, action),
        router: routerReducer(state.router, action),
        trip: tripReducers(state.trip, action),
        tripModal: tripModalReducers(state.tripModal, action),
        trips: tripsReducers(state.trips, action),
        user: userReducers(state.user, action)
    }
}
