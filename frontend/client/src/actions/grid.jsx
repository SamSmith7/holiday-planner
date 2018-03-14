import { GRAPH_QL_QUERY } from './server'


export const LOG_RESPONSE = 'log_response'
export const SET_RANGE = 'set_range'
export const SET_LENGTH = 'set_range'
export const SET_WIDTH = 'set_width'

export const setRange = range => {

    return {
        range,
        type: SET_RANGE
    }
}

export const setWidth = width => {

    return {
        width,
        type: SET_WIDTH
    }
}


export const testServer = () => {

    return {
        query: '{ hello }',
        returnAction: LOG_RESPONSE,
        type: GRAPH_QL_QUERY
    }
}
