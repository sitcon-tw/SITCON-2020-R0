import React, { Component } from 'react'
import { layoutTypes } from './constant'
import { IRC, NowAgendaBar, MainDisplay, ButtomBar, SideBlock, Slido } from '../components'

const NO_AGENDA_TEXT = 'SITCON 學生計算機年會'

class R0Page extends Component {

  render() {
    let agenda = this.props.agenda ? this.props.agenda : NO_AGENDA_TEXT;

    if (this.props.currentLayout.type === layoutTypes.LayoutA) {
      return (
        <div className="R0page">
          <div className="top-bar">
            <NowAgendaBar agenda={agenda} />
          </div>
          <div className="main">
            <div className="main-display">
              <MainDisplay agenda={agenda} />
            </div>
            <div className="side-bar">
              <div className="side-block">
                <SideBlock mode={'irc'}/>
              </div>
              <div className="side-content">
                <IRC />
              </div>
            </div>
          </div>
          <div className="bottom-bar">
            <ButtomBar />
          </div>
        </div>
      )
    }
    else if (this.props.currentLayout.type === layoutTypes.LayoutB) {
      return (
        <div className="R0page">
          <div className="top-bar">
            <NowAgendaBar agenda={agenda} />
          </div>
          <div className="main">
            <div className="main-display">
              <MainDisplay agenda={agenda} />
            </div>
            <div className="side-bar">
              <div className="side-content">
                <Slido agenda={agenda}/>
              </div>
              <div className="side-block">
                <SideBlock mode={'slido'}/>
              </div>
            </div>
          </div>
          <div className="bottom-bar">
            <ButtomBar />
          </div>
        </div>
      )
    }
    else if (this.props.currentLayout.type === layoutTypes.LayoutC) {

      return (
        <div className="R0page">
          <div className="top-bar">
            <NowAgendaBar agenda={agenda} />
          </div>
          <div className="main">
            <div className="main-display">
              <Slido agenda={agenda}/>
            </div>
            <div className="side-bar">
              <div className="side-content">
                <IRC />
              </div>
              <div className="side-block">
                <SideBlock mode={'irc'}/>
              </div>
            </div>
          </div>
          <div className="bottom-bar">
            <ButtomBar />
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