import React, { Component } from 'react'
import './main.css'

export class IRC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            items: [],
            latestUpdateId: null,
            token: process.env.TG_BOT_TOKEN ? process.env.TG_BOT_TOKEN : null,
            inputToken: ""
        };

        this.clearSavedMsg = this.clearSavedMsg.bind(this);
        this.saveMessage = this.saveMessage.bind(this);
    }

    componentDidMount() {
        this.setState({
            items: localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages')) : this.state.items,
        });

        this.setState({token: this.state.inputToken})

        this.retriveMessage();
        setInterval(() => {
            this.retriveMessage();
        }, 1000);

        document.addEventListener('keypress', (e) => {
            if(e.key === 'c') {
                console.log('clear!')
                this.clearSavedMsg()
            }
        })
    }

    retriveMessage() {
        if (this.state.token === null) return;
        fetch('https://api.telegram.org/bot' + this.state.token + '/getUpdates?offset=' + (this.state.latestUpdateId + 1))
            .then(res => res.json())
            .then((result) => {
                if (result.ok && result.result) {
                    console.log(result);

                    let storaged = localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages')) : [];
                    let newItems = [...storaged, ...result.result];

                    this.setState({
                        latestUpdateId: result.result.length > 0 ? [...result.result].pop().update_id : null,
                        error: null
                    });

                    this.saveMessage(newItems);
                    window.scrollTo(0, window.scrollMaxY)
                } else {
                    this.setState({
                        error: { message: result.error_code + ': ' + result.description }
                    });
                }
            },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    transferDate(date) {
        let nowTime = new Date(date*1000)
        let AMPM = 'AM'
        if (nowTime.getHours() >= 12) AMPM = 'PM'
        if (nowTime.getSeconds() < 10) return `${AMPM} ${nowTime.getHours()}:${nowTime.getMinutes()}:0${nowTime.getSeconds()}`
        return `${AMPM} ${nowTime.getHours()}:${nowTime.getMinutes()}:${nowTime.getSeconds()}`
    }

    msgTable() {
        const { items } = this.state;
        return (
            <div id="messages">
                {items.map((item, key) => (
                    <div key={key} className="message">
                        <div className="time">
                            <a href='#messages'>
                                {this.transferDate(item.message.date)}
                            </a>
                        </div>
                        <div className="word">
                            {item.message.chat.username}: {item.message.text ? item.message.text.replace(/^<(.+)>/, '$1') : (item.message.sticker ? item.message.sticker.emoji : <strong>Non Text or sticker</strong>)}
                        </div>
                    </div>
                ))}
            </div>
        );

    }

    saveMessage(msgArray) {
        localStorage.setItem('messages', JSON.stringify(msgArray));
        this.setState({
            items: msgArray
        });
    }

    clearSavedMsg() {
        this.saveMessage([]);
    }

    render() {
        return (
            <div>
                {/* {this.state.error ? <div style={{ marginBottom: "10px" }}>Error: {this.state.error.message}</div> : null} */}
                {this.msgTable()}
            </div>
        );
    }
}

export default IRC
