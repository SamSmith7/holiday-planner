import { Bars } from 'icons'
import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Modal, Tether } from 'ui'
import { showMenu } from '../actions/header.jsx'
import Menu from './menu/menu.jsx'

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

    componentDidMount() {

        this.overlay = document.getElementById('overlay')
    }

    render() {

        const { props } = this

        return (
            <div className={styles.root}>
                <div className={styles.left}>
                    <Button onClick={props.onClick} />
                    {/* <TetheredButton {...{
                        componentProps: {
                            onClick: props.onClick
                        },
                        render: props.showMenu
                    }}>
                        <Menu />
                    </TetheredButton> */}
                    <Modal render={props.showMenu}>
                        <Menu className={styles.menu}/>
                    </Modal>
                </div>
                <div className={styles.right}>
                    last logged in: hh:mm
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
