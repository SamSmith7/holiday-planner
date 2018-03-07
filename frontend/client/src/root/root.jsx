import React from 'react'
import Grid from '../grid/grid.jsx'
import GridControl from '../grid-control/grid-control.jsx'
import Header from '../header/header.jsx'
import People from '../people/people.jsx'

import { Styles } from 'ui'
import styles from './root.mod.scss'


const app = Styles.CommonModules.app

export default class App extends React.Component {

    static displayName = 'App'

    render() {

        return (
            <div className={`${styles.root} ${app.root}`}>
                <Header />
                <div className={styles.main}>
                    <div className={styles.grid}>
                        <GridControl />
                        <Grid />
                    </div>
                    <People />
                </div>
            </div>
        )
    }
}
