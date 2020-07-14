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
    bio: '',
    startTime: {
      hours: 8,
      minutes: 30
    },
    endTime: {
      hours: 9,
      minutes: 0
    },
    slido: null,
    type: agendaTypes.RestingMode,
    description: ''
  },
  {
    title: '開幕',
    name: '',
    bio: '',
    startTime: {
      hours: 9,
      minutes: 0
    },
    endTime: {
      hours: 9,
      minutes: 10
    },
    slido: null,
    type: agendaTypes.CommonMode,
    description: ''
  },
  {
    title: '機器學習的關鍵下一步',
    name: '李宏毅',
    bio: '李宏毅分別在 2010 年和 2012 年於國立臺灣大學（National Taiwan University, NTU）取得碩士和博士學位；2012 年到 2013 年，他於中央研究院資訊科技創新研究中心擔任博士後研究員 ；2013 年到 2014 年，他是麻省理工學院（MIT）電腦科學和人工智慧實驗室（CSAIL）口語系統組的客座科學家。他目前是國立臺灣大學電機工程學系副教授（臺灣大學資訊工程學系合聘）。他的研究主軸是深度學習、語音處理及語意理解，他於 2017 年榮獲中華民國電腦學會傑出青年獎，2018 年榮獲中國電機工程學會優秀青年電機工程師獎， 2019 年榮獲傑出人才發展基金會年輕學者創新獎、科技部吳大猷先生紀念獎。',
    startTime: {
      hours: 9,
      minutes: 10
    },
    endTime: {
      hours: 10,
      minutes: 0
    },
    slido: {
      link: 'https://sli.do/ozdireqh',
      'iframe': 'https://wall.sli.do/event/ozdireqh'
    },
    type: agendaTypes.CommonMode,
    description: '\n今日 Facebook 可以自動標記你的朋友， Siri 能聽懂並回答使用者的問題，Gmail 甚至可以在我們寫郵件時給予建議，它們背後所仰仗的就是機器學習的技術。然而，今日機器學習仍有很多尚待克服的問題，例如：\n\n- 你知道只要一點人類肉眼都難以察覺的雜訊，就可以讓多數機器學習所得到的系統完全崩壞嗎？\n- 今天機器學習需要人類扮演機器的老師，根據大量人類提供的標註進行學習，機器能否做到無師自通呢？\n- 最後，機器能不能告訴我們它學到甚麼？它真的有學到東西嗎？\n\n這個演講將跟大家簡介今日在機器學習領域有甚麼尚待克服的關鍵問題以及可能的解法。\n'
  },
  {
    title: '休息時間',
    name: '',
    bio: '',
    startTime: {
      hours: 10,
      minutes: 0
    },
    endTime: {
      hours: 10,
      minutes: 10
    },
    slido: null,
    type: agendaTypes.RestingMode,
    description: ''
  },
  {
    title: '駭入世界最深的海溝',
    name: 'CIH',
    bio: '暴力型資料科學家\n內政部警政署刑事警察局-治安諮詢委員、台灣大哥大-資訊群顧問。\n2012年 徒步環島 55天1,200公里，正努力研究台灣歷史、生態地理、原住民。',
    startTime: {
      hours: 10,
      minutes: 10
    },
    endTime: {
      hours: 11,
      minutes: 0
    },
    slido: {
      link: 'https://sli.do/uioorjnh',
      'iframe': 'https://wall.sli.do/event/uioorjnh'
    },
    type: agendaTypes.CommonMode,
    description: '好奇，瘋狂到一定要深入到極限，鑽到盡頭，一直驅使著CIH的學習。\n也因此在我的學習過程，幾乎都是孤獨一個人。\n\n單步追蹤Windows kernel、Linux kernel、逆向破解系統、暴力臉書爬蟲，寫爬蟲分析用戶與商業市場，實際去走完歷史古道，自己查詢古代的文獻與日治台灣堡圖。\n\n對台灣好奇，然後全程徒步環島一圈...\n\n不談技術，聊聊我的獨特學習過程、人生經歷，希望可以把種子傳遞給台灣的下一代：你們。'
  },
  {
    title: '休息時間',
    name: '',
    bio: '',
    startTime: {
      hours: 11,
      minutes: 0
    },
    endTime: {
      hours: 11,
      minutes: 10
    },
    slido: null,
    type: agendaTypes.RestingMode,
    description: ''
  },
  {
    title: '第一次做密室逃脫就上手',
    name: '捲毛',
    bio: '中興資訊社 社長\n技能樹跟 YAMAHA 一樣歪的 S 級工具人',
    startTime: {
      hours: 11,
      minutes: 10
    },
    endTime: {
      hours: 11,
      minutes: 50
    },
    slido: {
      link: 'https://sli.do/nnrswoh0',
      'iframe': 'https://wall.sli.do/event/nnrswoh0'
    },
    type: agendaTypes.CommonMode,
    description: ' 近幾年真人密室逃脫產業蓬勃發展，引人入勝的劇情、豐富的機關，解開謎題後的爽感，吸引了大量的玩家，覺得玩密室逃脫還不夠過癮？不如來自己做一個吧！\n\n這場議程講述一群大學生如何從 0 開始，想故事、製作機關、布景、在 4 個月內打造一間融合 IoT、AI、AR 技術的密室逃脫。\n\n## Prepare\n知道什麼是密室逃脫'
  },
  {
    title: '午餐',
    name: '',
    bio: '',
    startTime: {
      hours: 11,
      minutes: 50
    },
    endTime: {
      hours: 12,
      minutes: 40
    },
    slido: null,
    type: agendaTypes.CommonMode,
    description: ''
  },
  {
    title: '論壇 - 刪你廢文再收掉服務！大型資訊企業決策的自由與責任',
    name: '主持人 - 子魚、與談人 - 何明諠、與談人 - 詹婷怡律師',
    bio: 'g0v 社群長期參與者，不務正業的法律人，長年 遊走於公部門與私部門、新創與中小企業之間的協調者，\n2016 年不小心跌進了 vTaiwan 的坑 ，持續探索著利用數位工具組織法規利害關係人的方法以及開放社群的永續發展之道。、清華大學電機系畢，清華大學哲學所碩士，論文研究德國法學家Carl Schmitt的法理論與政治理論。現為台灣人權促進會副秘書長，過去幾年主要關注科技使用而造成的人權侵害問題。主要處理的議題有個人資料保護法制、國家通訊監察、網路內容審查、健康資料、晶片身分證、人臉辨識等。 、數位經濟暨產業發展協會 副理事長\nDotAsia 董事\n\n詹婷怡律師為前國家通訊傳播委員會主任委員，擁有相當豐富的跨領域學經歷 ， 歷任產官學研重要職務，從法律 、 科技 、 與創意等領域，參與數位整備、 創新創業 、寛頻建設、區域創新、匯流融合等工作：特別是2016~2019擔任國家通訊傳播委員會主任委員期間，主導規劃台灣後匯流時代發展藍圖、推動電信管理法與數位通訊傳播法及相關法規、5G與物聯網政策制定、影視平台及上下游產業生態系統建構、網路治理與資安政策推動等，兼具第一線的產業與政策制定經驗。\n\n自1992年從事律師工作起，詹婷怡即致力並專長於智慧財產權法、網路法律、科技法律、及數位匯流法律與產業政策分析領域，她是智財法及科技法律與產業發展策略專家 ，在執業多年並出國攻讀碩士學位回國後，參與早期台灣電信自由化與數位匯流發展進程。轉入產業發展，在擔任資策會主任秘書期間，投入台灣資訊化社會及資通訊產業發展推動與發展工作，並曾擔任經濟部南港軟體育成中心主任、文建會(文化部前身)文創產業專案辦公室主任 、資策會科技法律研究所所長、中影管理顧問總經理。在2008年至2010年擔任南港軟體育成中心主任與文創產業專案辦公室主任期間，帶領新創產業團隊爭取資金，並負責規劃台灣文創產業發展藍圖，包括法規、投融資機制、文創院等配套；在2013年至2016年擔任資訊工業策進會科技法律研究所所長期間，擔任多項政府前瞻科技相關政策法制計畫主持人，帶領科法所成為政府科技法律重要智庫，並促成vTaiwan線上法規討論平台的建立。\n\n詹婷怡也曾投入電影產業影視製作，擔任監製與製片，參與多部電影製作與資金籌措管理，包括《父後七日》、《龍飛鳳舞》、《進擊之路》、《賽德克．巴萊》及《阿莉芙》等。\n\n她擁有國立政治大學EMBA學位、英國倫敦大學智慧財產法學碩士及國立台灣大學法學士學位。目前並為國立政治大學社會科學院行政管理碩士學程兼任教授。\n',
    startTime: {
      hours: 12,
      minutes: 40
    },
    endTime: {
      hours: 14,
      minutes: 10
    },
    slido: {
      link: 'https://sli.do/dh59rkkn',
      'iframe': 'https://wall.sli.do/event/dh59rkkn'
    },
    type: agendaTypes.ForumMode,
    description: '　　今天又在臉書、YouTube 看了多少廢文、影片或迷因？又被推薦去買了什麼東西？\n\n　　身為一出生就懂得網路如何使用的世代，在資訊爆炸的狀況裡，幾乎每個人都瞭解：我們不該信任來源產製方式不明的資訊。但持續成長的社群媒體使用人口卻恰恰傳達出一個訊息：對資訊企業運作方式幾乎一無所知的情況下，人們並不擔憂日常所見所聞被這些企業決定。\n \n　　我們用每天的點擊來選擇讓資訊企業的平台為自己服務。從精選廢文、迷因或者是可以浪費整天看影片的平台開始，的確不會有任何感覺；儘管沒有人瞭解 YouTube 的黃標是怎麼決定，什麼東西為什麼違反 Facebook 的社群規範，Google 可不可以直接收掉 Google Reader，蘋果為什麼阻擋某些 App 上架，但我們似乎也沒有很在意。\n\n　　在網路企業爭取營利、擴張影響力的路上，他們的網路平台向使用者隱藏了些什麼？現今的政府和法律能保護我們的權益嗎？上個世代的人向政府機構將資訊自由爭取回來，那我們這個世代「決定自己想看什麼說什麼」的資訊自由，是否還確實握在手中？\n'
  },
  {
    title: '休息時間',
    name: '',
    bio: '',
    startTime: {
      hours: 14,
      minutes: 10
    },
    endTime: {
      hours: 14,
      minutes: 20
    },
    slido: null,
    type: agendaTypes.RestingMode,
    description: ''
  },
  {
    title: '我也能讓 Python 幫忙操控電腦嗎？',
    name: '陳怡升',
    bio: '目前在師大就讀 最新最潮的 學習科學學士班二年級，興趣是吃飯、學習與用程式解決問題。未來希望可以讓大家愛上學習這檔事情（尤其是學習程式）。最近開始撰寫個人部落格「抬升Raise」。\n[tsraise.com](https://tsraise.com/)',
    startTime: {
      hours: 14,
      minutes: 20
    },
    endTime: {
      hours: 14,
      minutes: 30
    },
    slido: {
      link: 'https://sli.do/8an7mvtb',
      'iframe': 'https://wall.sli.do/event/8an7mvtb'
    },
    type: agendaTypes.CommonMode,
    description: 'Python 是一個非常泛用的程式語言。在這場演講中，講者將分享使用 Python 撰寫腳本，執行自動化操作的經驗。內容包含撰寫一個自動化程式使用的工具套件介紹，以及講者撰寫自動玩遊戲、自動搶課等程式的經驗談。期待聽完這場演講之後，聽眾能夠從分享中得到啟發，進而打造屬於自己的自動化程式，讓生活更輕鬆方便。\n\n## Prepare\n看得懂 Python 基礎語法'
  },
  {
    title: '換場',
    name: '',
    bio: '',
    startTime: {
      hours: 14,
      minutes: 30
    },
    endTime: {
      hours: 14,
      minutes: 35
    },
    slido: null,
    type: agendaTypes.RestingMode,
    description: ''
  },
  {
    title: '臉書資料探勘－鯉魚教の教主崇拜分析',
    name: 'isekai',
    bio: '淡江大學資工系三年級學生、淡江大學開源社成員，嚮往魔法、異世界與人心。',
    startTime: {
      hours: 14,
      minutes: 35
    },
    endTime: {
      hours: 14,
      minutes: 45
    },
    slido: {
      link: 'https://sli.do/by45cctq',
      'iframe': 'https://wall.sli.do/event/by45cctq'
    },
    type: agendaTypes.CommonMode,
    description: ' 根據爬取鯉魚考古學臉書粉絲專頁中的貼文、與教主互動的關係，用 neo4j 建圖，以連結分析教徒の狂熱程度。\n本議程會分享一些臉書爬蟲的經驗與技巧，以及簡易的 neo4j 操作。\n\n## Prepare\n基礎網頁觀念、基礎 Python 語法 、 基礎 Scrapy 、 neo4j 知識'
  },
  {
    title: '換場',
    name: '',
    bio: '',
    startTime: {
      hours: 14,
      minutes: 45
    },
    endTime: {
      hours: 14,
      minutes: 50
    },
    slido: null,
    type: agendaTypes.RestingMode,
    description: ''
  },
  {
    title: '求職助手的開發起源和他的困難點',
    name: '白天當Student',
    bio: '目前剛畢業與台北科大，希望白天都可以好好當個 student',
    startTime: {
      hours: 14,
      minutes: 50
    },
    endTime: {
      hours: 15,
      minutes: 0
    },
    slido: {
      link: 'https://sli.do/5opc27au',
      'iframe': 'https://wall.sli.do/event/5opc27au'
    },
    type: agendaTypes.CommonMode,
    description: '利用「求職助手」的 chrome extension application 為例子，使用 AWS 服務，並以此實際 log 流量去比較單體式架構及 serverless 架構之費用，以及介紹 AWS 的一些小工具\n\n## Prepare\n簡單golang語法熟悉即可/ 大概知道併發是什麼就可以'
  },
  {
    title: '點心',
    name: '',
    bio: '',
    startTime: {
      hours: 15,
      minutes: 0
    },
    endTime: {
      hours: 15,
      minutes: 40
    },
    slido: null,
    type: agendaTypes.RestingMode,
    description: ''
  },
  {
    title: '就算是新手，有愛就沒把專案做出來，對吧',
    name: '宏宏',
    bio: '有著廣泛不同興趣的大四生，目前正在某共享機車公司學習怎麼開發產品',
    startTime: {
      hours: 15,
      minutes: 40
    },
    endTime: {
      hours: 16,
      minutes: 20
    },
    slido: {
      link: 'https://sli.do/wu3rjw5r',
      'iframe': 'https://wall.sli.do/event/wu3rjw5r'
    },
    type: agendaTypes.CommonMode,
    description: '本場將會以個人經歷出發，瞭解一幫學生如何模仿業界工程師、設計師以及產品經理的分工方式卻無情翻船。整場議程將會著重在我與系上好友為了賺取 20 萬元一起出國玩而參與某專案競賽，一路從產品發想、規劃、開發到翻船的歷程，並與會眾解析我們是如何失敗，其中有何處其他團隊可以借鏡之處，並在最後整理出一套輕量化適合學生團隊的專案開發方式。\n\n## Prepare\n個人經驗分享無須先備知識，唯有經歷過完整專案歷程的人會更能理解本議程'
  },
  {
    title: '休息時間',
    name: '',
    bio: '',
    startTime: {
      hours: 16,
      minutes: 20
    },
    endTime: {
      hours: 16,
      minutes: 30
    },
    slido: null,
    type: agendaTypes.RestingMode,
    description: ''
  },
  {
    title: 'CDN 網站攻擊 - 這次換駭客當鬼來抓你了',
    name: 'Mico',
    bio: '致力將資訊安全可能造成的危害，透過幽默詼諧的方式進行告誡\n追求用簡單的方式，把複雜的知識進行解釋 (單押 x1\n希冀自己的綿薄之力能夠為聽眾留下知識的迴盪\n\n- 是個努力成為 WebSecurity 高級魔法師的人',
    startTime: {
      hours: 16,
      minutes: 30
    },
    endTime: {
      hours: 17,
      minutes: 10
    },
    slido: {
      link: 'https://sli.do/nbopftjl',
      'iframe': 'https://wall.sli.do/event/nbopftjl'
    },
    type: agendaTypes.CommonMode,
    description: ' 此議程探討不同於傳統網頁功能缺陷攻擊的駭客手法。\n近年來因網站 CDN/WAF 技術以及網路負載平衡、反向代理等前後端點類型的伺服器架構盛行，被世人遺忘的攻擊手法再次被提起。\n網站管理員用了這些節點技術，卻可能因為多了這些端點，反而多了更多新的駭客攻擊方法？\n新手乍到 CDN 就像在玩鬼抓人，駭客就像鬼一樣，用了一些手法，找到你，接著攻擊你，你.. 真的躲好了嗎？\n一起來看看這些奇妙的攻擊手法吧 \n\n## Prepare\n會從基礎講，有網路(http)基本概念及略懂資安攻擊名詞佳'
  },
  {
    title: '休息時間',
    name: '',
    bio: '',
    startTime: {
      hours: 17,
      minutes: 10
    },
    endTime: {
      hours: 17,
      minutes: 15
    },
    slido: null,
    type: agendaTypes.RestingMode,
    description: ''
  },
  {
    title: 'Lightning Talk',
    name: '',
    bio: '',
    startTime: {
      hours: 17,
      minutes: 15
    },
    endTime: {
      hours: 17,
      minutes: 40
    },
    slido: null,
    type: agendaTypes.LTMode,
    description: ''
  },
  {
    title: '閉幕',
    name: '',
    bio: '',
    startTime: {
      hours: 17,
      minutes: 40
    },
    endTime: {
      hours: 18,
      minutes: 0
    },
    slido: null,
    type: agendaTypes.CommonMode,
    description: ''
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
      bio: x.speakers.map(y => {
        return result.speakers.filter(z => z.id === y)[0].zh.bio
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
      type,
      description: x.zh.description
    }
  })

  data = data.sort((m, n) => {
    return (m.startTime.hours*60 + m.startTime.minutes) - (n.startTime.hours*60 + n.startTime.minutes)
  })
  return data
}
