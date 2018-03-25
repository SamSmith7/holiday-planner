import fp from 'lodash/fp'
import React from 'react'
import { connect } from 'react-redux'
import Grid from '../grid/grid.jsx'
import GridControl from '../grid-control/grid-control.jsx'
import Header from '../header/header.jsx'
import People from '../people/people.jsx'
import { Styles } from 'ui'

import styles from './root.mod.scss'


const app = Styles.CommonModules.app

const mapStateToProps = ({ user }) => {

    return {
        user
    }
}

const mapDispatchToProps = dispatch => {

    return {}
}

class App extends React.Component {

    static displayName = 'App'

    render() {

        const { props } = this

        return (
            <div className={`${styles.root} ${app.root}`}>
                <Header />
                <div className={styles.main}>
                    {!fp.isEmpty(props.user) && (
                        <React.Fragment>
                            <div className={styles.grid}>
                                <GridControl />
                                <Grid />
                            </div>
                            <People />
                        </React.Fragment>
                    )}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
