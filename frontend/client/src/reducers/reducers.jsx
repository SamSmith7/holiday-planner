import addDays from 'date-fns/add_days'
import { routerReducer } from 'react-router-redux'
import { EventTypes } from 'constants'
import eventReducers from './events'
import gridReducers from './grid'
import headerReducers from './header'
import rootReducers from './root'
import userReducers from './user'


const MOCK_DATA = [{
    data: {
        location: 'Alicante',
        provider: 'Holiday Inn',
        title: 'Holiday Inn - Alicante'
    },
    end: addDays(new Date(), 5),
    start: addDays(new Date(), 2),
    type: EventTypes.ACCOMODATION,
    uid: 'event1'
}]

const initialState = {

    events: MOCK_DATA,

    grid: {
        end: addDays(new Date(), 7),
        length: 7,
        start: new Date()
    },

    header: {
        login: {},
        showLogin: false,
        showMenu: false
    },

    root: { ready: false },

    router: {},

    user: {}
}


export default (state = initialState, action) => {

    return {
        events: eventReducers(state.events, action),
        grid: gridReducers(state.grid, action),
        header: headerReducers(state.header, action),
        root: rootReducers(state.root, action),
        router: routerReducer(state.router, action),
        user: userReducers(state.user, action)
    }
}
