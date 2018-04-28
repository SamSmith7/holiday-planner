import propTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router'
import { init } from '../actions/root'
import Header from '../header/header'
import Home from '../home/home'
import Trip from '../trip/trip'
import TripModal from '../trip-modal/trip-modal'
import Trips from '../trips/trips'
import { Styles } from 'ui'

import styles from './root.mod.scss'


const app = Styles.CommonModules.app

const mapStateToProps = ({ root, user }) => {

    return {
        ready: root.ready,
        user
    }
}

const mapDispatchToProps = dispatch => {

    return {
        init: () => dispatch(init())
    }
}

class Root extends React.Component {

    static displayName = 'Root'

    static propTypes = {
        init: propTypes.func,
        ready: propTypes.bool,
        user: propTypes.object
    }

    componentDidMount() {

        this.props.init()
    }

    render() {

        return (
            <div className={`${styles.root} ${app.root}`}>
                <Header />
                {!this.props.ready && (
                    <div className={styles.loading}>
                        Loading...
                    </div>
                )}
                {this.props.ready && (
                    <div className={styles.main}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/trip/:id" component={Trip} />
                            <Route path="/trips" component={Trips} />
                        </Switch>
                    </div>
                )}
                <TripModal />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root))
