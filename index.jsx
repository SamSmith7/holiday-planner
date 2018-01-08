import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/app.jsx'


const stage = document.createElement('div')

stage.className = 'stage'
document.body.appendChild(stage)

ReactDOM.render(<App />, stage)
