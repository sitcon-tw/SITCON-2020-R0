import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'

const images = ['1.png', '2.png', '3.png', '4.png']

export class FlashCard extends Component {

    render() {
        return(
            <div className="FlashCard">
                {
                    images.map((e, i) => (
                        <CSSTransition
                            key={i}
                            in={ this.props.speaker === i }
                            timeout={1000}
                            classNames="speakers"
                        >
                            <img src={`/img/${e}`} alt="" key={'img'+i} className={ `${ (this.props.speaker === i) ? 'active' : '' }` }/>
                        </CSSTransition>
                    ))
                }
            </div>
        )
    }
}

export default FlashCard
