import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers/reducers.jsx'
import Root from './root/root.jsx'

import styles from './app.mod.scss'


const store = createStore(reducers)

const stage = document.createElement('div')

stage.className = 'stage'
document.body.appendChild(stage)

const overlay = document.createElement('div')

overlay.id = 'overlay'
overlay.className = styles.overlay
document.body.appendChild(overlay)

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>
, stage)
