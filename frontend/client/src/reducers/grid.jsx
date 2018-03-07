import fp from 'lodash/fp'
import { SET_RANGE} from '../actions/grid'


export default (state, action) => {

    if (action.type === SET_RANGE) {

        return {
            ...state,
            end: fp.get('range.end', action),
            start: fp.get('range.start', action)
        }
    }

    return state
}
