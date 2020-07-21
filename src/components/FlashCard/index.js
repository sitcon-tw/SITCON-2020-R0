import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'

export class FlashCard extends Component {

    render() {
        return (
            <div className="FlashCard">
                {
                    this.props.forumSpeakers.map((e, i) => (e !== undefined) ? (
                        <CSSTransition
                            key={i}
                            in={this.props.nowForumSpeaker.name === e.name}
                            timeout={1000}
                            classNames="speakers"
                        >
                            <img src={`/img/${e.url}`} alt="" key={'img' + i} className={`${(this.props.nowForumSpeaker.name === e.name) ? 'active' : ''}`} />
                        </CSSTransition>
                    ) : "")
                }
            </div>
        )
    }
}

export default FlashCard
