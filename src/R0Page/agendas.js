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
    slido: null,
    type: agendaTypes.RestingMode
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
    slido: null,
    type: agendaTypes.CommonMode
  },
  {
    title: '機器學習的關鍵下一步',
    name: '李宏毅',
    startTime: {
      hours: 9,
      minutes: 10
    },
    endTime: {
      hours: 10,
      minutes: 0
    },
    slido: {
      'link': 'https://sli.do/ozdireqh',
      'iframe': 'https://wall.sli.do/event/ozdireqh'
    },
    type: agendaTypes.CommonMode
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
    slido: null,
    type: agendaTypes.RestingMode
  },
  {
    title: '駭入世界最深的海溝',
    name: 'CIH',
    startTime: {
      hours: 10,
      minutes: 10
    },
    endTime: {
      hours: 11,
      minutes: 0
    },
    slido: {
      'link': 'https://sli.do/uioorjnh',
      'iframe': 'https://wall.sli.do/event/uioorjnh'
    },
    type: agendaTypes.CommonMode
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
    slido: null,
    type: agendaTypes.RestingMode
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
    slido: {
      'link': 'https://sli.do/nnrswoh0',
      'iframe': 'https://wall.sli.do/event/nnrswoh0'
    },
    type: agendaTypes.CommonMode
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
    slido: null,
    type: agendaTypes.RestingMode
  },
  {
    title: '論壇 - 刪你廢文再收掉服務！大型資訊企業決策的自由與責任',
    name: '主持人 - 子魚、與談人 - 何明諠、與談人 - 詹婷怡律師',
    startTime: {
      hours: 12,
      minutes: 40
    },
    endTime: {
      hours: 14,
      minutes: 10
    },
    slido: {
      'link': 'https://sli.do/dh59rkkn',
      'iframe': 'https://wall.sli.do/event/dh59rkkn'
    },
    type: agendaTypes.ForumMode
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
    slido: null,
    type: agendaTypes.RestingMode
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
    slido: {
      'link': 'https://sli.do/8an7mvtb',
      'iframe': 'https://wall.sli.do/event/8an7mvtb'
    },
    type: agendaTypes.CommonMode
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
    slido: null,
    type: agendaTypes.RestingMode
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
    slido: {
      'link': 'https://sli.do/by45cctq',
      'iframe': 'https://wall.sli.do/event/by45cctq'
    },
    type: agendaTypes.CommonMode
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
    slido: null,
    type: agendaTypes.RestingMode
  },
  {
    title: '求職助手的開發起源和他的困難點',
    name: '白天當Student',
    startTime: {
      hours: 14,
      minutes: 50
    },
    endTime: {
      hours: 15,
      minutes: 0
    },
    slido: {
      'link': 'https://sli.do/5opc27au',
      'iframe': 'https://wall.sli.do/event/5opc27au'
    },
    type: agendaTypes.CommonMode
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
    slido: null,
    type: agendaTypes.RestingMode
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
    slido: {
      'link': 'https://sli.do/wu3rjw5r',
      'iframe': 'https://wall.sli.do/event/wu3rjw5r'
    },
    type: agendaTypes.CommonMode
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
    slido: null,
    type: agendaTypes.RestingMode
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
    slido: {
      'link': 'https://sli.do/nbopftjl',
      'iframe': 'https://wall.sli.do/event/nbopftjl'
    },
    type: agendaTypes.CommonMode
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
    slido: null,
    type: agendaTypes.RestingMode
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
    slido: null,
    type: agendaTypes.LTMode
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
    slido: null,
    type: agendaTypes.CommonMode
  }
]

export const getAgendas = async () => {
  const url = 'https://sitcon.org/2020/json/session.json'
  let res = await fetch(url)
  let result = await res.json()

  let data = result.sessions.filter(x => x.room === 'R0').map(x => {

    let slido = null
    let type = agendaTypes.CommonMode

    switch (x.zh.title.trim()) {
      case '入場時間':
      case '休息時間':
      case '換場':
      case '點心':
      case '午餐':
          type = agendaTypes.RestingMode
          break
      case '論壇':
          type = agendaTypes.ForumMode
          break
      case 'Lightning Talk':
          type = agendaTypes.LTMode
          break
      default:    
          type = agendaTypes.CommonMode
    }

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
      },
      slido,
      type
    }
  })

  data = data.sort((m, n) => {
    return (m.startTime.hours*60 + m.startTime.minutes) - (n.startTime.hours*60 + n.startTime.minutes)
  })
  return data
}
