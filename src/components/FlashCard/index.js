import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'

export class FlashCard extends Component {

    render() {
        return(
            <div className="FlashCard">
                {
                    this.props.speakers.map((e, i) => (
                        <CSSTransition
                            key={i}
                            in={ this.props.nowSpeaker === i }
                            timeout={1000}
                            classNames="speakers"
                        >
                            <img src={`/img/${e}`} alt="" key={'img'+i} className={ `${ (this.props.nowSpeaker === i) ? 'active' : '' }` }/>
                        </CSSTransition>
                    ))
                }
            </div>
        )
    }
}

export default FlashCard
