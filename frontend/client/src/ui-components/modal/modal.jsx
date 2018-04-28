import React from 'react'
import ReactDOM from 'react-dom'

import styles from './modal.mod.scss'


export default class Modal extends React.Component {

    static displayName = 'Modal'

    componentDidMount() {

        this.container = document.getElementById('overlay')
    }

    render() {

        const children = (
            <div className={styles.wrapper} onClick={this.props.onClose}>
                {this.props.children}
            </div>
        )

        return this.props.render
            ? ReactDOM.createPortal(children, this.container)
            : null
    }
}
