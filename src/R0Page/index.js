import React, { Component } from 'react'
import { Agendas, agendaTypes } from './agendas'
import R0Page from './R0Page'
import { layoutTypes, layoutControlModes } from './constant'

const controlBotStateTypes = {
    ModeSelect: 1
}

const token = process.env.REACT_APP_CONTROL_BOT_TOKEN;

export class R0Controller extends Component {

    constructor(props) {
        super(props);
        this.state = {
            agenda: "",
            autoAgenda: true,
            controlBotState: controlBotStateTypes.ModeSelect,
            currentLayout: localStorage.currentLayout ? JSON.parse(localStorage.currentLayout) : {
                type: layoutTypes.LayoutA,
                name: "EMPTY",
                prop: {}
            }
        }

        this.nowPlaying = this.nowPlaying.bind(this);
        this.controlBotUpdate = this.controlBotUpdate.bind(this);
    }

    nowPlaying() {
        let nowTime = new Date();
        if (this.state.autoAgenda) {
            for (let e of Agendas) {
                if (e.endTime.hours > nowTime.getHours() || ((e.endTime.hours === nowTime.getHours()) && (e.endTime.minutes > nowTime.getMinutes()))) {
                    this.setState({
                        agenda: e
                    });
                    break;
                }
            }
        }
    }

    componentDidMount() {
        setInterval(this.nowPlaying, 1000);
        this.controlBotUpdate();
    }

    controlBotSend(id, text, reply_markup) {

        let modeKeyboard = [];
        if (typeof this.state.agenda === "object") {
            const controlModes = layoutControlModes[this.state.agenda.type] || {};
            Object.keys(controlModes).map(k => modeKeyboard.push({ text: k }))
        }

        fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: id,
                text: text || (text !== false ? '目前狀態為：' + this.state.currentLayout.type + " / " + this.state.currentLayout.name + '\n目前議程為：' + (this.state.agenda && this.state.agenda.title ? this.state.agenda.title : this.state.agenda) : null),
                reply_markup: reply_markup ? reply_markup : { keyboard: [modeKeyboard] }
            })
        })
    }



    controlBotAnswerCallbackQuery(callback_query_id, text) {
        fetch("https://api.telegram.org/bot" + token + "/answerCallbackQuery", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                callback_query_id: callback_query_id,
                text: text
            })
        })
    }

    controlBotReceived(data) {
        if (data.message) {
            // Agenda
            if (data.message.text.search("/auto") === 0) {
                this.setState({
                    autoAgenda: true
                })

                this.controlBotSend(data.message.chat.id, "切換為自動議程")
            } else if (data.message.text.search("/manual") === 0) {
                this.setState({
                    autoAgenda: false
                })

                this.controlBotSend(data.message.chat.id, "切換為手動議程")
            }
            else if (data.message.text.search("/set") === 0) {
                let keyboard = [];
                let counter = 0;
                let index = 0;
                Agendas.forEach((a, i) => {
                    if (a.type !== agendaTypes.RestingMode) {
                        if (!keyboard[index]) {
                            keyboard[index] = [];
                        }
                        keyboard[index].push({
                            text: a.title,
                            callback_data: i
                        })
                        counter++;
                        if (counter >= 2) {
                            counter = 0;
                            index++;
                        }
                    }
                })

                this.controlBotSend(data.message.chat.id, "請在下方選擇議程", { inline_keyboard: keyboard });
            }
            // cancel command
            else if (data.message.text.search("/cancel") === 0) {
                this.setState({
                    controlBotState: controlBotStateTypes.ModeSelect
                })

                this.controlBotSend(data.message.chat.id, "已取消動作")
            }

            // select layout mode
            else if (this.state.controlBotState === controlBotStateTypes.ModeSelect) {
                let controlModes = [];
                if (typeof this.state.agenda === "object") {
                    controlModes = layoutControlModes[this.state.agenda.type];
                }

                let found = false;
                Object.keys(controlModes).forEach((v) => {
                    if (v === data.message.text) {
                        found = true;
                    }
                });

                if (found) {
                    this.setState({
                        currentLayout: controlModes[data.message.text]
                    });

                    localStorage.currentLayout = JSON.stringify(controlModes[data.message.text]);
                    this.controlBotSend(data.message.chat.id, null);
                } else {
                    this.controlBotSend(data.message.chat.id, "無效的模式");
                }
            }
        }
        else if (data.callback_query) {
            const callback_query = data.callback_query;
            const newAgendaI = callback_query.data;

            this.setState({
                agenda: Agendas[newAgendaI],
                autoAgenda: false,
                controlBotState: controlBotStateTypes.ModeSelect
            })
            localStorage.agenda = newAgendaI;

            this.controlBotAnswerCallbackQuery(callback_query.id, "議程設定為:" + Agendas[newAgendaI].title);
        }
    }

    controlBotUpdate() {
        fetch("https://api.telegram.org/bot" + token + "/getUpdates", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                offset: +localStorage.control_offset + 1,
                timeout: 60
            }),
        })
            .then(res => res.json())
            .then((result) => {
                if (result.ok) {
                    result.result.forEach((r) => {
                        localStorage.control_offset = r.update_id
                        this.controlBotReceived(r)
                    })
                }

                setTimeout(() => {
                    this.controlBotUpdate()
                }, 100)
            }, (error) => {
                this.setState({
                    error
                });

                setTimeout(() => {
                    this.controlBotUpdate()
                }, 100)
            })
    }

    render() {
        return (
            <R0Page currentLayout={this.state.currentLayout} autoAgenda={this.state.autoAgenda} agenda={this.state.agenda} />
        )
    }
}

export default R0Controller
