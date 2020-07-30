import React, { Component } from 'react'
import { layoutTypes } from './constant'
import { IRC, NowAgendaBar, MainDisplay, ButtomBar, SideBlock, Slido, FlashCard } from '../components'

const NO_AGENDA_TEXT = 'SITCON 學生計算機年會'
class R0Page extends Component {

  getSlidoCSS() {
    console.log('Get CSS!!')
    if (this.props.currentLayout.type === layoutTypes.LayoutA) {
      if (this.props.currentLayout.prop.main === 'slido') {
        return {
          main: 'slido-on-main slido-on-main-fade-in',
          sidebar: 'slido-on-sidebar slido-on-sidebar-fade-out'
        }
      }
      else if (this.props.currentLayout.prop.second === "slido") {
        return {
          main: 'slido-on-main slido-on-main-fade-out',
          sidebar: 'slido-on-sidebar slido-on-sidebar-fade-in'
        }
      }
      return {
        main: 'slido-on-main slido-on-main-fade-out',
        sidebar: 'slido-on-sidebar slido-on-sidebar-fade-out'
      }
    }
    return {
      main: 'slido-on-main',
      sidebar: 'slido-on-sidebar'
    }
  }

  render() {
    let agenda = this.props.agenda ? this.props.agenda : NO_AGENDA_TEXT

    if (this.props.currentLayout.type === layoutTypes.LayoutA) {
      return (
        <div className="R0page">
          <div className="top-bar">
            <NowAgendaBar agenda={agenda} />
          </div>
          <div className="main">
            <div className="main-display">
              {
                this.props.currentLayout.prop.main === "visual" ?
                  <>
                    <div className="visual">
                      <img className="lightningtalk" src="/img/r0/lightningtalk.png" alt="lightning talk"></img>
                    </div>
                  </> :
                  <MainDisplay agenda={agenda} />
              }
              <Slido agenda={agenda} CSS_state={this.getSlidoCSS().main} />
            </div>
            <div className="side-bar">
              <div className="side-block">
                <SideBlock mode={this.props.currentLayout.prop.second} />
              </div>
              <div className="side-content">
                <IRC />
                <Slido agenda={agenda} CSS_state={this.getSlidoCSS().sidebar} />
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
            <div className={"forum-slido " + ((this.props.currentLayout.prop.main === 'slido') ? "" : "forum-slido-hidden")}>
              <Slido agenda={agenda} CSS_state={this.getSlidoCSS()} />
            </div>
            <div className="forum-cam">
              <MainDisplay />
            </div>
            <div className="forum-card">
              <FlashCard forumSpeakers={this.props.forumSpeakers} nowForumSpeaker={this.props.nowForumSpeaker} />
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

          <div className={"timesup " + (this.props.currentLayout.prop.timeUp ? "" : "timesup-hide")}>

            <h1>
              <span className={ (this.props.currentLayout.prop.timeUp ? "type" : "")}>
                ERROR: Connection Timed Out
                <span className="caret">_</span>
              </span>
            </h1>

          </div>

          <div className="top-bar">
            <NowAgendaBar agenda={agenda} />
          </div>
          <div className="main">
            <div className="main-display">
              {
                this.props.currentLayout.prop.main === "visual" ?
                  <>
                    <div className="visual">
                      <img className="lightningtalk" src="/img/r0/lightningtalk.png" alt="lightning talk"></img>
                    </div>
                  </> :
                  <MainDisplay agenda={agenda} />
              }
              <Slido agenda={agenda} CSS_state={this.getSlidoCSS().main} />
            </div>
            <div className="side-bar">
              <div className="side-block">
                <SideBlock mode={this.props.currentLayout.prop.second} />
              </div>
              <div className="side-content">
                <IRC />
                <Slido agenda={agenda} CSS_state={this.getSlidoCSS().sidebar} />
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