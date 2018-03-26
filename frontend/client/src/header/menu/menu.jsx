import classnames from 'classnames'
import propTypes from 'prop-types'
import React from 'react'
import styles from './menu.mod.scss'


export default class Menu extends React.Component {

    static displayName = 'Menu'

    static propTypes = {
        className: propTypes.string
    }

    render() {

        const className = classnames(styles.root, this.props.className)

        return (
            <div className={className}>
                Menu
            </div>
        )
    }
}
