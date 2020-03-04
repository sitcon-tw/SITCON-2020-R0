import React, { Component } from 'react'
import { Agendas, agendaTypes } from './agendas'
import R0Page from './R0Page'
import { layoutTypes, layoutControlModes, forumSpeakers } from './constant'

const controlBotStateTypes = {
    ModeSelect: 1
}

const token = process.env.REACT_APP_CONTROL_BOT_TOKEN;
const defaultLayout = {
    type: layoutTypes.LayoutA,
    name: "EMPTY",
    prop: {}
};
const defaultSpeaker = {
    name: 'Sharp',
    url: '1.png'
}

export class R0Controller extends Component {
    chatIds = [] // chatId of the users that use controller

    constructor(props) {
        super(props);

        let agenda = "";

        if (localStorage.agenda) {
            agenda = Agendas[parseInt(localStorage.agenda)] ? Agendas[parseInt(localStorage.agenda)] : agenda;
        }

        this.state = {
            agenda,
            autoAgenda: !localStorage.autoAgenda || localStorage.autoAgenda === "true" ? true : false,
            controlBotState: controlBotStateTypes.ModeSelect,
            currentLayout: localStorage.currentLayout ? JSON.parse(localStorage.currentLayout) : defaultLayout,
            nowForumSpeaker: localStorage.ForumSpeaker ? JSON.parse(localStorage.ForumSpeaker) : defaultSpeaker,
        }

        this.nowPlaying = this.nowPlaying.bind(this);
        this.controlBotUpdate = this.controlBotUpdate.bind(this);

        this.chatIds = localStorage.chatIds ? JSON.parse(localStorage.chatIds) : [];

        localStorage.autoAgenda = this.state.autoAgenda;
    }

    nowPlaying() {
        let nowTime = new Date();
        let nowDate = nowTime.getHours() * 60 + nowTime.getMinutes()

        let currentAgendaIndex = Agendas.findIndex(e => {
            let startDate = e.startTime.hours * 60 + e.startTime.minutes
            let endDate = e.endTime.hours * 60 + e.endTime.minutes
            return (startDate <= nowDate) && (nowDate < endDate)
        })

        if (this.state.autoAgenda) {
            while (currentAgendaIndex >= 0 && Agendas[currentAgendaIndex].type === agendaTypes.RestingMode) {
                currentAgendaIndex--;
            }

            const agenda = currentAgendaIndex < 0 ? null : Agendas[currentAgendaIndex];


            if (agenda !== this.state.agenda) {
                this.setState({
                    agenda
                });

                this.chatIds.forEach((id) => {
                    this.controlBotSend(id);
                });
            }
        }
    }

    componentDidMount() {
        setInterval(this.nowPlaying, 1000);
        this.controlBotUpdate();
    }

    controlBotSend(id, text, reply_markup) {

        let modeKeyboard = [];
        const controlModes = this.getCurrentControlModes();
        if (this.state.agenda && this.state.agenda.type === agendaTypes.ForumMode) {
            forumSpeakers.map(e => modeKeyboard.push({ text: e.name }))
        }
        else {
            Object.keys(controlModes).map(k => modeKeyboard.push({ text: k }));
        }


        console.log(modeKeyboard);

        fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: id,
                text: text || (text !== false ? '模式：' + (this.state.autoAgenda ? '自動（切換為手動 /manual）' : '手動（切換為自動 /auto）') + '\n版型：' + this.state.currentLayout.type + " > " + this.state.currentLayout.name + '\n議程：' + (this.state.agenda && this.state.agenda.title ? this.state.agenda.title : this.state.agenda) : null),
                reply_markup: reply_markup ? reply_markup : (modeKeyboard.length > 0 ? { keyboard: [modeKeyboard] } : { remove_keyboard: true })
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

    getCurrentControlModes = () => {
        let controlModes = {};
        if (this.state.agenda && typeof this.state.agenda === "object") {
            controlModes = layoutControlModes[this.state.agenda.type];
        };

        return controlModes;
    }

    controlBotReceived(data) {
        if (data.message) {
            console.log(data.message)
            if (this.chatIds.findIndex((id) => id === data.message.chat.id) === -1) {
                this.chatIds.push(data.message.chat.id);
            }

            // Agenda
            if (data.message.text.search("/auto") === 0) {
                this.setState({
                    autoAgenda: true
                })

                localStorage.autoAgenda = "true";

                this.controlBotSend(data.message.chat.id, "切換為自動議程")
                this.nowPlaying()
            } else if (data.message.text.search("/manual") === 0) {
                this.setState({
                    autoAgenda: false
                })

                localStorage.autoAgenda = "false";

                this.controlBotSend(data.message.chat.id, "切換為手動議程\n選擇議程 /set")
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
                let found = true;
                // Object.keys(controlModes).forEach((v) => {
                //     if (v === data.message.text) {
                //         found = true;
                //     }
                // });
                console.log(found)
                if (found) {
                    let controlModes = this.getCurrentControlModes()
                    if (this.state.agenda.type === agendaTypes.ForumMode) {
                        let index = forumSpeakers.findIndex(e => e.name === data.message.text)
                        this.setState({
                            currentLayout: controlModes['MAIN'],
                            nowForumSpeaker: forumSpeakers[index]
                        })
                    } else {
                        this.setState({
                            currentLayout: controlModes[data.message.text]
                        });
                    }

                    localStorage.currentLayout = JSON.stringify(this.state.currentLayout);
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
            });

            this.chatIds.forEach((id) => {
                this.controlBotSend(id);
            });

            localStorage.agenda = newAgendaI;
            localStorage.autoAgenda = "false";

            this.controlBotAnswerCallbackQuery(callback_query.id, "議程設定為：" + Agendas[newAgendaI].title);
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
            <R0Page
                currentLayout={this.state.currentLayout}
                autoAgenda={this.state.autoAgenda}
                agenda={this.state.agenda}
                forumSpeakers={forumSpeakers}
                nowForumSpeaker={this.state.nowForumSpeaker}
            />
        )
    }
}

export default R0Controller
