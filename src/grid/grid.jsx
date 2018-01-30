import addDays from 'date-fns/add_days'
import differenceInDays from 'date-fns/difference_in_days'
import format from 'date-fns/format'
import fp from 'lodash/fp'
import React from 'react'
import { connect } from 'react-redux'
import Header from './components/header.jsx'

import styles from './grid.mod.scss'


const mapStateToProps = ({ grid }) => {

    return {
        end: grid.end,
        start: grid.start
    }
}

const mapDispatchToProps = dispatch => {

    return {}
}

const createRange = (start, end) => {

    const length = differenceInDays(end, start)

    return fp.times(i => addDays(start, i), length)
}

class Grid extends React.Component {

    state = {
        range: createRange(this.props.start, this.props.end)
    }

    componentWillReceiveProps(nextProps) {

        this.setState({range: createRange(nextProps.start, nextProps.end)})
    }

    columnRenderer = date => {

        const title = format(date, 'dddd Do')

        return (
            <div className={styles.column} key={title}>
                <Header {...{
                    title
                }}/>
            </div>
        )
    }

    render() {

        const { props, state } = this

        return (
            <div className={styles.root}>
                {fp.map(this.columnRenderer, state.range)}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)
