import { agendaTypes } from './agendas'

export const layoutTypes = {
    LayoutA: "一般",
    LayoutB: "論壇",
    LayoutC: "Lighting Talk",
    LayoutD: "Break Time"
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
            prop: {}
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
        name: 'Sharp',
        url: '1.png'
    },
    {
        name: 'Stone',
        url: '2.png'
    },
    {
        name: 'Seed',
        url: '3.png'
    }
]