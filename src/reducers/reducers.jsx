import headerReducers from './header.jsx'


const initialState = {

    header: {
        showMenu: false
    }
}


export default (state = initialState, action) => {

    return {
        header: headerReducers(state.header, action)
    }
}
