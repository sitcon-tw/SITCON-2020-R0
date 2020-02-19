export const agendaTypes = {
  CommonMode: 0, // 一般模式
  ForumMode: 1, // 論壇模式
  LTMode: 2, // Lighting Talk
  RestingMode: 3
}

export const Agendas = [
  {
    title: '入場時間',
    name: '',
    startTime: {
      hours: 8,
      minutes: 30
    },
    endTime: {
      hours: 9,
      minutes: 0
    },
    type: agendaTypes.RestingMode,
  },
  {
    title: '開幕',
    name: '',
    startTime: {
      hours: 9,
      minutes: 0
    },
    endTime: {
      hours: 9,
      minutes: 10
    },
    type: agendaTypes.CommonMode,
  },
  {
    title: 'Keynote',
    name: '',
    startTime: {
      hours: 9,
      minutes: 10
    },
    endTime: {
      hours: 10,
      minutes: 0
    },
    type: agendaTypes.CommonMode,
  },
  {
    title: '休息時間',
    name: '',
    startTime: {
      hours: 10,
      minutes: 0
    },
    endTime: {
      hours: 10,
      minutes: 10
    },
    type: agendaTypes.RestingMode,
  },
  {
    title: 'Keynote',
    name: '',
    startTime: {
      hours: 10,
      minutes: 10
    },
    endTime: {
      hours: 11,
      minutes: 0
    },
    type: agendaTypes.CommonMode,
  },
  {
    title: '休息時間',
    name: '',
    startTime: {
      hours: 11,
      minutes: 0
    },
    endTime: {
      hours: 11,
      minutes: 10
    },
    type: agendaTypes.RestingMode,
  },
  {
    title: '第一次做密室逃脫就上手',
    name: '捲毛',
    startTime: {
      hours: 11,
      minutes: 10
    },
    endTime: {
      hours: 11,
      minutes: 50
    },
    type: agendaTypes.CommonMode,
  },
  {
    title: '午餐',
    name: '',
    startTime: {
      hours: 11,
      minutes: 50
    },
    endTime: {
      hours: 12,
      minutes: 40
    },
    type: agendaTypes.RestingMode,
  },
  {
    title: '論壇',
    name: '',
    startTime: {
      hours: 12,
      minutes: 40
    },
    endTime: {
      hours: 14,
      minutes: 10
    },
    type: agendaTypes.ForumMode,
  },
  {
    title: '休息時間',
    name: '',
    startTime: {
      hours: 14,
      minutes: 10
    },
    endTime: {
      hours: 14,
      minutes: 20
    },
    type: agendaTypes.RestingMode,
  },
  {
    title: '我也能讓 Python 幫忙操控電腦嗎？',
    name: '陳怡升',
    startTime: {
      hours: 14,
      minutes: 20
    },
    endTime: {
      hours: 14,
      minutes: 30
    },
    type: agendaTypes.CommonMode,
  },
  {
    title: '換場',
    name: '',
    startTime: {
      hours: 14,
      minutes: 30
    },
    endTime: {
      hours: 14,
      minutes: 35
    },
    type: agendaTypes.RestingMode,
  },
  {
    title: '臉書資料探勘－鯉魚教の教主崇拜分析',
    name: 'isekai',
    startTime: {
      hours: 14,
      minutes: 35
    },
    endTime: {
      hours: 14,
      minutes: 45
    },
    type: agendaTypes.CommonMode,
  },
  {
    title: '換場',
    name: '',
    startTime: {
      hours: 14,
      minutes: 45
    },
    endTime: {
      hours: 14,
      minutes: 50
    },
    type: agendaTypes.RestingMode,
  },
  {
    title: '求職助手的開發起源和他的困難點',
    name: '白天當 Student',
    startTime: {
      hours: 14,
      minutes: 50
    },
    endTime: {
      hours: 15,
      minutes: 0
    },
    type: agendaTypes.CommonMode,
  },
  {
    title: '點心',
    name: '',
    startTime: {
      hours: 15,
      minutes: 0
    },
    endTime: {
      hours: 15,
      minutes: 40
    },
    type: agendaTypes.RestingMode,
  },
  {
    title: '就算是新手，有愛就沒把專案做出來，對吧',
    name: '宏宏',
    startTime: {
      hours: 15,
      minutes: 40
    },
    endTime: {
      hours: 16,
      minutes: 20
    },
    type: agendaTypes.CommonMode,
  },
  {
    title: '休息時間',
    name: '',
    startTime: {
      hours: 16,
      minutes: 20
    },
    endTime: {
      hours: 16,
      minutes: 30
    },
    type: agendaTypes.RestingMode,
  },
  {
    title: 'CDN 網站攻擊 - 這次換駭客當鬼來抓你了',
    name: 'Mico',
    startTime: {
      hours: 16,
      minutes: 30
    },
    endTime: {
      hours: 17,
      minutes: 10
    },
    type: agendaTypes.CommonMode,
  },
  {
    title: '休息時間',
    name: '',
    startTime: {
      hours: 17,
      minutes: 10
    },
    endTime: {
      hours: 17,
      minutes: 15
    },
    type: agendaTypes.RestingMode,
  },
  {
    title: 'Lightning Talk',
    name: '',
    startTime: {
      hours: 17,
      minutes: 15
    },
    endTime: {
      hours: 17,
      minutes: 40
    },
    type: agendaTypes.LTMode,
  },
  {
    title: '閉幕',
    name: '',
    startTime: {
      hours: 17,
      minutes: 40
    },
    endTime: {
      hours: 18,
      minutes: 0
    },
    type: agendaTypes.CommonMode,
  }
]

export const getAgendas = async () => {
  const url = 'https://sitcon.org/2020/json/session.json'
  let res = await fetch(url)
  let result = await res.json()

  let data = result.sessions.filter(x => x.room === 'R0').map(x => {

    let slido = null

    if (x.qa) {
      let token = x.qa.match(/([\w]+?)\/?$/)[1]
      slido = {
        link: x.qa,
        iframe: 'https://wall.sli.do/event/' + token
      }
    }

    return {
      title: x.zh.title,
      name: x.speakers.map(y => {
        return result.speakers.filter(z => z.id === y)[0].zh.name
      }).join('、'),
      startTime: {
        hours: new Date(x.start).getHours(),
        minutes: new Date(x.start).getMinutes()
      },
      endTime: {
        hours: new Date(x.end).getHours(),
        minutes: new Date(x.end).getMinutes()
      }, slido
    }
  })
  return data
}
