import differenceInDays from 'date-fns/difference_in_days'
import fp from 'lodash/fp'
import { LOG_RESPONSE, SET_RANGE, SET_WIDTH } from '../actions/grid'


export default (state, action) => {

    if (action.type === SET_RANGE) {

        const end = fp.get('range.end', action)
        const start = fp.get('range.start', action)

        const length = differenceInDays(start, end)
        const gridWidth = fp.get('metrics.gridWidth', state)
        console.log(length)
        return {
            ...state,
            end,
            length,
            metrics: {
                ...state.metrics,
                dayWidth: gridWidth ? (gridWidth / length) : 0
            },
            start
        }
    }

    if (action.type === SET_WIDTH) {

        const length = differenceInDays(state.start, state.end)

        return {
            ...state,
            metrics: {
                gridWidth: action.width,
                dayWidth: action.width / length
            }
        }
    }

    if (action.type === LOG_RESPONSE) {

        console.log(action)
    }

    return state
}
