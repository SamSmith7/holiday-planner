import { INIT_SUCCESS } from '../actions/root'


export default (state, action) => {

    if (action.type === INIT_SUCCESS) {

        return {
            ...state,
            ready: true
        }
    }

    return state
}
