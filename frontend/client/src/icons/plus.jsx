import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/fontawesome-free-solid'
import React from 'react'


export default class Bars extends React.Component {

    render() {

        const { props } = this

        return (
            <FontAwesomeIcon {...{
                className: props.className,
                icon: faPlus,
                size: props.size
            }} />
        )
    }
}
