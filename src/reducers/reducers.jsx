import headerReducers from './header-reducers.jsx'


export default (state = {}, action) => {

    return {
        header: headerReducers(state.header, action)
    }
}
