import { API_REQUEST } from './server'

export const LOGIN = 'header.login'
export const LOGIN_DETAILS = 'header.login_details'
export const SHOW_LOGIN = 'header.show_login'
export const SHOW_MENU = 'header.show_menu'


export const login = ({password, username}) => {

    return {
        payload: {
            password,
            username
        },
        returnAction: LOGIN,
        type: API_REQUEST,
        uri: '/auth/login'
    }
}

export const loginDetails = ({password, username}) => {

    return {
        password,
        type: LOGIN_DETAILS,
        username
    }
}

export const showLogin = () => {

    return {
        type: SHOW_LOGIN
    }
}

export const showMenu = () => {

    return {
        type: SHOW_MENU
    }
}
