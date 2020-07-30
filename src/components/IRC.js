import React, { Component } from 'react'

const IRC_name = process.env.REACT_APP_IRC_NAME;
let getUpdateTimeout = null;

function getUpdate(token, latestUpdateId) {
    return fetch('https://api.telegram.org/bot' + token + '/getUpdates?offset=' + (latestUpdateId + 1))
        .then(res => res.json());
}

export class IRC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            items: [],
            latestUpdateId: null,
            token: process.env.REACT_APP_TG_BOT_TOKEN ? process.env.REACT_APP_TG_BOT_TOKEN : null,
            stickersPath: {},
            IRC_id: localStorage.IRC_id ? JSON.parse(localStorage.IRC_id) : null
        };

        this.clearSavedMsg = this.clearSavedMsg.bind(this);
        this.saveMessage = this.saveMessage.bind(this);
    }

    componentDidMount() {
        this._ismounted = true;
        this.setState({
            items: localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages')) : this.state.items,
        });

        this.retriveMessage();

        document.addEventListener('keypress', (e) => {
            if (e.key === 'c') {
                console.log('clear!')
                this.clearSavedMsg()
            }
        })
    }

    componentWillUnmount() {
        this._ismounted = false;
        if (getUpdateTimeout) {
            clearTimeout(getUpdateTimeout);
            getUpdateTimeout = null;
        }
    }

    getStickerWithFileId(file_id) {
        return new Promise((resolve, reject) => {
            fetch('https://api.telegram.org/bot' + this.state.token + '/getFile?file_id=' + file_id)
                .then(res => res.json())
                .then((result) => {
                    if (result.ok && result.result) {
                        resolve('https://api.telegram.org/file/bot' + this.state.token + '/' + result.result.file_path);
                    } else {
                        reject(result);
                    }
                })
                .catch((err) => reject(err));
        })
    }

    retriveMessage = () => {
        if (this.state.token === null) return;

        getUpdate(this.state.token, this.state.latestUpdateId).then((result) => {
            if (!this._ismounted) return;

            if (result.ok && result.result) {
                let storaged = localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages')) : [];
                let newItems = [...storaged, ...result.result];
                console.log(newItems)
                newItems.map(e => {
                    if (!this.state.IRC_id && newItems[0].message.chat.title === IRC_name) {
                        this.setState({
                            IRC_id: e.message.chat.id
                        })
                        localStorage.IRC_id = e.message.chat.id
                    }
                    return 0
                })
                
                if (newItems.length >= 35) {
                    newItems = newItems.slice(5, newItems.length)
                }
                
                this.setState({
                    latestUpdateId: result.result.length > 0 ? [...result.result].pop().update_id : null,
                    error: null
                });
                console.log(newItems)

                this.saveMessage(newItems);
                let m = document.querySelector('.messages');
                m.scrollTop = m.scrollHeight;
            } else {
                this.setState({
                    error: { message: result.error_code + ': ' + result.description }
                });
            }
            getUpdateTimeout = setTimeout(this.retriveMessage, 1000);
        },
            (error) => {
                this.setState({
                    error
                });

                getUpdateTimeout = setTimeout(this.retriveMessage, 1000);
            }
        )
    }

    transferDate(date) {
        let now = new Date(date * 1000)
        let hours = now.getHours().toString().padStart(2, '0')
        let minutes = now.getMinutes().toString().padStart(2, '0')
        return hours + ':' + minutes
    }

    msgTable() {
        let { items } = this.state;
        let lastDate = null;

        if (this.state.IRC_id) {
            items = items.filter(e => e.message.chat.id === this.state.IRC_id)
        }

        return (
            <div className="messages">
                {items.map((item, key) => {

                    if (item.message.sticker && item.message.sticker.file_id && !this.state.stickersPath[item.message.sticker.file_id]) {
                        this.getStickerWithFileId(item.message.sticker.is_animated ? item.message.sticker.thumb.file_id : item.message.sticker.file_id).then((path) => {
                            let newStickersPath = this.state.stickersPath;
                            newStickersPath[item.message.sticker.file_id] = path;
                            this.setState({
                                stickersPath: newStickersPath
                            })
                        })
                    }

                    let date = this.transferDate(item.message.date);

                    const availableTypes = [
                        "photo",
                        "audio",
                        "voice",
                        "document",
                        "video",
                        "video_note",
                        "contact",
                        "dice",
                        "game",
                        "poll",
                        "venue",
                        "location",
                        "invoice"
                    ]

                    return (
                        <div key={key} className="message">

                            {(date !== lastDate && (lastDate = date)) ? (
                                <div className="time">{this.transferDate(item.message.date)}</div>) : ""}
                            <div className="word">
                                {item.message.from.username}: {
                                    item.message.text ?
                                        item.message.text.replace(/^<(.+)>/, '$1') :
                                        (item.message.sticker ? <img width="100px" src={this.state.stickersPath[item.message.sticker.file_id]} alt=""/> :
                                            <strong>[{
                                                availableTypes.find((fieldName) => {
                                                    return !!item.message[fieldName];
                                                })
                                            }]</strong>)
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        );

    }

    saveMessage(msgArray) {
        localStorage.setItem('messages', JSON.stringify(msgArray));
        // if(msgArray.length >= 25) {
        //     msgArray = msgArray.slice(5, msgArray.length)
        // }
        this.setState({
            items: msgArray
        });
    }

    clearSavedMsg() {
        this.saveMessage([]);
    }

    render() {
        return (
            <div className='IRC'>
                {/* {this.state.error ? <div style={{ marginBottom: "10px" }}>Error: {this.state.error.message}</div> : null} */}
                {this.msgTable()}
            </div>
        );
    }
}

export default IRC
