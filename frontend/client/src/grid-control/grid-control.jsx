import { Button, DatePicker } from 'antd'
import { Plus } from 'icons'
import moment from 'moment'
import propTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { setRange, testServer } from '../actions/grid.jsx'

import styles from './grid-control.mod.scss'


const RangePicker = DatePicker.RangePicker

const mapStateToProps = ({ grid }) => {

    return {
        value: [moment(grid.start), moment(grid.end)]
    }
}

const mapDispatchToProps = dispatch => {

    return {
        onAdd: () => dispatch(testServer()),
        onChange: range => dispatch(setRange(range))
    }
}

class GridControl extends React.Component {

    static displayName = 'GridControl'

    static propTypes = {
        onAdd: propTypes.func,
        onChange: propTypes.func,
        value: propTypes.array
    }

    onChange = ([start, end]) => {

        this.props.onChange({
            end: end ? end.toDate() : null,
            start: start ? start.toDate() : null
        })
    }

    onInputClick = e => console.log(e)

    render() {

        const { props } = this

        return (
            <div className={styles.root}>
                <Button type="primary" onClick={props.onAdd}>
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
