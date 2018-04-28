import { Button, Card } from 'antd'
import classnames from 'classnames'
import { format } from 'date-fns'
import { Pencil } from 'icons'
import fp from 'lodash/fp'
import propTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Authenticated } from 'utils'
import { showMenu } from '../../actions/header'
import { addTrip, editTrip, getTrips } from '../../actions/trips'

import styles from './menu.mod.scss'


const tripQuery = username => (`{ trips(username: "${username}") { end, id, start, title } }`)

const mapStateToProps = ({ trips, user }) => {

    return {
        allTrips: trips.allTrips,
        username: user.username
    }
}

const mapDispatchToProps = dispatch => {

    return {
        addTrip: () => {
            dispatch(addTrip())
            dispatch(showMenu())
        },
        editTrip: id => {
            dispatch(editTrip(id))
            dispatch(showMenu())
        },
        getTrips: username => dispatch(getTrips(tripQuery(username))),
        goToTrip: id => {
            dispatch(push(`/trip/${id}`))
            dispatch(showMenu())
        }
    }
}

class Menu extends React.Component {

    static displayName = 'Menu'

    static propTypes = {
        allTrips: propTypes.array,
        editTrip: propTypes.func,
        getTrips: propTypes.func,
        goToTrip: propTypes.func,
        username: propTypes.string
    }

    componentDidMount() {

        this.props.getTrips(this.props.username)
    }

    editTrip = id => e => {
        e.stopPropagation()
        this.props.editTrip(id)
    }

    stopPropagation = e => {

        e.stopPropagation()
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
                <div className={styles.tripWrapper}>
                    {`${start} - ${end}`}
                    <Pencil onClick={this.editTrip(trip.id)}/>
                </div>
            </Card>
        )
    }

    render() {

        const { props } = this
        const className = classnames(styles.root, props.className)

        return (
            <div className={className} onClick={this.stopPropagation}>
                {fp.map(this.tripSummary, this.props.allTrips)}
                <Button {...{
                    className: styles.addTrip,
                    onClick: props.addTrip,
                    type: 'ghost'
                }}>
                    Add Trip
                </Button>
            </div>
        )
    }
}

export default Authenticated(connect(mapStateToProps, mapDispatchToProps)(Menu))
