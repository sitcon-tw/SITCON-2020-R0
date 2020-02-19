import React, { Component } from 'react'

export class Slido extends Component {
  render() {
    let slido = this.props.agenda.slido
    console.log(slido)
    if(slido) {
      return (
        <div className="slido">
          <iframe title="test" src={slido.iframe} frameborder="0"></iframe>
        </div>
      )
    } else {
      return (
        <div className="slido-disabled"></div>
      )
    }
  }
}

export default Slido