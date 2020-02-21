import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import { IRC, NowAgendaBar, MainDisplay, ButtomBar, Slido, FlashCard } from '../components'
import { Agendas, getAgendas } from '../R0Page/agendas';

const NO_AGENDA_TEXT = 'SITCON 學生計算機年會'
export class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            items: [],
            latestUpdateId: null,
            token: process.env.TG_BOT_TOKEN ? process.env.TG_BOT_TOKEN : null,
            inputToken: "",
            stickersPath: {},
            agenda: '',
            Agendas: Agendas,
            Speaker: 0
        };

        this.tokenInputOnChange = this.tokenInputOnChange.bind(this);
        this.saveToken = this.saveToken.bind(this);
        this.clearSavedMsg = this.clearSavedMsg.bind(this);
        this.saveMessage = this.saveMessage.bind(this);
        this.nowPlaying = this.nowPlaying.bind(this)
        this.changeSpeaker = this.changeSpeaker.bind(this)
    }

    async componentDidMount() {
        this.setState({
            items: localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages')) : this.state.items,
            token: sessionStorage.getItem('bot_token')
        });

        this.retriveMessage();
        setInterval(() => {
            this.retriveMessage();
        }, 5000);
        setInterval(this.nowPlaying, 1000)
        
        let agendas = await getAgendas()
        if(agendas) this.setState({Agendas: agendas})
    }

    nowPlaying() {
        let nowTime = new Date();
        for (let e of this.state.Agendas) {
            if (e.endTime.hours > nowTime.getHours() || ((e.endTime.hours === nowTime.getHours()) && (e.endTime.minutes > nowTime.getMinutes()))) {
                this.setState({
                    agenda: e
                });
                break;
            }
        }
    }

    retriveMessage() {
        if (this.state.token === null) return;
        fetch('https://api.telegram.org/bot' + this.state.token + '/getUpdates?offset=' + (this.state.latestUpdateId + 1))
            .then(res => res.json())
            .then((result) => {
                if (result.ok && result.result) {
                    let storaged = localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages')) : [];
                    let newItems = [...storaged, ...result.result];

                    this.setState({
                        latestUpdateId: result.result.length > 0 ? [...result.result].pop().update_id : null,
                        error: null
                    });

                    this.saveMessage(newItems);
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

    msgTable() {
        const { items } = this.state;
        return (
            <table style={{ margin: "0 auto" }}>
                <thead>
                    <tr>
                        <td><h5>Message Id</h5></td>
                        <td style={{ padding: "0 20px" }}><h5>Message</h5></td>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, key) => {
                        if (item.message.sticker && item.message.sticker.file_id && !this.state.stickersPath[item.message.sticker.file_id]) {
                            this.getStickerWithFileId(item.message.sticker.file_id).then((path) => {
                                let newStickersPath = this.state.stickersPath;
                                newStickersPath[item.message.sticker.file_id] = path;
                                this.setState({
                                    stickersPath: newStickersPath
                                })
                            })
                        }

                        return (
                            <tr key={key}>
                                <td>
                                    {item.message.message_id}
                                </td>
                                <td style={{ padding: "0 20px" }}>
                                    {item.message.text ? item.message.text : (item.message.sticker ? <img width="100px" height="100px" src={this.state.stickersPath[item.message.sticker.file_id]} alt={item.message.sticker.emoji} /> : <strong>Non Text or sticker</strong>)}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );

    }

    tokenInputOnChange(e) {
        this.setState({
            inputToken: e.target.value
        });
    }

    saveToken() {
        sessionStorage.setItem('bot_token', this.state.inputToken);
        console.log('new token saved');
        this.setState({
            token: this.state.inputToken
        });
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

    changeSpeaker() {
        if(this.state.Speaker === 2) {
            this.setState({Speaker: 0})
        }
        else {
            this.setState({Speaker: this.state.Speaker+1})
        }
    }

    render() {
        let agenda = this.state.agenda ? this.state.agenda : NO_AGENDA_TEXT;
        return (
            <Router>
                <Switch>
                    <Route exact path="/test">
                        <div className="test">
                            Token: <input onChange={this.tokenInputOnChange} value={this.state.inputToken} />
                            <button onClick={this.saveToken} style={{ marginLeft: "10px" }}>Save Token</button>
                            <button onClick={this.clearSavedMsg} style={{ marginLeft: "10px" }}>Clear Message</button>

                            {this.state.error ? <div style={{ marginBottom: "10px" }}>Error: {this.state.error.message}</div> : null}
                            {this.msgTable()}
                        </div>
                    </Route>
                    <Route path="/test/IRC">
                        <div className="test-IRC">
                            <IRC />
                        </div>
                    </Route>
                    <Route path="/test/NowAgendaBar">
                        <div className="test-NowAgendaBar">
                            <NowAgendaBar agenda={agenda}/>
                        </div>
                    </Route>
                    <Route path="/test/MainDisplay">
                        <div className="test-MainDisplay">
                            <MainDisplay />
                        </div>
                    </Route>
                    <Route path="/test/ButtomBar">
                        <div className="test-ButtomBar">
                            <ButtomBar />
                        </div>
                    </Route>
                    <Route path="/test/Slido">
                        <div className="test-Slido">
                            <Slido agenda={agenda}/>
                        </div>
                    </Route>
                    <Route path="/test/FlashCard">
                        <div className="test-FlashCard">
                            <FlashCard speaker={this.state.Speaker}/>
                            <button onClick={this.changeSpeaker}>Change!</button>
                        </div>
                    </Route>
                </Switch>
            </Router>

        );
    }
}

export default Test
