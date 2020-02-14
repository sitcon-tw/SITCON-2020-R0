import React, { Component } from 'react'

export class MainDisplay extends Component {

    contentLoader(e) {
      if (typeof e === 'object') {
        return (
          <div className="content-agenda">
            <div className="title">
              <p>{e.title}</p>
            </div>
            <div className="name">
              <p>{e.name}</p>
            </div>
          </div>
        )
      } else {
        return (
          <div className="content-agenda">
            <div className="title">
              <p>{e}</p>
            </div>
            <div className="name"></div>
          </div>
        )
      }
    }
  
    render() {
      return (
        <div className="MainDisplay">
          {this.contentLoader(this.props.agenda)}
        </div>
      )
    }
}

export default MainDisplay
