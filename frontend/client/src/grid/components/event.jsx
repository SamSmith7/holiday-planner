import classnames from 'classnames'
import differenceInDays from 'date-fns/difference_in_days'
import fp from 'lodash/fp'
import propTypes from 'prop-types'
import React from 'react'

import styles from './event.mod.scss'


export default class extends React.Component {

    static displayName = 'Event'

    static propTypes = {
        event: propTypes.object,
        length: propTypes.number
    }

    render() {

        const { props } = this

        const data = fp.get('event.data', props)
        const eventLength = differenceInDays(
            fp.get('event.end', props),
            fp.get('event.start', props)
        )
        const width = `${(100 / props.length) * eventLength}%`

        const offsetInDays = differenceInDays(
            fp.get('event.start', props),
            props.gridStart
        )
        const left = `${(100 / props.length) * offsetInDays}%`

        return (
            <div {...{
                className: classnames(styles.root, styles[props.event.type]),
                style: {left, width}
            }}>
                <span className={styles.title}>
                    {data.title}
                </span>
            </div>
        )
    }
}
