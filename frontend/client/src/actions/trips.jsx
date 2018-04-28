import fp from 'lodash/fp'
import { GRAPH_QL_QUERY } from './server'


export const ADD_TRIP = 'Trips.AddTrip'
export const EDIT_TRIP = 'Trips.EditTrip'
export const GET_TRIPS = 'Trips.GetTrips'

export const addTrip = () => {

    return {
        type: ADD_TRIP
    }
}

export const editTrip = id => {

    return (dispatch, getState) => {

        const currentStore = getState()
        const trip = fp.find({ id }, currentStore.trips.allTrips)

        dispatch({
            trip,
            type: EDIT_TRIP
        })
    }
}

export const getTrips = query => {

    return {
        query,
        returnAction: GET_TRIPS,
        type: GRAPH_QL_QUERY
    }
}
