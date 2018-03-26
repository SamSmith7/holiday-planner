import { Button } from 'antd'
import propTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import styles from './home.mod.scss'


const mapStateToProps = () => {

    return {}
}

const mapDispatchToProps = dispatch => {

    return {
        push: url => dispatch(push(url))
    }
}

class Home extends React.Component {

    static displayName = 'Home'

    static propTypes = {
        push: propTypes.func
    }

    onClick = () => {

        this.props.push('/trip')
    }

    render() {

        return (
            <div className={styles.root}>
                Home Page
                <Button onClick={this.onClick}>
                    View Test Trip
                </Button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
