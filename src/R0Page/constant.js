import { agendaTypes } from './agendas'

export const layoutTypes = {
    LayoutA: "一般",
    LayoutB: "論壇",
    LayoutC: "Lighting Talk"
}

export const layoutControlModes = {
    [agendaTypes.CommonMode]: {
        "PPT+IRC": {
            type: layoutTypes.LayoutA,
            name: "PPT+IRC",
            prop: {
                main: "ppt",
                second: "irc"
            }
        },
        "PPT+SLIDO": {
            type: layoutTypes.LayoutA,
            name: "PPT+SLIDO",
            prop: {
                main: "ppt",
                second: "slido"
            }
        },
        "SLIDO+IRC": {
            type: layoutTypes.LayoutA,
            name: "SLIDO+IRC",
            prop: {
                main: "slido",
                second: "irc"
            }
        }
    },
    [agendaTypes.ForumMode]: {
        "MAIN": {
            type: layoutTypes.LayoutB,
            name: "MAIN",
            prop: {
                main: "slido"
            }
        },
        "PPT": {
            type: layoutTypes.LayoutB,
            name: "MAIN",
            prop: {
                main: "ppt"
            }
        }
    },
    [agendaTypes.LTMode]: {
        "PPT+IRC": {
            type: layoutTypes.LayoutA,
            name: "PPT+IRC",
            prop: {
                main: "ppt",
                second: "irc"
            }
        },
        "STBY": {
            type: layoutTypes.LayoutA,
            name: "STBY",
            prop: {
                main: "visual",
                second: "irc"
            }
        },
        "TIMEUP": {
            type: layoutTypes.LayoutA,
            name: "TIMEUP",
            prop: {
                main: "visual",
                second: "irc",
                timeUp: true
            }
        }
    }
}

export const forumSpeakers = [
    {
        name: 'EMPTY',
        url: 'r0/CARD_EMPTY.png'
    },
    {
        name: '詹婷怡',
        url: 'r0/CARD_JAN.png'
    },
    {
        name: '何明諠',
        url: 'r0/CARD_HOU.png'
    },
    {
        name: '主持人',
        url: 'r0/CARD_HOST.png'
    }
]