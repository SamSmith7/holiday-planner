import { Button, DatePicker, Input, Select } from 'antd'
import fp from 'lodash/fp'
import moment from 'moment'
import propTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'ui'
import { cancelTrip, submitTrip, updateTrip } from '../actions/trip-modal'

import styles from './trip-modal.mod.scss'


const RangePicker = DatePicker.RangePicker

const mapStateToProps = ({ tripModal }) => {

    return {
        end: tripModal.end,
        isEdit: tripModal.isEdit,
        render: tripModal.render,
        start: tripModal.start,
        title: tripModal.title
    }
}

const mapDispatchToProps = dispatch => {

    return {
        onCancel: () => dispatch(cancelTrip()),
        onChange: update => dispatch(updateTrip(update)),
        onSubmit: () => dispatch(submitTrip())
    }
}

class EventModal extends React.Component {

    static displayName = 'EventModal'

    static propTypes = {
        onChange: propTypes.func,
        render: propTypes.bool,
        title: propTypes.string
    }

    onTimeChange = ([start, end]) => {

        this.props.onChange({
            end: end ? end.add(1, 'days').toISOString() : null,
            start: start ? start.toISOString() : null
        })
    }

    onTitleChange = e => {

        const title = fp.get('target.value', e)
        this.props.onChange({title})
    }

    render() {

        const { props } = this

        return (
            <Modal {...{
                render: props.render
            }}>
                <div className={styles.wipe}>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            {props.isEdit ? 'Edit Trip' : 'New Trip'}
                        </div>
                        <div className={styles.body}>
                            <div className={styles.field}>
                                <span className={styles.label}>
                                    Title:
                                </span>
                                <Input {...{
                                    onChange: this.onTitleChange,
                                    value: props.title
                                }} />
                            </div>
                            <div className={styles.field}>
                                <span className={styles.label}>
                                    When:
                                </span>
                                <RangePicker {...{
                                    className: styles.input,
                                    onChange: this.onTimeChange,
                                    value: [moment(props.start), moment(props.end)]
                                }}/>
                            </div>
                            <div className={styles.controls}>
                                <Button onClick={props.onCancel}>
                                    Cancel
                                </Button>
                                <Button type="primary" onClick={props.onSubmit}>
                                    {props.isEdit ? 'Update Trip' : 'Create Trip'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventModal)
