import gridReducers from './grid.jsx'
import headerReducers from './header.jsx'


const initialState = {

    grid: {
        end: new Date(),
        start: new Date()
    },

    header: {
        showMenu: false
    }
}


export default (state = initialState, action) => {

    return {
        grid: gridReducers(state.grid, action),
        header: headerReducers(state.header, action)
    }
}
