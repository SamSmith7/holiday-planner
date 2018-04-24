import { GRAPH_QL_QUERY } from './server'


export const ADD_EVENT = 'Trip.AddEvent'
export const GET_TRIP = 'Trip.GetTrip'
export const SET_RANGE = 'Trip.SetRange'
export const TRIP_SAVED = 'Trip.TripSaved'

export const addEvent = () => {

    return {
        type: ADD_EVENT
    }
}

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
