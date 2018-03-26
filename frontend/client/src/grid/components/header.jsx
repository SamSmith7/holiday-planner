import format from 'date-fns/format'
import fp from 'lodash/fp'
import propTypes from 'prop-types'
import React from 'react'

import styles from './header.mod.scss'


export default class extends React.Component {

    static displayName = 'Header'

    static propTypes = {
        range: propTypes.array
    }

    columnRenderer = date => {

        const title = format(date, 'dddd Do')

        return (
            <span className={styles.column} key={title} >
                {title}
            </span>
        )
    }

    render() {

        return (
            <div className={styles.root}>
                {fp.map(this.columnRenderer, this.props.range)}
            </div>
        )
    }
}
