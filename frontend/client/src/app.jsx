import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import epics from './epics/epics'
import reducers from './reducers/reducers'
import Root from './root/root'

import 'antd/dist/antd.css'
import styles from './app.mod.scss'


const epicMiddleware = createEpicMiddleware(epics)
const store = createStore(
    reducers,
    applyMiddleware(epicMiddleware)
)

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
