import { Bars } from 'icons'
import React from 'react'
import { connect } from 'react-redux'

import styles from './header.mod.scss'

const mapStateToProps = state => {

    return {}
}

const mapDispatchToProps = dispatch => {

    return {}
}

class Header extends React.Component {

    render() {

        return (
            <div className={styles.root}>
                <div className={styles.left}>
                    <Bars />
                </div>
                <div className={styles.right}>
                    last logged in: hh:mm
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
