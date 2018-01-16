import { SHOW_MENU } from '../actions/header'


export default (state, action) => {

    if (action.type === SHOW_MENU) {

        return {...state, showMenu: !state.showMenu}
    }

    return state
}
