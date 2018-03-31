import { GRAPH_QL_QUERY } from './server'


export const GET_TRIP = 'Trips.GetTrip'
export const SET_RANGE = 'set_range'

export const getTrip = query => {

    return {
        query,
        returnAction: GET_TRIP,
        type: GRAPH_QL_QUERY
    }
}

export const setRange = range => {

    return {
        range,
        type: SET_RANGE
    }
}
