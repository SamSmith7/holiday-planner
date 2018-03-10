import addDays from 'date-fns/add_days'
import differenceInDays from 'date-fns/difference_in_days'
import format from 'date-fns/format'
import fp from 'lodash/fp'
import React from 'react'
import { connect } from 'react-redux'
import Header from './components/header.jsx'

import styles from './grid.mod.scss'


const MOCK_DATA = [{
    end: addDays(new Date(), 3),
    start: new Date(),
    type: 'accomodation'
}]

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

    const length = differenceInDays(start, end)

    return fp.times(i => addDays(start, i), length)
}

class Grid extends React.Component {

    static displayName = 'Grid'

    static defaultProps = {
        data: MOCK_DATA
    }

    state = {
        range: createRange(this.props.start, this.props.end)
    }

    componentWillReceiveProps(nextProps) {

        this.setState({range: createRange(nextProps.start, nextProps.end)})
    }

    render() {

        const { props, state } = this

        return (
            <div className={styles.root}>
                <Header range={state.range} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)
