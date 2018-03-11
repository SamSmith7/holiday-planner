import addDays from 'date-fns/add_days'
import differenceInDays from 'date-fns/difference_in_days'
import format from 'date-fns/format'
import fp from 'lodash/fp'
import React from 'react'
import { connect } from 'react-redux'
import { ResizeObserver } from 'ui'
import { setWidth } from '../actions/grid.jsx'
import Event from './components/event.jsx'
import Header from './components/header.jsx'

import styles from './grid.mod.scss'


const fpMap = fp.map.convert({cap: false})

const ResizeDiv = ResizeObserver()

const mapStateToProps = ({ events, grid }) => {

    return {
        end: grid.end,
        events,
        length: grid.length,
        start: grid.start
    }
}

const mapDispatchToProps = dispatch => {

    return {
        onResize: ({width}) => dispatch(setWidth(width))
    }
}

const createRange = (start, end) => {

    const length = differenceInDays(end, start)

    return fp.times(i => addDays(start, i), length)
}

const createSections = fp.groupBy('type')

class Grid extends React.Component {

    static displayName = 'Grid'

    state = {
        range: createRange(this.props.start, this.props.end),
        sections: createSections(this.props.events)
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
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
                        length: this.props.length,
                        key: event.uid
                    }} />
                ), section)}
            </div>
        )
    }

    render() {

        const { props, state } = this

        return (
            <ResizeDiv {...{
                componentProps: {
                    className: styles.root
                },
                onResize: this.props.onResize
            }}>
                <Header range={state.range} />
                {fpMap(this.sectionRenderer, state.sections)}
            </ResizeDiv>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)
