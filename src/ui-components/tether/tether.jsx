import React from 'react'
import ReactDOM from 'react-dom'
import Rx from 'rxjs/Rx'

import styles from './tether.mod.scss'


const scroll$ = Rx.Observable.fromEvent(document.body, 'scroll')
const resize$ = Rx.Observable.fromEvent(document.body, 'resize')

export default Component => class Tether extends React.Component {

    static displayName = 'Tether'

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
            .startWith('')
            .switchMap(() => {
                return Rx.Observable.interval(1, Rx.Scheduler.animationFrame).take(1)
            })

        this.subscription = trigger$.subscribe(() => {

            const rect = ReactDOM.findDOMNode(this.component).getBoundingClientRect()
            const transform = `translate(${rect.x}px, ${rect.y + rect.height}px)`

            this.setState({ style: {transform} })
        })
    }

    componentWillUnmount() {

        this.subscription.unsubscribe()
    }

    render() {

        const { props, state } = this

        const tether = props.render
            ? (
                <div className={styles.tether} style={state.style}>
                    {props.children}
                </div>
            )
            : null

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
