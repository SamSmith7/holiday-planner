import { LOGIN_DETAILS, SHOW_LOGIN, SHOW_MENU } from '../actions/header'


export default (state, action) => {

    if (action.type === LOGIN_DETAILS) {

        return action.username
            ? {...state, username: action.username}
            : {...state, password: action.password}
    }

    if (action.type === SHOW_LOGIN) {

        return {...state, showLogin: !state.showLogin}
    }

    if (action.type === SHOW_MENU) {

        return {...state, showMenu: !state.showMenu}
    }

    return state
}
