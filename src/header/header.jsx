import { Bars } from 'icons'
import React from 'react'

import styles from './header.mod.scss'


export default class Header extends React.Component {

    render() {

        return (
            <div className={styles.root}>
                <div className={styles.left}>
                    <Bars />
                </div>
                <div className={styles.right}>
                    last logged in: hh:mm
                </div>
            </div>
        )
    }
}
