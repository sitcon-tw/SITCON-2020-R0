import React, { Component } from 'react'
import { layoutTypes } from './constant'
import { IRC, NowAgendaBar, MainDisplay, ButtomBar } from '../components'

const NO_AGENDA_TEXT = 'SITCON 學生計算機年會'

class R0Page extends Component {

  render() {
    let agenda = this.props.agenda ? this.props.agenda : NO_AGENDA_TEXT;

    if (this.props.currentLayout.type === layoutTypes.LayoutA) {
      return (
        <div className="integrated">
          <div className="main-content">
            <NowAgendaBar agenda={agenda} />
            <MainDisplay agenda={agenda} />
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
    else if (this.props.currentLayout.type === layoutTypes.LayoutB) {
      return (
        <div className="integrated">
          <IRC />
        </div>
      )
    }
    else if (this.props.currentLayout.type === layoutTypes.LayoutC) {

      return (
        <div className="integrated">
          <div className="main-content">
            <NowAgendaBar agenda={agenda} />
            <MainDisplay agenda={agenda} />
            <div className="news"></div>
          </div>
        </div>
      )
    }

    return (
      <div className="integrated">

      </div>
    )
  }
}

export default R0Page