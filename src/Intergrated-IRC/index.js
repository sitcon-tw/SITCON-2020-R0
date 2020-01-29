import React, { Component } from 'react'
import './main.scss'
import Agendas from './agendas'

import IRC from '../IRC'

class NowAgenda extends Component {

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

class Content extends Component {

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
      <div className="content">
        {this.contentLoader(this.props.agenda)}
      </div>
    )
  }
}

const layoutTypes = {
  LayoutA: 0,
  LayoutB: 1
}

const controlBotStateTypes = {
  WaitingCMD: 0,
  Layout: 1,
  SetAgenda: 2
}

const NO_AGENDA_TEXT = 'SITCON 學生計算機年會'

class IntegratedIRC extends Component {

  constructor(props) {
    super(props)
    this.state = {
      agenda: NO_AGENDA_TEXT,
      useAgendaTimeTable: true,
      currentLayout: localStorage.currentLayout || Object.keys(layoutTypes)[0],
      controlBotToken: process.env.REACT_APP_CONTROL_BOT_TOKEN ? process.env.REACT_APP_CONTROL_BOT_TOKEN : null,
      controlBotState: controlBotStateTypes.WaitingCMD
    }

    this.nowPlaying = this.nowPlaying.bind(this)
    this.controlBotUpdate = this.controlBotUpdate.bind(this)
  }

  componentDidMount() {
    setInterval(this.nowPlaying, 1000)
    this.controlBotUpdate()
    console.log(this.state.currentLayout)
  }


  // receive 
  
  controlBotReceived(data) {
    if (data.message) {

      // set layout
      if (data.message.text.search("/layout") === 0) {
        let keyboard = [];
        Object.keys(layoutTypes).map(k => keyboard.push({ text: k }))

        this.controlBotSend(data.message.chat.id, "點選下方layout",
          {
            keyboard: [keyboard]
          }
        )

        this.setState({
          controlBotState: controlBotStateTypes.Layout
        })
      }
      else if (data.message.text.search("/agenda") === 0) {
        let keyboard = [];
        let counter = 0;
        let index = 0;
        Agendas.map((a) => {
          if (!keyboard[index]) {
            keyboard[index] = [];
          }
          keyboard[index].push({
            text: a.title
          })
          counter++;
          if (counter > 5) {
            counter = 0;
            index++;
          }

          return a
        })

        this.controlBotSend(data.message.chat.id, "請在下方選擇議程",
          {
            keyboard
          }
        )

        this.setState({
          controlBotState: controlBotStateTypes.SetAgenda
        })
      }
      // use default agenda
      else if (data.message.text.search("/reset") === 0) {
        this.setState({
          useAgendaTimeTable: true
        })
        localStorage.agenda = null

        this.controlBotSend(data.message.chat.id, null,
          {
            remove_keyboard: true
          }
        )
      }
      // cancel command
      else if (data.message.text.search("/cancel") === 0) {
        this.setState({
          controlBotState: controlBotStateTypes.WaitingCMD
        })

        this.controlBotSend(data.message.chat.id, "已取消動作",
          {
            remove_keyboard: true
          }
        )
      }
      else if (this.state.controlBotState === controlBotStateTypes.Layout) {
        this.setState({
          currentLayout: data.message.text
        })
        localStorage.currentLayout = data.message.text

        this.controlBotSend(data.message.chat.id, null,
          {
            remove_keyboard: true
          }
        )
      } else if (this.state.controlBotState === controlBotStateTypes.SetAgenda) {

        const newAgendaI = Agendas.findIndex((v) => v.title === data.message.text);

        this.setState({
          agenda: newAgendaI !== -1 ? Agendas[newAgendaI] : data.message.text,
          useAgendaTimeTable: false
        })
        localStorage.agenda = newAgendaI ? newAgendaI : data.message.text

        this.controlBotSend(data.message.chat.id, "議程設定為:" + data.message.text,
          {
            remove_keyboard: true
          }
        )
      }
    }
  }

  controlBotSend(id, text, reply_markup) {
    fetch("https://api.telegram.org/bot" + this.state.controlBotToken + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: id,
        text: text || ('目前狀態為：' + this.state.currentLayout + '\n目前議程為: ' + (this.state.agenda && this.state.agenda.title ? this.state.agenda.title : this.state.agenda)),
        reply_markup
      })
    })
  }

  controlBotUpdate() {
    fetch("https://api.telegram.org/bot" + this.state.controlBotToken + "/getUpdates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        offset: +localStorage.control_offset + 1,
        timeout: 60
      }),
    })
      .then(res => res.json())
      .then((result) => {
        if (result.ok) {
          result.result.map((r) => {
            localStorage.control_offset = r.update_id
            this.controlBotReceived(r)
            return console.log(r)
          })
        }

        setTimeout(() => {
          this.controlBotUpdate()
        }, 100)
      })
  }

  nowPlaying() {
    let nowTime = new Date()
    if (this.state.useAgendaTimeTable) {
      for (let e of Agendas) {
        if (e.endTime.hours > nowTime.getHours() || ((e.endTime.hours === nowTime.getHours())
          && (e.endTime.minutes > nowTime.getMinutes()))) {

          this.setState({ agenda: e })
          break
        }
      }
    }
  }



  render() {
    if(this.state.currentLayout === 'LayoutA') {
      return (
        <div className="integrated">
          <div className="main-content">
            <NowAgenda agenda={this.state.agenda ? this.state.agenda : NO_AGENDA_TEXT} />
            <Content agenda={this.state.agenda ? this.state.agenda : NO_AGENDA_TEXT} />
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
    else if(this.state.currentLayout === 'LayoutB') {
      return (
        <div className="integrated">
            <IRC />
        </div>
      )
    }
  }
}

export default IntegratedIRC