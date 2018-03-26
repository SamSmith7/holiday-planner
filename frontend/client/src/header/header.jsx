import { Button } from 'antd'
import { Bars } from 'icons'
import fp from 'lodash/fp'
import propTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'ui'
import { showLogin, showMenu } from '../actions/header'
import Login from './login/login'
import Menu from './menu/menu'

import styles from './header.mod.scss'


const mapStateToProps = ({ header, user }) => {

    return {
        loggedIn: !fp.isEmpty(user),
        showLogin: header.showLogin,
        showMenu: header.showMenu,
        user
    }
}

const mapDispatchToProps = dispatch => {

    return {
        onClick: () => dispatch(showMenu()),
        onToggleLogin: () => dispatch(showLogin())
    }
}

class Header extends React.Component {

    static displayName = 'Header'

    static propTypes = {
        isLoggedIn: propTypes.bool,
        onClick: propTypes.func,
        onToggleLogin: propTypes.func,
        showLogin: propTypes.bool,
        showMenu: propTypes.bool
    }

    componentDidMount() {

        this.overlay = document.getElementById('overlay')
    }

    render() {

        const { props } = this

        return (
            <div className={styles.root}>
                <div className={styles.left}>
                    <Button onClick={props.onClick} type="ghost">
                        <Bars />
                    </Button>
                    <Modal render={props.showMenu}>
                        <Menu className={styles.menu}/>
                    </Modal>
                </div>
                <div className={styles.right}>
                    {props.loggedIn && (
                        `Logged in as: ${fp.get('user.name', props)}`
                    )}
                    {!props.loggedIn && (
                        <React.Fragment>
                            <Button onClick={props.onToggleLogin}>
                                Login
                            </Button>
                            <Modal render={props.showLogin}>
                                <Login className={styles.login}/>
                            </Modal>
                        </React.Fragment>
                    )}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
