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
                main: "PPT",
                second: "IRC"
            }
        },
        "PPT+SLIDO": {
            type: layoutTypes.LayoutA,
            name: "PPT+SLIDO",
            prop: {
                main: "PPT",
                second: "SLIDO"
            }
        },
        "SLIDO+IRC": {
            type: layoutTypes.LayoutA,
            name: "SLIDO+IRC",
            prop: {
                main: "SLIDO",
                second: "IRC"
            }
        }
    },
    [agendaTypes.ForumMode]: {
        "PPT": {
            type: layoutTypes.LayoutB,
            name: "PPT",
            prop: {}
        },
        "TITLE": {
            type: layoutTypes.LayoutB,
            name: "TITLE",
            prop: {}
        },
        "SLIDO": {
            type: layoutTypes.LayoutB,
            name: "SLIDO",
            prop: {}
        }
    },
    [agendaTypes.LTMode]: {
        "PPT+IRC": {
            type: layoutTypes.LayoutA,
            name: "PPT+IRC",
            prop: {
                main: "PPT",
                second: "IRC"
            }
        },
        "STBY": {
            type: layoutTypes.LayoutA,
            name: "STBY",
            prop: {
                main: "VISUAL",
                second: "IRC"
            }
        },
        "TIMEUP": {
            type: layoutTypes.LayoutA,
            name: "TIMEUP",
            prop: {
                main: "VISUAL",
                second: "IRC",
                timeUp: true
            }
        }
    }
}