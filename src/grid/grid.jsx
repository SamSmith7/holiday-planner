import addDays from 'date-fns/add_days'
import format from 'date-fns/format'
import fp from 'lodash/fp'
import React from 'react'
import { connect } from 'react-redux'
import Header from './components/header.jsx'

import styles from './grid.mod.scss'


const mapStateToProps = ({ header }) => {

    return {}
}

const mapDispatchToProps = dispatch => {

    return {}
}

const createRange = (start, length) => fp.times(i => addDays(start, i), length)

class Grid extends React.Component {

    static defaultProps = {
        length: 7,
        start: new Date()
    }

    state = {
        range: createRange(this.props.start, this.props.length)
    }

    componentWillReceiveProps(nextProps) {

        this.setState({range: createRange(nextProps.start, nextProps.length)})
    }

    columnRenderer = date => {

        const title = format(date, 'dddd')

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
