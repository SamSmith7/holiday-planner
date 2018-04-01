import fp from 'lodash/fp'
import { LOGIN } from '../actions/header'
import { INIT_SUCCESS } from '../actions/root'


export default (state, action) => {

    if (action.type === INIT_SUCCESS) {

        const res = action.res || {}

        if (res.error || !res.authenticated) {
            return state
        }

        return {
            ...state,
            ...(res.user || {}),
            token: fp.get('user.token', res) || ''
        }
    }

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
