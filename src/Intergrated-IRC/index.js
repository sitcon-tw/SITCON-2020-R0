import React, { Component } from 'react'
import './main.css'

import IRC from '../IRC'

class IntegratedIRC extends Component {

  render() {
    return (
      <div className="integrated">
        <div className="main-content">
        </div>
        <div className="IRC-bar">
          <IRC />
        </div>
      </div>
    )
  }
}

export default IntegratedIRC