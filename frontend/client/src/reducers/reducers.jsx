import addDays from 'date-fns/add_days'
import { EventTypes } from 'constants'
import eventReducers from './events.jsx'
import gridReducers from './grid.jsx'
import headerReducers from './header.jsx'


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
        showMenu: false
    }
}


export default (state = initialState, action) => {

    return {
        events: eventReducers(state.events, action),
        grid: gridReducers(state.grid, action),
        header: headerReducers(state.header, action)
    }
}
