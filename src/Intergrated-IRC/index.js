import React, { Component } from 'react'
import './main.scss'
import Agendas from './agendas'

import IRC from '../IRC'

class NowAgenda extends Component {

  componentDidMount() {
    setInterval(this.nowPlaying, 2000)
  }

  agendaLoader(e) {
    let agenda = 'SITCON 學生計算機年會'
    if(typeof e === 'object') {
      agenda = `${e.startTime.hours.toString().padStart(2, '0')}:${e.startTime.minutes.toString().padStart(2, '0')}` 
      + '~' 
      + `${e.endTime.hours.toString().padStart(2, '0')}:${e.endTime.minutes.toString().padStart(2, '0')}`
      + ' '
      + `${e.title}`
      + ((e.name === '' || e.name === null) ? '' : ` by ${e.name}`)
    }
    return agenda
  }

  render() {
    return (
      <div className="now-agenda">
        <div className="agenda">
          <p>{ this.agendaLoader(this.props.agenda) }</p>
        </div>
      </div>
    )
  }
}

class Content extends Component {

  contentLoader(e) {
    if(typeof e === 'object') {
      return (
        <div className="content-agenda">
          <div className="title">
            <p>{ e.title }</p>
          </div>
          <div className="name">
            <p>{ e.name }</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="content-agenda">
          <div className="title">{ e }</div>
          <div className="name"></div>
        </div>
      )
    }
  }

  render() {
    return(
      <div className="content">
        { this.contentLoader(this.props.agenda) }
      </div>
    )
  }
}

class IntegratedIRC extends Component {

  constructor(props) {
    super(props)
    this.state = {
      agenda: 'SITCON 學生計算機年會'
    }

    this.nowPlaying = this.nowPlaying.bind(this)
  }

  componentDidMount() {
    setInterval(this.nowPlaying, 1000)
  }

  nowPlaying() {
    let nowTime = new Date()
    for (let e of Agendas) {
      if (e.endTime.hours > nowTime.getHours() || ((e.endTime.hours === nowTime.getHours()) 
      && (e.endTime.minutes > nowTime.getMinutes()))) {

        this.setState({ agenda: e })
        break
      } 
    }
    
  }

  render() {
    return (
      <div className="integrated">
        <div className="main-content">
          <NowAgenda agenda={ this.state.agenda }/>
          <Content agenda={ this.state.agenda }/>
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