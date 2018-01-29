import React from 'react'

import styles from './header.mod.scss'


export default class extends React.Component {

    static displayName = 'Header'

    render() {

        return (
            <span className={styles.root}>
                {this.props.title}
            </span>
        )
    }
}
