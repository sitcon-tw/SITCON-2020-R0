import React, { Component } from 'react'

const IRC_name = process.env.REACT_APP_IRC_NAME;
let getUpdateTimeout = null;

function getUpdate(token, latestUpdateId) {
    return fetch('https://api.telegram.org/bot' + token + '/getUpdates?offset=' + (latestUpdateId + 1))
        .then(res => res.json());
}

function getMessage(e) {
    return e.edited_message || e.message;
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

                // if IRC_id is null, get one
                if (!this.state.IRC_id) {
                    newItems.forEach(e => {
                        if (!this.state.IRC_id) {
                            const message = getMessage(e);

                            if (message.chat.title === IRC_name) {
                                this.setState({
                                    IRC_id: message.chat.id
                                })
                                localStorage.IRC_id = message.chat.id;
                            }
                        }
                    })
                }

                newItems = newItems.filter((e) => {
                    const message = getMessage(e);

                    return message && message.chat && message.chat.id === this.state.IRC_id;
                })

                newItems = newItems.sort((a, b) => {
                    const msg_a = getMessage(a);
                    const msg_b = getMessage(b);

                    if (msg_a.edit_date === undefined) msg_a.edit_date = 1;
                    if (msg_b.edit_date === undefined) msg_b.edit_date = 1;

                    return msg_a.message_id > msg_b.message_id ? 1 : msg_a.message_id === msg_b.message_id ?
                        msg_a.edit_date > msg_b.edit_date ? 1 : msg_a.edit_date === msg_b.edit_date ? 0 : -1
                        : -1;
                });

                newItems = newItems.map((e, i) => {
                    const update_id = e.update_id;
                    const msg = getMessage(e);

                    const index = newItems.findIndex((e) => {
                        const m = getMessage(e);
                        return m.message_id === msg.message_id && e.update_id !== update_id;
                    });

                    if (i < index) return null;
                    return e;
                }).filter((e) => e !== null);

                if (newItems.length >= 35) {
                    newItems = newItems.slice(5, newItems.length)
                }

                this.setState({
                    latestUpdateId: result.result.length > 0 ? [...result.result].pop().update_id : null,
                    error: null
                });

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

        return (
            <div className="messages">
                {items.map((item, key) => {
                    const message = getMessage(item);

                    if (message.sticker && message.sticker.file_id && !this.state.stickersPath[message.sticker.file_id]) {
                        this.getStickerWithFileId(message.sticker.is_animated ? message.sticker.thumb.file_id : message.sticker.file_id).then((path) => {
                            let newStickersPath = this.state.stickersPath;
                            newStickersPath[message.sticker.file_id] = path;
                            this.setState({
                                stickersPath: newStickersPath
                            })
                        })
                    }

                    let date = this.transferDate(message.date);

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
                                <div className="time">{this.transferDate(message.date)}</div>) : ""}
                            <div className="word">
                                {message.from.username}: {
                                    message.text ?
                                        message.text.replace(/^<(.+)>/, '$1') :
                                        (message.sticker ? <img width="100px" src={this.state.stickersPath[message.sticker.file_id]} alt="" /> :
                                            <strong>[{
                                                availableTypes.find((fieldName) => {
                                                    return !!message[fieldName];
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
