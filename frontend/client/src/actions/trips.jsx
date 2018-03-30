import { GRAPH_QL_QUERY } from './server'


export const GET_TRIPS = 'Trips.GetTrips'

export const getTrips = query => {

    return {
        query,
        returnAction: GET_TRIPS,
        type: GRAPH_QL_QUERY
    }
}
