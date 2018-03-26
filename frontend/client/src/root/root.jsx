import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router'
import Header from '../header/header'
import Home from '../home/home'
import Trip from '../trip/trip'
import { Styles } from 'ui'

import styles from './root.mod.scss'


const app = Styles.CommonModules.app

const mapStateToProps = ({ user }) => {

    return {
        user
    }
}

const mapDispatchToProps = dispatch => {

    return {}
}

class Root extends React.Component {

    static displayName = 'Root'

    render() {

        return (
            <div className={`${styles.root} ${app.root}`}>
                <Header />
                <div className={styles.main}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/trip" component={Trip} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root))
