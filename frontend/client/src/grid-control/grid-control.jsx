import { Button, DatePicker } from 'antd'
import addDays from 'date-fns/add_days'
import format from 'date-fns/format'
import fp from 'lodash/fp'
import { Plus } from 'icons'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { setRange } from '../actions/grid.jsx'

import styles from './grid-control.mod.scss'


const RangePicker = DatePicker.RangePicker

const mapStateToProps = ({ grid }) => {

    return {
        end: grid.end,
        start: grid.start,
        value: [moment(grid.start), moment(grid.end)],
    }
}

const mapDispatchToProps = dispatch => {

    return {
        onChange: range => dispatch(setRange(range))
    }
}

class GridControl extends React.Component {

    onChange = ([start, end]) => {

        this.props.onChange({
            end: end ? end.toDate() : null,
            start: start ? start.toDate() : null
        })
    }

    onInputClick = e => console.log(e)

    render() {

        const { props, state } = this

        return (
            <div className={styles.root}>
                <Button type="primary" >
                    <Plus className={styles.icon} />
                    Add
                </Button>
                <RangePicker {...{
                    onChange: this.onChange,
                    value: props.value
                }}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridControl)
