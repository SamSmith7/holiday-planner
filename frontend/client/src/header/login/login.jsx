import { Button, Input } from 'antd'
import classnames from 'classnames'
import fp from 'lodash/fp'
import propTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { login, loginDetails } from '../../actions/header'
import styles from './login.mod.scss'


const mapStateToProps = ({ header }) => {

    return {
        password: header.password,
        username: header.username
    }
}

const mapDispatchToProps = dispatch => {

    return {
        onChangePassword: password => dispatch(loginDetails({password})),
        onChangeUsername: username => dispatch(loginDetails({username})),
        onLogin: details => dispatch(login(details))
    }
}

class Login extends React.Component {

    static displayName = 'Login'

    static propTypes = {
        className: propTypes.string,
        onChangePassword: propTypes.func,
        onChangeUsername: propTypes.func,
        onLogin: propTypes.func,
        password: propTypes.string,
        username: propTypes.string
    }

    onChangePassword = e => {

        this.props.onChangePassword(fp.get('target.value', e))
    }

    onChangeUsername = e => {

        this.props.onChangeUsername(fp.get('target.value', e))
    }

    onLogin = () => {

        this.props.onLogin({
            password: this.props.password,
            username: this.props.username
        })
    }

    render() {

        const { props } = this

        const className = classnames(styles.root, props.className)

        return (
            <div className={className}>
                <Input {...{
                    className: styles.input,
                    onChange: this.onChangeUsername,
                    placeholder: 'Username',
                    value: props.username
                }}/>
                <Input {...{
                    className: styles.input,
                    onChange: this.onChangePassword,
                    placeholder: 'Password',
                    type: 'password',
                    value: props.password
                }}/>
                <Button onClick={this.onLogin}>
                    Go
                </Button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
