import addDays from 'date-fns/add_days'
import differenceInDays from 'date-fns/difference_in_days'
import fp from 'lodash/fp'
import propTypes from 'prop-types'
import React from 'react'
import Event from './components/event.jsx'
import Header from './components/header.jsx'

import styles from './grid.mod.scss'


const fpMap = fp.map.convert({cap: false})

const createRange = (start, end) => {

    const length = differenceInDays(end, start)

    return fp.times(i => addDays(start, i), length)
}

const createSections = fp.groupBy('type')

class Grid extends React.Component {

    static displayName = 'Grid'

    static propTypes = {
        events: propTypes.array,
        end: propTypes.object,
        length: propTypes.number,
        onEditEvent: propTypes.func,
        onResize: propTypes.func,
        start: propTypes.object
    }

    state = {
        length: differenceInDays(this.props.end, this.props.start),
        range: createRange(this.props.start, this.props.end),
        sections: createSections(this.props.events)
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            length: differenceInDays(nextProps.end, nextProps.start),
            range: createRange(nextProps.start, nextProps.end),
            sections: createSections(nextProps.events)
        })
    }

    sectionRenderer = (section, type) => {

        return (
            <div className={styles.section} key={type}>
                {fp.map(event => (
                    <Event {...{
                        event,
                        gridStart: this.props.start,
                        key: event.uid,
                        length: this.state.length,
                        onEdit: this.props.onEditEvent
                    }} />
                ), section)}
            </div>
        )
    }

    render() {

        const { state } = this

        return (
            <div className={styles.root} >
                <Header range={state.range} />
                {fpMap(this.sectionRenderer, state.sections)}
            </div>
        )
    }
}

export default Grid
