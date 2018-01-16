import { Bars } from 'icons'
import React from 'react'
import { connect } from 'react-redux'
import { Tether } from 'ui'
import { showMenu } from '../actions/header.jsx'

import styles from './header.mod.scss'


const mapStateToProps = ({ header }) => {

    return {
        showMenu: header.showMenu
    }
}

const mapDispatchToProps = dispatch => {

    return {
        onClick: () => dispatch(showMenu())
    }
}

class Button extends React.Component {

    static displayName = 'Button'

    render() {

        return (
            <button onClick={this.props.onClick} style={{width: 30}}>
                <Bars />
            </button>
        )
    }
}

const TetheredButton = Tether(Button)

class Header extends React.Component {

    static displayName = 'Header'

    render() {

        const { props } = this

        return (
            <div className={styles.root}>
                <div className={styles.left}>
                    <TetheredButton {...{
                        componentProps: {
                            onClick: props.onClick
                        },
                        render: props.showMenu
                    }}>
                        <div>Menu</div>
                    </TetheredButton>
                </div>
                <div className={styles.right}>
                    last logged in: hh:mm
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
