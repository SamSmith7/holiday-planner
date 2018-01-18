import fp from 'lodash/fp'
import React from 'react'
import ReactDOM from 'react-dom'
import Transition from 'react-transition-group/Transition'
import Rx from 'rxjs/Rx'

import styles from './tether.mod.scss'


const scroll$ = Rx.Observable.fromEvent(document.body, 'scroll')
const resize$ = Rx.Observable.fromEvent(document.body, 'resize')

const states = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 1 },
    exited: { opacity: 0 },
}

export default Component => class Tether extends React.Component {

    static displayName = 'Tether'

    static defaultProps = {
        duration: 300,
        states
    }

    constructor(props) {

        super(props)
        this.ref = document.body
    }

    state = {}

    componentDidMount() {

        const trigger$ = Rx.Observable
            .merge(
                scroll$,
                resize$
            )
            .filter(() => this.props.render) // does this work?
            .startWith('')
            .switchMap(() => {
                return Rx.Observable.interval(1, Rx.Scheduler.animationFrame).take(1)
            })

        this.subscription = trigger$.subscribe(() => {

            const rect = ReactDOM.findDOMNode(this.component).getBoundingClientRect()
            const transform = `translate(${rect.x}px, ${rect.y + rect.height}px)`

            this.setState({style: {
                transform,
                transition: `all ${this.props.duration}ms`
            }})
        })
    }

    componentWillUnmount() {

        this.subscription.unsubscribe()
    }

    render() {

        const { props, state } = this

        const tether = (
            <Transition in={props.render} timeout={props.duration}>
                {status => status !== 'exited'
                    ? (
                        <div {...{
                            className: styles.tether,
                            style: {...state.style, ...props.states[status]}
                        }} >
                            {props.children}
                        </div>
                    )
                    : null
                }
            </Transition>
        )

        return (
            <React.Fragment>
                <Component {...{
                    ...props.componentProps,
                    ref: component => { this.component = component }
                }} />
                {ReactDOM.createPortal(tether, this.ref)}
            </React.Fragment>
        )
    }
}
