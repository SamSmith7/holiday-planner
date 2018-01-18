import classnames from 'classnames'
import React from 'react'
import styles from './menu.mod.scss'


export default class Menu extends React.Component {


    render() {

        const className = classnames(styles.root, this.props.className)

        return (
            <div className={className}>
                Menu
            </div>
        )
    }
}
