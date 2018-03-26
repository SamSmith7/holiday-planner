import fp from 'lodash/fp'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'

export default function requireAuth(Component) {

    const mapStateToProps = ({ user }) => {

        return {
            isLoggedIn: !fp.isEmpty(user)
        }
    }

    const mapDispatchToProps = dispatch => {

        return {
            push: url => dispatch(push(url))
        }
    }

    class Authenticated extends React.Component {

        static displayName = 'Authenticated'

        componentWillMount() {

            if (!this.props.isLoggedIn) {
                this.props.push('/')
            }
        }

        render() {

            return this.props.isLoggedIn
                ? <Component { ...this.props } />
                : null
        }

    }

    return withRouter(connect(mapStateToProps, mapDispatchToProps)(Authenticated))
}
