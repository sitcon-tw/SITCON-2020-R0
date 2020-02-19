import React, { Component } from 'react'

export class SideBlock extends Component {
    render() {
        if(this.props.mode === 'slido') {
            return(
                <div className="SideBlock">slido</div>
            )
        } else {
            return(
                <div className="SideBlock">irc</div>
            )
        }
    }
}

export default SideBlock
