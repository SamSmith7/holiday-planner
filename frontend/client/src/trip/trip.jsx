import React from 'react'
import { Authenticated } from 'utils'
import Grid from '../grid/grid.jsx'
import GridControl from '../grid-control/grid-control.jsx'
import People from '../people/people.jsx'

import styles from './trip.mod.scss'


class Trip extends React.Component {

    static displayName = 'Trip'

    render() {

        return (
            <React.Fragment>
                <div className={styles.grid}>
                    <GridControl />
                    <Grid />
                </div>
                <People />
            </React.Fragment>
        )
    }
}

export default Authenticated(Trip)
