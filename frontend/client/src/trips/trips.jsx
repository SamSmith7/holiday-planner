import { Button, Card } from 'antd'
import { format } from 'date-fns'
import fp from 'lodash/fp'
import propTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Authenticated } from 'utils'
import { addTrip, getTrips } from '../actions/trips'

import styles from './trips.mod.scss'


const tripQuery = username => (`{ trips(username: "${username}") { end, id, start, title } }`)

const mapStateToProps = ({ trips, user }) => {

    return {
        allTrips: trips.allTrips,
        username: user.username
    }
}

const mapDispatchToProps = dispatch => {

    return {
        addTrip: () => dispatch(addTrip()),
        getTrips: username => dispatch(getTrips(tripQuery(username))),
        goToTrip: id => dispatch(push(`/trip/${id}`))
    }
}

class Trips extends React.Component {

    static displayName = 'Trips'

    static propTypes = {
        allTrips: propTypes.array,
        getTrips: propTypes.func,
        goToTrip: propTypes.func,
        username: propTypes.string
    }

    componentDidMount() {

        this.props.getTrips(this.props.username)
    }

    tripSummary = trip => {

        const end = format(new Date(trip.end), 'DD/MM/YYYY')
        const start = format(new Date(trip.start), 'DD/MM/YYYY')

        return (
            <Card {...{
                className: styles.trip,
                key: trip.id,
                onClick: () => this.props.goToTrip(trip.id),
                title: trip.title
            }}>
                {`${start} - ${end}`}
            </Card>
        )
    }

    render() {

        const { props } = this

        return (
            <div className={styles.root}>
                <div className={styles.allTrips}>
                    {fp.map(this.tripSummary, this.props.allTrips)}
                    <Button {...{
                        onClick: props.addTrip,
                        type: 'ghost'
                    }} />
                </div>
            </div>
        )
    }
}

export default Authenticated(connect(mapStateToProps, mapDispatchToProps)(Trips))
