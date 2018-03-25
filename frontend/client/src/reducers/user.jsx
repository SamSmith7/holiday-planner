import fp from 'lodash/fp'
import { LOGIN } from '../actions/header'


export default (state, action) => {

    if (action.type === LOGIN) {


        if (fp.get('res.error', action)) {
            return state // TODO: handle errors
        }

        return {
            ...state,
            ...fp.getOr({}, 'res.user', action),
            token: fp.get('res.token', action)
        }
    }

    return state
}
