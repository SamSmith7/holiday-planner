import { GRAPH_QL_QUERY } from './server'


export const ADD_TRIP = 'Trips.AddTrip'
export const GET_TRIPS = 'Trips.GetTrips'

export const addTrip = () => {

    return {
        type: ADD_TRIP
    }
}

export const getTrips = query => {

    return {
        query,
        returnAction: GET_TRIPS,
        type: GRAPH_QL_QUERY
    }
}
