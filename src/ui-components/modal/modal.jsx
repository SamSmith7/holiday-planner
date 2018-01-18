import React from 'react'
import ReactDOM from 'react-dom'


export default class Modal extends React.Component {

    static displayName = 'Modal'

    componentDidMount() {

        this.container = document.getElementById('overlay')
    }

    render() {

        return this.props.render
            ? ReactDOM.createPortal(this.props.children, this.container)
            : null
    }
}
