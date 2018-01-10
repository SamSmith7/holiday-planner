import React from 'react'
import Header from './header/header.jsx'

import { Styles } from 'ui'
import styles from './app.mod.scss'


const app = Styles.CommonModules.app

export default class App extends React.Component {

    static displayName = 'App'

    render() {

        return (
            <div className={`${styles.root} ${app.root}`}>
                <Header />
            </div>
        )
    }
}
