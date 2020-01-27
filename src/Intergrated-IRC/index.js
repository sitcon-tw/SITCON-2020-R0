import React, { Component } from 'react'
import './main.scss'

import IRC from '../IRC'

class IntegratedIRC extends Component {

  render() {
    return (
      <div className="integrated">
        <div className="main-content">
          <div className="now-agenda"></div>
          <div className="content"></div>
          <div className="news"></div>
        </div>
        <div className="IRC-bar">
          <div className="live"></div>
          <IRC />
          <div className="news"></div>
        </div>
      </div>
    )
  }
}

export default IntegratedIRC