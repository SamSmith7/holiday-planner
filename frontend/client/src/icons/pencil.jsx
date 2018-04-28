import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid'
import React from 'react'


export default class Bars extends React.Component {

    render() {

        const { props } = this

        return (
            <FontAwesomeIcon {...{
                className: props.className,
                icon: faPencilAlt,
                onClick: props.onClick,
                size: props.size
            }} />
        )
    }
}
