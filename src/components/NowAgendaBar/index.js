import React, { Component } from 'react'
// import './main.scss'

export class NowAgendaBar extends Component {

  componentDidMount() {
    setInterval(this.nowPlaying, 2000)
  }

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

  render() {
      return (
        <div className="now-agenda">
          <div className="agenda">
            <p>{this.agendaLoader(this.props.agenda)}</p>
          </div>
        </div>
      )
  }
}

export default NowAgendaBar
