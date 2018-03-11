import fp from 'lodash/fp'
import React from 'react'
import ResizeObserver from 'resize-observer-polyfill'


export default (WrappedComponent = 'div') => class extends React.Component {

    observer = new ResizeObserver(
        fp.forEach(entry => this.props.onResize(entry.contentRect))
    )

    createRef = name => ref => this[name] = ref

    componentDidMount() {

        this.observer.observe(this.target)
    }

    render() {

        return (
            <WrappedComponent {...{
                ...this.props.componentProps,
                ref: this.createRef('target')
            }}>
                {this.props.children}
            </WrappedComponent>
        )
    }
}
