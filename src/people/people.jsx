import React from 'react'

import styles from './people.mod.scss'


export default class extends React.Component {

    static displayName = 'People'

    render() {

        return (
            <div className={styles.root}>
                People
            </div>
        )
    }
}
