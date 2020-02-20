import React, { Component } from 'react'
// import './main.scss'

export class NowAgendaBar extends Component {

  agendaLoader(e) {
    let agenda = e
    if (typeof e === 'object') {
      agenda = `${e.startTime.hours.toString().padStart(2, '0')}:${e.startTime.minutes.toString().padStart(2, '0')}`
        + '~'
        + `${e.endTime.hours.toString().padStart(2, '0')}:${e.endTime.minutes.toString().padStart(2, '0')}`
        + ' '
        + `${e.title}`
        + ((e.name === '' || e.name === null) ? '' : ` by ${e.name}`)
    }
    return agenda
  }

  getTime() {
    let now = new Date()
    let hours = now.getHours().toString().padStart(2, '0')
    let minutes = now.getMinutes().toString().padStart(2, '0')
    return hours + ':' + minutes
  }

  render() {
    if(typeof this.props.agenda === 'object')
      return (
        <div className="NowAgendaBar">
          <div className="agenda">
            <div className="agenda-time">{ this.getTime() }</div>
            <div className="agenda-title">{ this.props.agenda.title }</div>
            <div className="agenda-name">{ this.props.agenda.name }</div>
          </div>
        </div>
      )
    else
        return (
          <div className="NowAgendaBar">
            <div className="agenda">
            <div className="agenda-time">{ this.getTime() }</div>
            <div className="agenda-title">{ this.props.agenda }</div>
          </div>
        </div>
        )
  }
}

export default NowAgendaBar
