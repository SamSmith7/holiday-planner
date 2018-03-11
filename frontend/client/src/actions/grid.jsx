
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
