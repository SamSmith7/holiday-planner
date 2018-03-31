import fp from 'lodash/fp'
import propTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Authenticated } from 'utils'
import { getTrip, setRange } from '../actions/trip'
import Grid from '../grid/grid.jsx'
import GridControl from '../grid-control/grid-control.jsx'
import People from '../people/people.jsx'

import styles from './trip.mod.scss'


const tripQuery = id => (`
{
    trip(id: "${id}") {
        end,
        events {
            end,
            location,
            providerId,
            start,
            title,
            type
        },
        id,
        start,
        title
    }
}
`)

const mapStateToProps = ({ trip }) => {

    return {
        end: new Date(trip.end),
        events: trip.events,
        start: new Date(trip.start),
        title: trip.title
    }
}

const mapDispatchToProps = dispatch => {

    return {
        getTrip: id => dispatch(getTrip(tripQuery(id))),
        onRangeChange: range => dispatch(setRange(range))
    }
}

class Trip extends React.Component {

    static displayName = 'Trip'

    static propTypes = {
        end: propTypes.object,
        events: propTypes.array,
        getTrip: propTypes.func,
        onRangeChange: propTypes.func,
        start: propTypes.object
    }

    componentDidMount() {

        const id = fp.get('props.match.params.id', this)

        if (id) { this.props.getTrip(id) }
    }

    render() {

        const { props } = this

        if (fp.isEmpty(props.title)) {
            return null
        }

        return (
            <React.Fragment>
                <div className={styles.grid}>
                    <GridControl {...{
                        end: props.end,
                        onRangeChange: props.onRangeChange,
                        start: props.start
                    }}/>
                    <Grid {...{
                        events: props.events,
                        end: props.end,
                        onResize: props.onResize,
                        start: props.start
                    }}/>
                </div>
                <People />
            </React.Fragment>
        )
    }
}

export default Authenticated(connect(mapStateToProps, mapDispatchToProps)(Trip))
