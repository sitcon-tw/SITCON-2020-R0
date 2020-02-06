import React, { Component } from 'react'
import Agendas from './agendas'

import { IRC, NowAgendaBar, MainDisplay, ButtomBar } from '../components'

const layoutTypes = {
  CommonMode: "一般模式",
  ForumMode: "論壇模式",
  LTMode: "LT"
}

const controlBotStateTypes = {
  ModeSelect: 1,
  SetAgenda: 2
}

const NO_AGENDA_TEXT = 'SITCON 學生計算機年會'

class R0Page extends Component {

  constructor(props) {
    super(props)
    this.state = {
      agenda: NO_AGENDA_TEXT,
      autoAgenda: true,
      currentLayout: localStorage.currentLayout || layoutTypes[Object.keys(layoutTypes)[0]],
      controlBotToken: process.env.REACT_APP_CONTROL_BOT_TOKEN ? process.env.REACT_APP_CONTROL_BOT_TOKEN : null,
      controlBotState: controlBotStateTypes.ModeSelect
    }

    this.nowPlaying = this.nowPlaying.bind(this)
    this.controlBotUpdate = this.controlBotUpdate.bind(this)
  }

  componentDidMount() {
    setInterval(this.nowPlaying, 1000)
    this.controlBotUpdate()
  }


  // receive 

  controlBotReceived(data) {
    if (data.message) {


      // Agenda
      if (data.message.text.search("/auto") === 0) {
        this.setState({
          autoAgenda: true
        })

        this.controlBotSend(data.message.chat.id, "切換為自動議程")
      } else if (data.message.text.search("/manual") === 0) {
        this.setState({
          autoAgenda: false
        })

        this.controlBotSend(data.message.chat.id, "切換為手動議程")
      }
      else if (data.message.text.search("/set") === 0) {
        let keyboard = [];
        let counter = 0;
        let index = 0;
        Agendas.forEach((a) => {
          if (!a.isRestAgenda) {
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
          }
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
      // cancel command
      else if (data.message.text.search("/cancel") === 0) {
        this.setState({
          controlBotState: controlBotStateTypes.ModeSelect
        })

        this.controlBotSend(data.message.chat.id, "已取消動作")
      }



      else if (this.state.controlBotState === controlBotStateTypes.ModeSelect) {
        this.setState({
          currentLayout: data.message.text
        })
        localStorage.currentLayout = data.message.text

        this.controlBotSend(data.message.chat.id, null)
      }


      else if (this.state.controlBotState === controlBotStateTypes.SetAgenda) {

        const newAgendaI = Agendas.findIndex((v) => v.title === data.message.text);

        this.setState({
          agenda: newAgendaI !== -1 ? Agendas[newAgendaI] : data.message.text,
          autoAgenda: false,
          controlBotState: controlBotStateTypes.ModeSelect
        })
        localStorage.agenda = newAgendaI ? newAgendaI : data.message.text

        this.controlBotSend(data.message.chat.id, "議程設定為:" + data.message.text)
      }
    }
  }

  controlBotSend(id, text, reply_markup) {

    let modeKeyboard = [];
    Object.keys(layoutTypes).map(k => modeKeyboard.push({ text: layoutTypes[k] }))

    fetch("https://api.telegram.org/bot" + this.state.controlBotToken + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: id,
        text: text || ('目前狀態為：' + this.state.currentLayout + '\n目前議程為：' + (this.state.agenda && this.state.agenda.title ? this.state.agenda.title : this.state.agenda)),
        reply_markup: reply_markup ? reply_markup : { keyboard: [modeKeyboard] }
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
          result.result.forEach((r) => {
            localStorage.control_offset = r.update_id
            this.controlBotReceived(r)
          })
        }

        setTimeout(() => {
          this.controlBotUpdate()
        }, 100)
      }, (error) => {
        this.setState({
          error
        });

        setTimeout(() => {
          this.controlBotUpdate()
        }, 100)
      })
  }

  nowPlaying() {
    let nowTime = new Date()
    if (this.state.autoAgenda) {
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
    if (this.state.currentLayout === layoutTypes.CommonMode) {
      return (
        <div className="integrated">
          <div className="main-content">
            <NowAgendaBar agenda={this.state.agenda ? this.state.agenda : NO_AGENDA_TEXT} />
            <MainDisplay agenda={this.state.agenda ? this.state.agenda : NO_AGENDA_TEXT} />
            <div className="news"></div>
          </div>
          <div className="IRC-bar">
            <div className="live"></div>
            <IRC />
            <ButtomBar />
          </div>
        </div>
      )
    }
    else if (this.state.currentLayout === layoutTypes.ForumMode) {
      return (
        <div className="integrated">
          <IRC />
        </div>
      )
    }
  }
}

export default R0Page