import { Button, DatePicker, Input, Select } from 'antd'
import { EventTypes } from 'constants'
import fp from 'lodash/fp'
import moment from 'moment'
import propTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'ui'
import { cancelEvent, submitEvent, updateEvent } from '../actions/event-modal'

import styles from './event-modal.mod.scss'


const Option = Select.Option
const RangePicker = DatePicker.RangePicker

const mapStateToProps = ({ eventModal }) => {

    return {
        end: eventModal.end,
        location: eventModal.location,
        render: eventModal.render,
        start: eventModal.start,
        title: eventModal.title,
        type: eventModal.type
    }
}

const mapDispatchToProps = dispatch => {

    return {
        onCancel: () => dispatch(cancelEvent()),
        onChange: update => dispatch(updateEvent(update)),
        onSubmit: () => dispatch(submitEvent())
    }
}

class EventModal extends React.Component {

    static displayName = 'EventModal'

    static propTypes = {
        onChange: propTypes.func,
        render: propTypes.bool,
        title: propTypes.string
    }

    onLocationChange = e => {

        const location = fp.get('target.value', e)
        this.props.onChange({location})
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

    onTypeChange = type => {

        this.props.onChange({type})
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
                            Add Event
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
                                    Location:
                                </span>
                                <Input {...{
                                    onChange: this.onLocationChange,
                                    value: props.location
                                }} />
                            </div>
                            <div className={styles.field}>
                                <span className={styles.label}>
                                    Type:
                                </span>
                                <Select {...{
                                    className: styles.input,
                                    defaultValue: 'accomodation',
                                    onChange: this.onTypeChange,
                                    value: props.type
                                }}>
                                    <Option value={EventTypes.ACCOMODATION}>Accomodation</Option>
                                    <Option value={EventTypes.ACTIVITIES}>Activity</Option>
                                    <Option value={EventTypes.TRAVEL}>Travel</Option>
                                </Select>
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
                                    Add Event
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
