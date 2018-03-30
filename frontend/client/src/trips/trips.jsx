import fp from 'lodash/fp'
import propTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Authenticated } from 'utils'
import { getTrips } from '../actions/trips'

import styles from './trips.mod.scss'


const tripQuery = username => (`{ trips(username: "${username}") { end, start, title } }`)

const mapStateToProps = ({ trips, user }) => {

    return {
        allTrips: trips.allTrips,
        username: user.username
    }
}

const mapDispatchToProps = dispatch => {

    return {
        getTrips: username => dispatch(getTrips(tripQuery(username)))
    }
}

class Trips extends React.Component {

    static displayName = 'Trips'

    static propTypes = {
        allTrips: propTypes.array,
        getTrips: propTypes.func,
        username: propTypes.string
    }

    componentDidMount() {

        this.props.getTrips(this.props.username)
    }

    render() {

        return (
            <div className={styles.root}>
                {fp.map('title', this.props.allTrips)}
            </div>
        )
    }
}

export default Authenticated(connect(mapStateToProps, mapDispatchToProps)(Trips))
