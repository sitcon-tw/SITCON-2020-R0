import React, { Component } from 'react'
import './main.scss'
import Agenda from './agenda'

import IRC from '../IRC'

class NowAgenda extends Component {

  constructor(props) {
    super(props)
    this.state = {
      agenda: ''
    }

    this.nowPlaying = this.nowPlaying.bind(this)
  }

  componentDidMount() {
    setInterval(this.nowPlaying, 2000)
  }

  nowPlaying() {
      let nowTime = new Date()
      let agenda = 'SITCON 學生計算機年會'
      for (let e of Agenda) {
        if (e.endTime.hours > nowTime.getHours() || ((e.endTime.hours === nowTime.getHours()) && (e.endTime
              .minutes > nowTime.getMinutes()))) {
          agenda = `${e.startTime.hours.toString().padStart(2, '0')}:${e.startTime.minutes.toString().padStart(2, '0')}` 
          + '~' 
          + `${e.endTime.hours.toString().padStart(2, '0')}:${e.endTime.minutes.toString().padStart(2, '0')}`
          + ' '
          + `${e.title}`
          + ((e.name === '' || e.name === null) ? '' : ` by ${e.name}`)
          break
        } 
      }
      this.setState({ agenda: agenda })
  }

  render() {
    return (
      <div className="now-agenda">
        <div className="agenda">{ this.state.agenda }</div>
      </div>
    )
  }
}
class IntegratedIRC extends Component {

  render() {
    return (
      <div className="integrated">
        <div className="main-content">
          <NowAgenda />
          <div className="content"></div>
          <div className="news"></div>
        </div>
        <div className="IRC-bar">
          <div className="live"></div>
          <IRC />
          <div className="bar-content"></div>
        </div>
      </div>
    )
  }
}

export default IntegratedIRC