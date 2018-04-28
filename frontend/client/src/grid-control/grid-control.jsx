import { Button, DatePicker } from 'antd'
import { Plus } from 'icons'
import moment from 'moment'
import propTypes from 'prop-types'
import React from 'react'

import styles from './grid-control.mod.scss'


const RangePicker = DatePicker.RangePicker

class GridControl extends React.Component {

    static displayName = 'GridControl'

    static propTypes = {
        onAdd: propTypes.func,
        onRangeChange: propTypes.func
    }

    onChange = ([start, end]) => {

        this.props.onRangeChange({
            end: end ? end.toISOString() : null,
            start: start ? start.toISOString() : null
        })
    }

    render() {

        const { props } = this

        return (
            <div className={styles.root}>
                <h2 className={styles.title}>{props.title}</h2>
                <RangePicker {...{
                    onChange: this.onChange,
                    value: [moment(props.start), moment(props.end)]
                }}/>
            </div>
        )
    }
}

export default GridControl
