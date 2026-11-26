(() => {
  'use strict';

  const entries = {
    missing: {
      questionZh: "如何填补多条相关时间序列中的缺失值？",
      answerZh: "如果一个传感器掉线，邻近传感器可能仍在记录。ReCTSi 研究如何高效利用这些关联来补全数据；Impute On-Demand 进一步考虑环境变化后怎样调整补全方法。",
      aliases: ["missing data", "missing values", "fill gaps", "imputation", "impute missing readings", "incomplete data", "缺失值", "缺测", "数据补全", "时间序列插补", "数据缺失"],
      question: 'How do you fill gaps in related time series?',
      answer: 'Suppose one sensor stops reporting while nearby sensors keep recording. ReCTSi studies how to use those relationships to fill the gap efficiently. Impute On-Demand asks how to adapt when the relationships themselves change.',
      links: [{ target: 'paper-rectsi', label: 'ReCTSi' }, { target: 'paper-impute', label: 'Impute On-Demand' }]
    },
    forecasting: {
      questionZh: "想了解轻量级时间序列预测，可以从哪里读起？",
      answerZh: "可以先读 LightCTS，了解怎样用轻量模型同时预测多条相关序列，再读后续的模型蒸馏论文，看大模型如何帮助训练轻量预测器。",
      aliases: ["forecasting", "forecast", "lightweight", "predict future values", "time series prediction", "distillation", "轻量化", "时序预测", "时间序列预测", "蒸馏", "预测模型", "forecasting models", "forecasting model", "low cost forecasting"],
      question: 'Where should I start with lightweight forecasting?',
      answer: 'Start with LightCTS for the problem of forecasting related series together on a limited computing budget. The later model distillation paper explores how a larger model can teach a lightweight forecaster.',
      links: [{ target: 'paper-lightcts', label: 'LightCTS' }, { target: 'paper-distillation', label: 'Forecasting with model distillation' }]
    },
    trajectories: {
      questionZh: "怎样衡量两条轨迹是否相似？",
      answerZh: "两次行程即使经过同一条路，速度也可能很不一样。MovSemCL 关注沿途的运动特征，用对比学习来比较轨迹。",
      aliases: ["trajectory", "trajectories", "similar routes", "compare trips", "movement semantics", "gps traces", "轨迹", "路径相似", "路线相似"],
      question: 'What makes two trajectories similar?',
      answer: 'Two trips can follow the same road at very different speeds. MovSemCL studies how to represent a trajectory using information about movement along the path. It uses contrastive learning to compare trips.',
      links: [{ target: 'paper-movsemcl', label: 'MovSemCL' }]
    },
    regimes: {
      questionZh: "没有标签也能识别设备的运行状态吗？",
      answerZh: "可以把它当作无监督状态检测问题。设备带载和空转时，多种传感器读数的组合可能不同。E2USD 研究如何用多元时间序列识别这些状态。",
      aliases: ["unlabelled states", "unlabeled states", "no labels", "operating modes", "state detection", "unsupervised", "无标签", "无标注", "工况", "状态检测"],
      question: 'Can we identify operating states without labels?',
      answer: 'A machine running under load may produce a different combination of sensor readings than the same machine at idle. E2USD studies how to detect such states from several time series when the observations have no state labels.',
      links: [{ target: 'paper-e2usd', label: 'E2USD' }]
    },
    collaboration: {
      questionZh: "怎样联系你讨论科研合作？",
      answerZh: "欢迎来信介绍你的团队和一个希望共同研究的问题。例如，如果你研究出行数据，可以说说想比较哪些行程，以及它们的相似性有助于回答什么问题。下方链接会打开合作邮件草稿。",
      aliases: ["collaboration", "collaborate", "partner with", "work together", "joint research", "共同研究", "合作", "产学研", "校企", "joint project", "joint proposal", "propose a joint project", "合作项目", "合作意向", "company collaborate", "collaborate with", "cooperation", "research partnership", "合作方式", "如何开展合作", "科研合作"],
      question: 'How can I propose a research collaboration?',
      answer: 'Email me a question you would like to investigate together. For example, if you study mobility, which journeys would you like to compare, and what would their similarity tell you? You can use the draft below to introduce your team and your idea.',
      links: [{ source: 'collaboration-enquiry', label: 'Start a collaboration email' }]
    },
    service: {
      questionZh: "你在哪些会议和期刊担任学术服务？",
      answerZh: "我参与过 ICLR、CVPR、SIGKDD、VLDB 等会议的程序委员会工作，也为 IEEE TII、IEEE TNNLS 等期刊审稿。页面列出的是其中一部分。",
      aliases: ["academic service", "reviewer", "review for", "program committee", "pc member", "reviewing", "审稿", "学术服务", "程序委员会", "peer review", "peer reviewing", "哪些会议审稿", "期刊审稿"],
      question: 'Which research communities do you serve?',
      answer: 'My conference service spans machine learning, computer vision and data management, including ICLR, CVPR, SIGKDD and VLDB. I also review for journals including IEEE TII and IEEE TNNLS.',
      links: [{ target: 'service', label: 'Academic service' }]
    },
    industryFit: {
      questionZh: "我们的业务数据适合一起研究吗？",
      answerZh: "相关仪表的读数、不同地点的传感器记录和车辆轨迹都能引出我们关心的问题。可以先说清数据要支持什么决策，例如提前判断需求高峰，还是补全一次停机期间的读数。",
      aliases: ["our data", "industry data", "industrial data", "business data", "company data", "use case", "业务数据", "工业数据", "企业数据", "应用场景", "industry projects", "practical applications", "industry collaboration data", "industry use cases", "企业项目"],
      question: 'Would our data fit your research?',
      answer: 'Readings from several meters, sensors at different locations, or a collection of vehicle trips all raise questions we study. Start with the decision you want to make. For example, do you need to anticipate peak demand or reconstruct readings lost during an outage?',
      links: [{ target: 'research', label: 'Research interests' }]
    },
    outages: {
      questionZh: "传感器掉线时，可以先分析什么？",
      answerZh: "先看一次具体的掉线：哪些传感器停了、持续多久、哪些还在记录。单个传感器掉线与整个站点中断时，可用于补全读数的信息很不一样。",
      aliases: ["sensor outage", "offline sensor", "sensors go offline", "sensor failure", "went offline", "stops reporting", "传感器掉线", "断连", "传感器故障", "数据中断"],
      question: 'Some of our sensors go offline. Where do we start?',
      answer: 'Look at one outage. Which sensors went silent, for how long, and which kept reporting? An isolated gap and an outage across a whole site leave very different information available for estimating the missing readings.',
      links: [{ target: 'paper-rectsi', label: 'Our work on missing readings' }]
    },
    pilot: {
      questionZh: "一个小规模合作试验可以怎么做？",
      answerZh: "以预测为例，先选一个信号、一个预测时长，以及一段留作测试的历史数据。在相同日期上和现有方法比较，再看哪些误差值得一起深入分析。",
      aliases: ["pilot", "proof of concept", "poc", "first trial", "小规模试验", "试点", "概念验证", "合作试验"],
      question: 'What would a small pilot look like?',
      answer: 'For a forecasting pilot, pick one signal, a prediction horizon and a period of historical data to hold out. Compare the forecasts with your current method on the same dates. That first comparison can show which errors are worth investigating together.',
      links: [{ source: 'collaboration-enquiry', label: 'Discuss a pilot by email' }]
    },
    timing: {
      questionZh: "我计划入学的学期有研究生指导名额吗？",
      answerZh: "可以在来信里写明计划入学的学期、目前就读的项目和希望研究的问题，再询问届时是否有指导机会。具体安排需要按学期确认。",
      aliases: ["postgraduate supervision", "taking students", "accepting students", "open positions", "student openings", "master student", "masters student", "prospective postgraduate", "招硕士", "招研究生", "研究生名额", "招生", "收学生", "读研", "master students", "masters students", "accept masters", "accept master students", "taking on students", "intake", "admitting students", "研究生还有名额", "硕士研究生", "收硕士", "招收硕士", "招生计划", "招收研究生", "硕士名额", "招收学生"],
      question: 'Are there postgraduate openings for my intake?',
      answer: 'If you have an intended start term, you can ask whether I expect to supervise new postgraduate students then. Include your programme and the topic you hope to study so I can respond to your particular enquiry.',
      links: [{ source: 'postgraduate-enquiry', label: 'Start a postgraduate enquiry' }]
    },
    chooseTopic: {
      questionZh: "怎样把兴趣缩小成一个研究问题？",
      answerZh: "以交通预测为例，可以问：当某一路段的传感器经常掉线时，邻近路段的数据能否改善预测？尝试写出你关心的信号、想知道的结果，以及让问题变难的条件。",
      aliases: ["choose a topic", "choose research topic", "narrow down", "research idea", "define a question", "选题", "研究选题", "课题怎么选", "研究想法"],
      question: 'How can I turn an interest into a research question?',
      answer: 'Take “traffic forecasting” as an example. A narrower question is whether nearby roads help predict traffic on a road whose sensor often goes offline. Try naming the signal, what you want to learn about it, and one condition that makes the problem hard.',
      links: [{ target: 'research', label: 'Explore research interests' }]
    },
    mentor: {
      questionZh: "你怎样指导学生？",
      answerZh: "我愿意提供细致指导，也欢迎学生独立尝试。讨论时可以带上三个信息：你原先预期什么、实际观察到了什么、还有哪一点想不通。",
      aliases: ["supervision style", "mentoring", "mentorship", "working style", "guidance", "mentoring style", "指导风格", "指导方式", "如何指导学生", "带学生", "what is it like working with you", "how do you mentor students", "指导学生", "带组风格"],
      question: 'What kind of supervision do you offer?',
      answer: 'I offer close guidance and welcome students who like to explore a question independently. If you have already tried something, tell me what you expected, what happened and what still puzzles you. That is a good place for us to begin a discussion.',
      links: [{ target: 'email-templates', label: 'Student enquiry drafts', labelZh: '查看学生咨询邮件模板' }]
    },
    entryPaper: {
      questionZh: "第一次读课题组的论文，推荐从哪篇开始？",
      answerZh: "喜欢预测的同学可以从 LightCTS 入手，想想一条序列如何帮助预测另一条。喜欢地图和出行数据的同学可以读 MovSemCL，思考怎样判断两次行程相似。",
      aliases: ["first read", "reading recommendation", "paper recommendation", "which paper first", "first paper", "入门论文", "推荐论文", "先读哪篇", "从哪篇读起"],
      question: 'Which paper is a good first read?',
      answer: 'If you like prediction, start with LightCTS and ask what one series can tell you about another. If you prefer maps and movement, start with MovSemCL and think about what should make two journeys count as similar.',
      links: [{ target: 'paper-lightcts', label: 'LightCTS' }, { target: 'paper-movsemcl', label: 'MovSemCL' }]
    },
    apply: {
      questionZh: "研究生咨询邮件应该写什么？",
      answerZh: "介绍姓名、学校、专业和当前学习阶段，写明计划入学时间，附上简历，再选一个与你想做的方向有关的项目或问题来展开。邮件模板的主题也预留了姓名位置。",
      aliases: ["postgraduate application", "postgraduate email", "masters application", "graduate application materials", "申请材料", "考研联系", "研究生申请", "硕士申请", "研究生邮件", "申请读研", "what documents do i send", "what documents should i send", "application documents", "materials to send", "材料怎么准备", "准备哪些材料", "要发什么材料"],
      question: 'What should I include in my first email?',
      answer: 'Introduce yourself with your university, field and current stage of study. Mention your intended start term, attach your CV, and tell me about one project or question that connects you to the group. The draft leaves room to explain that connection in your own words.',
      links: [{ source: 'postgraduate-enquiry', label: 'Start a postgraduate enquiry' }]
    },
    interests: {
      questionZh: "GeoAI 和时间序列有什么联系？",
      answerZh: "交通传感器同时记录地点和时间。一个路段的读数既可能受附近道路影响，也可能与更早的交通状况有关。这类问题连接了时间序列分析、时空挖掘和 GeoAI。",
      aliases: ["geoai", "geospatial ai", "geographic ai", "spatial intelligence", "地理人工智能", "地理智能", "地理空间", "what is geoai", "what is geospatial ai", "explain geoai"],
      question: 'How do GeoAI and time series fit together?',
      answer: 'A traffic sensor records both where and when something happens. Its readings can depend on nearby roads as well as on earlier traffic. That combination of location and time connects our work on time series with our interest in GeoAI. We are also interested in AI for science and health.',
      links: [{ target: 'research', label: 'Research interests' }]
    },
    undergrad: {
      questionZh: "大一或大二可以加入课题组吗？",
      answerZh: "欢迎对研究感兴趣的大一、大二同学来信。介绍一下年级、专业和你愿意花时间探索的问题，就能开始交流。",
      aliases: ["undergraduate research", "undergrad", "freshman", "freshmen", "sophomore", "first year undergraduate", "second year undergraduate", "bachelor student", "本科生", "大一", "大二", "本科科研", "undergrads", "undergraduates", "first year student", "second year student", "freshers", "early year undergraduate", "undergraduate student", "本科同学", "大一学生", "大二学生"],
      question: 'Can first- or second-year undergraduates join?',
      answer: 'Yes. I welcome enquiries from first- and second-year undergraduates who are curious about research. Tell me what you are studying and describe a problem you would enjoy spending time on.',
      links: [{ source: 'undergraduate-enquiry', label: 'Start an undergraduate enquiry' }]
    },
    firstExperience: {
      questionZh: "只有课程经历，也能联系课题组吗？",
      answerZh: "可以从一次课程作业讲起。说说你做过的一个选择、为什么这样做，以及结果让你产生了什么疑问。一幅让你意外的图也可以是很好的开场。",
      aliases: ["only coursework", "no experience", "no research experience", "beginner", "never done research", "零基础", "没有科研经历", "没有科研经验", "没做过科研", "只有课程", "no prior research", "never done research before", "没有科研基础", "没经验"],
      question: 'What if I have only done coursework?',
      answer: 'A course assignment gives us plenty to talk about. Pick one decision you made, explain why you made it, and describe something the result left you wondering. A plot that surprised you can be a better introduction to your interests than a list of tools.',
      links: [{ source: 'undergraduate-enquiry', label: 'Introduce yourself by email' }]
    },
    firstProject: {
      questionZh: "想试着做研究，有什么小实验？",
      answerZh: "可以选两个测量同一物理量的传感器，遮住其中一个的一小段读数。先只用它自己的历史数据估计，再加入邻近传感器的数据，最后与被遮住的真实值比较。",
      aliases: ["starter project", "small experiment", "first project", "practice project", "小实验", "入门项目", "练手", "第一个项目"],
      question: 'What small experiment could I try?',
      answer: 'Take two sensors that measure the same quantity. Hide a short stretch of readings from one. Try estimating the missing values first from that sensor’s history and then with help from its neighbour. Compare both estimates with the readings you hid.',
      links: [{ target: 'paper-rectsi', label: 'The related imputation problem' }]
    },
    studentEmail: {
      questionZh: "本科生来信可以怎样介绍自己？",
      answerZh: "写明年级、专业，并附上简历。可以选一门课、一次项目或一个问题，说说自己接下来想尝试什么。邮件主题里也有填写姓名的位置。",
      aliases: ["undergraduate email", "undergraduate enquiry", "undergrad application", "introduce myself", "本科生邮件", "本科生自我介绍", "本科申请", "自荐信", "email as an undergraduate", "本科生发邮件", "本科生该发什么"],
      question: 'How should I introduce myself?',
      answer: 'Include your year, major and CV. Choose a course, project or question you would like to tell me about, and say what you would like to try next. The undergraduate email draft has a space for your name in the subject.',
      links: [{ source: 'undergraduate-enquiry', label: 'Start an undergraduate enquiry' }]
    },
    name: {
      questionZh: "DIG@FZU 是什么意思？",
      answerZh: "DIG@FZU 的全称是 Data Intelligence and Interdisciplinary Information Group（数据智能与交叉信息课题组）。我在福州大学计算机与大数据学院负责这个课题组。",
      aliases: ["dig@fzu", "what is dig", "group name", "stand for", "lab name", "组名", "课题组全称", "dig是什么", "课题组叫什么", "dig", "what does dig mean", "group acronym", "课题组名字", "dig是什么意思"],
      question: 'What does DIG@FZU stand for?',
      answer: 'It stands for the Data Intelligence and Interdisciplinary Information Group at Fuzhou University. I lead the group in the College of Computer and Data Science.',
      links: [{ target: 'about', label: 'About Zhichen Lai' }]
    },
    everyday: {
      questionZh: "生活中什么是时间序列？",
      answerZh: "每小时记录一次气温就得到了一条时间序列。若每条街都有温度计，还可以问：能否用邻街读数估计缺失值，或者用过去几小时的数据预测下一次读数？",
      aliases: ["what is a time series", "example of time series", "time series example", "什么是时间序列", "时间序列是什么", "时序数据举例", "mean by a time series", "what are time series", "define time series", "time series meaning", "时间序列的意思"],
      question: 'What is a time series in everyday life?',
      answer: 'A temperature reading taken every hour makes a time series. Put a thermometer on each street and you can ask two of our research questions. Can nearby streets help you estimate a missing reading? Can their past temperatures help you predict the next one?',
      links: [{ target: 'research', label: 'What the group studies' }]
    },
    career: {
      questionZh: "你为什么回到福州？",
      answerZh: "福州是我从小生活、读书的地方。后来我到成都读计算机，再去丹麦奥尔堡读博并继续做研究。2025 年底，我回到了家乡福州。",
      aliases: ["hometown", "back to fuzhou", "return home", "grew up", "born", "家乡", "哪里人", "回福州", "出生", "成长经历"],
      question: 'What brought you back to Fuzhou?',
      answer: 'Fuzhou is where I grew up and went to school. I left for Chengdu to study computer science, then moved to Aalborg for my Ph.D. and stayed on as a Postdoctoral Research Fellow. In late 2025 I came home to Fuzhou.',
      links: [{ target: 'organizations', label: 'Follow my academic journey' }]
    },
    visits: {
      questionZh: "你在哪些地方做过海外研究？",
      answerZh: "我在丹麦的研究以奥尔堡为基地，也在挪威 Gjøvik 与 Xu Cheng 和 Xiufeng Liu 合作，在澳大利亚悉尼的新南威尔士大学与 Lina Yao 和 Dong Gong 合作。",
      aliases: ["overseas", "norway", "australia", "sydney", "gjovik", "ntnu", "unsw", "visiting fellow", "海外", "挪威", "澳洲", "澳大利亚", "悉尼", "访学"],
      question: 'Where did you work overseas?',
      answer: 'Aalborg was my base in Denmark. I also spent time in Gjøvik, Norway, working with Xu Cheng and Xiufeng Liu, and in Sydney, Australia, working with Lina Yao and Dong Gong at UNSW.',
      links: [{ target: 'organizations', label: 'See the appointments' }]
    },
    funding: {
      questionZh: "哪些项目支持你的研究？",
      answerZh: "主页列出的研究资助与人才项目如下，年份为各条目列出的支持期。",
      aliases: ["research funding", "research support", "研究资助", "grants", "honors", "research awards", "科研经费", "课题资助", "基金项目", "人才项目", "lab funded", "lab funding", "funds your research", "funds the group", "research grants", "funding and honors", "科研资助", "经费来源", "基金", "荣誉", "项目有哪些", "有哪些项目", "科研项目", "所有项目", "list your projects", "list your grants"],
      question: 'What supports the group’s research?',
      answer: 'These are the research grants and talent programmes listed on my homepage, with their support periods.',
      links: []
    },
    biography: {
      question: 'Could you introduce yourself?',
      questionZh: '可以简单介绍一下你自己吗？',
      answer: 'I grew up in Fuzhou, studied computer science in Chengdu, and completed my Ph.D. at Aalborg University in early 2025. I returned to Fuzhou later that year. I now lead DIG@FZU at Fuzhou University, where we study time series and spatio-temporal data, including what we can learn when measurements are missing.',
      answerZh: '我在福州长大，到成都学习计算机科学，2025 年初在丹麦奥尔堡大学取得博士学位，同年年底回到福州。现在我在福州大学带领 DIG@FZU，研究时间序列与时空数据，包括观测不完整时仍能从数据中学到什么。',
      aliases: ['about', 'about you', 'short bio', 'biography', 'introduce yourself', 'about zhichen lai', '人物简介', '介绍一下自己', '个人背景', '自我介绍'],
      links: [{ target: 'about', label: 'Read my full bio', labelZh: '阅读完整个人简介' }, { target: 'organizations', label: 'Education and appointments' }]
    },
    affiliation: {
      question: 'Which key laboratory are you part of?',
      questionZh: '你是哪个重点实验室的成员？',
      answer: 'I am a member of the Fujian Key Laboratory of Network Computing and Intelligent Information Processing, where Professor Xing Chen mentors me. I also lead the Data Intelligence and Interdisciplinary Information Group (DIG@FZU) at Fuzhou University.',
      answerZh: '我是福建省网络计算与智能信息处理重点实验室成员，在这里受到 Xing Chen 教授的指导。我也在福州大学带领数据智能与交叉信息课题组（DIG@FZU）。',
      aliases: ['key lab', 'key laboratory', 'network computing and intelligent information processing', 'fujian key laboratory', '重点实验室', '福建省重点实验室', '网络计算与智能信息处理'],
      links: [{ target: 'about', label: 'Lab affiliation and mentor', labelZh: '查看实验室和导师介绍' }]
    },
    applications: {
      question: 'How could this research help with air quality or traffic?',
      questionZh: '能举个空气质量或交通方面的例子吗？',
      answer: 'If an air-quality station misses a reading, nearby stations may help estimate it. For a traffic forecast, the question looks forward: what do recent road speeds suggest about congestion during rush hour? Both examples use how measurements relate across time and place.',
      answerZh: '当一个空气质量监测站漏测时，可以借助附近站点的读数估计缺失值。预测早高峰拥堵时，则可以从近期道路车速判断接下来可能发生什么。两个例子都用到了观测在时间和空间上的联系。',
      aliases: ['air quality', 'air pollution', 'rush hour', 'traffic congestion', 'traffic speeds', 'traffic forecast', '空气质量', '监测站', '交通拥堵', '车速', '早高峰', '研究有什么用'],
      links: [{ target: 'about', label: 'Research in context', labelZh: '了解研究背景' }, { target: 'research', label: 'Research interests' }]
    },
    office: {
      questionZh: "课题组办公室在哪里？",
      answerZh: "办公室在福州大学计算机与大数据学院 3 号楼 101-2 室。来访地址是福建省福州市福州大学城乌龙江北大道 2 号，可提前发邮件到 lzc@fzu.edu.cn 联系。",
      aliases: ["office", "address", "room", "lab location", "where is the lab", "visit the lab", "办公室", "地址", "在哪栋楼", "实验室在哪", "怎么去", "来访", "where are you based", "street address", "lab address", "办公地点", "在哪个房间", "实验室位置"],
      question: 'Where can I find the lab?',
      answer: 'We are in Room 101-2, Building No. 3, at Fuzhou University’s College of Computer and Data Science. If you are planning a visit, you can reach me at lzc@fzu.edu.cn.',
      links: [{ target: 'contact', label: 'Office address and contact details' }]
    },
    overview: {
      question: "What does DIG@FZU study?",
      questionZh: "DIG@FZU 的主要研究方向是什么？",
      answer: "We study time series and spatio-temporal data. LightCTS explores how to forecast several related signals efficiently, while MovSemCL asks how to compare trajectories using the way people or objects move. Our wider interests include GeoAI and AI for science and health.",
      answerZh: "我们研究时间序列分析与时空数据挖掘。例如，LightCTS 研究如何高效预测多条相关序列，MovSemCL 关注如何利用运动特征衡量轨迹相似性。我们也关注 GeoAI 和面向科学与健康的 AI。",
      aliases: ["research interests", "research directions", "research focus", "research areas", "what do you study", "what does the lab do", "what do you work on", "research topics", "研究方向", "研究兴趣", "做什么研究", "研究什么", "主要做什么", "时空挖掘", "research field", "what is your research about", "spatio temporal data mining", "spatial temporal mining", "研究啥方向", "研究领域", "研究啥", "时空数据挖掘", "科研方向"],
      links: [{ target: "research", label: "Research interests" }, { target: "publications-selected", label: "Selected publications" }]
    },
    identity: {
      question: "Who is Zhichen Lai?",
      questionZh: "赖志宸老师是谁？",
      answer: "I am an Associate Research Professor at Fuzhou University’s College of Computer and Data Science. I lead DIG@FZU and am a member of the Fujian Key Laboratory of Network Computing and Intelligent Information Processing.",
      answerZh: "我是福州大学计算机与大数据学院副研究员，负责 DIG@FZU 课题组，也是福建省网络计算与智能信息处理重点实验室成员。",
      aliases: ["who are you", "who is zhichen lai", "affiliation", "job title", "current position", "which university", "institution", "在哪工作", "职称", "哪个学院", "个人介绍", "在哪个学校", "赖志宸是谁", "who is dr lai", "who leads the lab", "where do you work", "老师是谁", "在哪任教", "个人简介", "工作单位", "学校工作", "你是谁"],
      links: [{ target: "about", label: "About Zhichen Lai" }]
    },
    email: {
      question: "What is your preferred email address?",
      questionZh: "请问怎么联系你？",
      answer: "Email me at lzc@fzu.edu.cn. In Contact, you can copy the address or open a draft for your enquiry.",
      answerZh: "我的邮箱是 lzc@fzu.edu.cn。你可以在 Contact 栏复制地址，也可以按咨询类型打开邮件草稿。",
      aliases: ["email", "e mail", "contact", "reach you", "write to you", "get in touch", "mail address", "邮箱", "联系方式", "怎么联系", "邮件地址", "电邮", "联系您", "office email", "preferred email", "send you an email", "contact information", "联系老师", "联系方式是什么", "邮箱地址", "如何联系您", "怎么联系老师", "联系邮箱", "怎样联系您", "首选邮箱"],
      links: [{ target: "contact", label: "Email and contact details" }]
    },
    joining: {
      question: "Which students can join the group?",
      questionZh: "课题组欢迎哪些学生？",
      answer: "I welcome enquiries from prospective postgraduate students and from first- or second-year undergraduates who are curious about research and enjoy working independently. Choose the email draft for your stage of study, attach your CV and tell me what you would like to explore.",
      answerZh: "欢迎有意读研的同学，以及对科研好奇、愿意主动探索的大一和大二本科生来信。可以选择与你学习阶段对应的邮件草稿，附上简历，并说说你想研究什么。",
      aliases: ["how to apply", "how do i apply", "how can i apply", "join the group", "join your lab", "join dig", "join the lab", "apply to the lab", "加入课题组", "进组", "如何申请", "怎么申请", "加组", "加入实验室", "how do i join your group", "how can i join", "join your group", "join the team", "get involved in the lab", "怎么加入", "如何加入", "如何进组", "报名科研"],
      links: [{ source: 'postgraduate-enquiry', label: 'Postgraduate enquiry' }, { source: 'undergraduate-enquiry', label: 'Undergraduate enquiry' }]
    },
    phd: {
      question: "Can I enquire about PhD supervision?",
      questionZh: "可以咨询博士招生吗？",
      answer: "This page invites postgraduate enquiries. It does not confirm a PhD opening or doctoral supervision for a particular intake. If you are seeking a doctoral place, mention the degree and intended start term in your email so I can respond to that specific question.",
      answerZh: "主页欢迎研究生咨询，目前没有公布具体批次的博士名额或博士指导安排。若你想申请博士，请在邮件中写明学位类型和计划入学学期，便于我具体回复。",
      aliases: ["phd opening", "phd position", "phd supervision", "do you take phd", "phd student", "doctoral", "phd vacancy", "phd admission", "phd", "招博士", "招博", "博士名额", "博导", "申请博士", "博士招生", "phd students", "taking phd students", "accepting phd students", "doctoral supervision", "do you supervise phds"],
      links: [{ source: "postgraduate-enquiry", label: "Ask about postgraduate supervision" }]
    },
    admissions: {
      question: "What are the postgraduate entry requirements?",
      questionZh: "研究生招生有哪些申请要求？",
      answer: "Check the Fuzhou University Graduate School notice for your programme and entry year for eligibility, required documents and deadlines. To ask about supervision in DIG@FZU, email me your intended start term, your CV and a research question you would like to pursue.",
      answerZh: "报考资格、申请材料和时间安排，请查阅福州大学研究生院对应项目和入学年份的招生简章。想了解课题组该学期的指导机会，可以来信注明计划入学时间，附上简历，谈谈你想研究的问题。",
      aliases: ["application deadline", "deadline", "requirements", "gpa", "ielts", "toefl", "application dates", "language requirement", "cutoff", "截止", "绩点", "分数线", "英语要求", "语言成绩", "报名时间", "申请条件", "保研条件", "application requirements", "admission requirements", "需要什么条件", "申请要求", "成绩要求", "admission criteria", "guarantee admission", "ielts score", "toefl score", "minimum gpa", "entry requirement", "招生要求", "招生条件", "报考条件", "研究生报考资格"],
      links: [
        { href: 'https://yjsy.fzu.edu.cn/index/zsjz.htm', label: 'FZU graduate admissions (Chinese)', labelZh: '查看福大研究生招生简章' },
        { source: 'postgraduate-enquiry', label: 'Ask about supervision' }
      ]
    },
    studentFunding: {
      question: "Is funding available for students?",
      questionZh: "有没有学生奖学金或津贴？",
      answer: "The awards listed here support my research. This homepage does not specify a student stipend, scholarship amount or funded place for a particular intake. Please include your programme and intended start term if you want to ask about financial support.",
      answerZh: "Research Support 栏列的是研究项目和荣誉。主页没有公布特定批次的奖学金、津贴金额或受资助学生名额。想咨询资助时，可在邮件里注明项目和计划入学学期。",
      aliases: ["scholarship", "stipend", "studentship", "student funding", "funded position", "tuition", "financial support", "奖学金", "助学金", "补助", "津贴", "学费", "全奖", "funded phd", "phd funding", "financial aid", "financial assistance", "学生资助", "资助博士"],
      links: [{ source: "postgraduate-enquiry", label: "Enquire about student funding" }]
    },
    internship: {
      question: "Are research internships available?",
      questionZh: "有科研实习或访问机会吗？",
      answer: "The invitation on this page is for prospective postgraduates and early-year undergraduates. Internship and visiting openings are not listed. If that is what you are looking for, email your background, research interests and proposed dates.",
      answerZh: "主页的招募面向有意读研的同学和低年级本科生，目前没有列出实习或访问名额。如想咨询，可说明自己的背景、研究兴趣和可参与的时间。",
      aliases: ["internship", "internships", "research intern", "visiting student", "summer internship", "实习", "暑研", "访问学生", "短期访问", "暑期实习", "科研实习", "summer intern", "internship pay"],
      links: [{ target: "contact", label: "Contact Zhichen" }]
    },
    subject: {
      question: "What should I put in the email subject?",
      questionZh: "邮件主题怎么写？",
      answer: "Choose Postgraduate study, Undergraduate research or Research collaboration in Contact. Each draft fills in the subject for you. Replace [Your full name] with your name before sending.",
      answerZh: "在 Contact 中选择读研、本科科研或研究合作的邮件按钮即可预填相应主题。发送前，请把主题中的 [Your full name] 换成自己的全名。",
      aliases: ["email subject", "subject line", "email template", "email draft", "mail template", "邮件主题", "邮件模板", "邮件标题", "邮件格式"],
      links: [{ target: "email-templates", label: "Choose an email draft" }]
    },
    education: {
      question: "Where did you study computer science?",
      questionZh: "你的教育背景是什么？",
      answer: "I earned my B.S. at UESTC in 2018 and my M.S. at Sichuan University in 2021, both in Chengdu. I completed my Ph.D. in Computer Science at Aalborg University in early 2025.",
      answerZh: "我在成都完成本科和硕士学习，2018 年本科毕业于电子科技大学，2021 年硕士毕业于四川大学，2025 年初在丹麦奥尔堡大学获得计算机科学博士学位。",
      aliases: ["education", "degrees", "where did you study", "where did you get your phd", "where did you do your phd", "alma mater", "academic background", "uestc", "sichuan university", "aalborg university", "学历", "教育背景", "毕业院校", "在哪读博", "哪里读博", "哪里毕业", "本科在哪", "博士毕业", "读书经历", "where did you get your doctorate", "doctoral degree", "academic journey", "在哪读的博士", "学位是在哪读", "就读学校", "求学经历", "where was your phd", "received your phd", "读博在哪"],
      links: [{ target: "organizations", label: "Education and experience" }]
    },
    advisors: {
      question: "Who were your research advisors?",
      questionZh: "你的导师有哪些？",
      answer: "My master’s advisor at Sichuan University was Jiancheng Lv. My Ph.D. supervisors at Aalborg University were Christian S. Jensen (a member of Academia Europaea and an ACM and IEEE Fellow), Dalin Zhang and Huan Li. I also worked with Hua Lu as a Postdoctoral Research Fellow, and Xing Chen mentors me at Fuzhou University.",
      answerZh: "我的硕士导师是四川大学的 Jiancheng Lv。博士期间在奥尔堡大学由 Christian S. Jensen（欧洲科学院院士、ACM 和 IEEE 会士）、Dalin Zhang 和 Huan Li 指导。我也曾作为博士后研究员 与 Hua Lu 合作。目前在福州大学，Xing Chen 教授指导我的研究工作。",
      aliases: ["your advisor", "your supervisor", "your advisors", "phd supervisors", "who supervised", "doctoral advisor", "christian s jensen", "jiancheng lv", "xing chen", "huan li", "dalin zhang", "hua lu", "你的导师", "您的导师", "博士导师是谁", "硕士导师", "师从", "phd supervisor", "phd advisor", "your phd supervisor", "your current mentor", "who is your mentor", "who was your supervisor", "who was your phd advisor", "博士导师", "你的博导", "博士生导师是谁", "博士期间的导师"],
      links: [{ target: "about", label: "Academic background and advisors" }]
    },
    publications: {
      question: "Where can I find the full publication list?",
      questionZh: "完整论文列表在哪里？",
      answer: "Open All to browse my work from newest to oldest. You can also filter by topic or choose First Author to see the papers and thesis on which I am the first author.",
      answerZh: "选择 All 可按年份从新到旧浏览我的作品，也可以按研究主题筛选，或选择 First Author 查看我署名第一的作品。",
      aliases: ["publications", "publication list", "papers", "full list", "google scholar", "scholar profile", "bibliography", "代表作", "论文列表", "发表了哪些论文", "谷歌学术", "所有论文", "发表的论文", "list of papers", "recent papers", "recent work", "代表论文", "研究成果", "谷歌学者", "发过什么论文"],
      links: [{ target: "publications-all", label: "Browse all publications" }, { target: "publications-first-author", label: "First-author works" }, { source: "guide-scholar", label: "Open Google Scholar" }]
    },
    downloads: {
      question: 'Where can I download your papers?',
      questionZh: '在哪里可以下载论文全文？',
      answer: 'The links below open PDFs or publisher pages for six selected papers. Browse all publications for the rest of my work.',
      answerZh: '下方链接可打开六篇代表作的 PDF 或出版社页面。其他作品的入口见完整论文列表。',
      aliases: ['pdf', 'full text', 'fulltext', 'download papers', 'download a paper', 'paper download', 'paper pdf', 'open access papers', 'read your papers', '下载论文', '论文下载', '下载文章', '论文全文', '论文原文', '论文 PDF', '获取全文'],
      links: []
    },
    profiles: {
      question: "Where are your academic profiles?",
      questionZh: "哪里可以找到你的学术主页？",
      answer: "My ORCID, GitHub, DBLP and Google Scholar profiles are linked together in Contact. ORCID identifies the author, while DBLP is useful for browsing computer science publications.",
      answerZh: "我的 ORCID、GitHub、DBLP 和 Google Scholar 链接都在 Contact 栏。ORCID 可用于确认作者身份，DBLP 便于浏览计算机领域的论文记录。",
      aliases: ["orcid", "dblp", "academic profiles", "author identifier", "researcher id", "学术主页", "作者标识", "个人主页"],
      links: [{ target: "personal-profiles", label: "Personal profiles" }]
    },
    code: {
      question: "Where can I find code or datasets?",
      questionZh: "哪里可以找代码和数据？",
      answer: "My GitHub profile is linked below. For a particular dataset or implementation, check the corresponding paper for a release link and usage terms. The homepage does not promise a public release for every paper.",
      answerZh: "下方可打开我的 GitHub。要找某项工作的具体实现或数据，请查看相应论文中的资源链接和使用说明；主页没有逐篇列出代码和数据的公开情况。",
      aliases: ["github", "source code", "dataset", "datasets", "repository", "implementation", "open source", "reproduce", "代码", "开源", "数据集", "复现", "仓库", "research code", "code available", "get the code", "开源项目", "源码", "project code", "code release", "开源代码"],
      links: [{ source: "guide-github", label: "Open GitHub" }]
    },
    health: {
      question: "How does your work connect to orthodontics?",
      questionZh: "你们的研究怎样用到正畸领域？",
      answer: "In work with dental researchers, we studied how to assess the midpalatal suture, the joint down the middle of the roof of the mouth. Its stage of maturation is relevant when clinicians consider expanding the upper jaw. Our Scientific Reports paper describes the assessment in detail.",
      answerZh: "我们与口腔研究者合作，研究如何评估上腭中间的骨缝，也就是腭中缝。医生考虑是否进行上颌扩弓时，会关注这条骨缝的成熟程度。下面这篇 Scientific Reports 论文介绍了我们如何做这项评估。",
      aliases: ["ai for science", "ai for health", "scientific data", "health", "healthcare", "interdisciplinary", "科学智能", "科学与健康", "医疗", "健康", "交叉研究", "交叉方向", "ai medicine", "health ai", "ai for healthcare", "医疗人工智能"],
      links: [{ target: 'paper-midpalatal-suture', label: 'Read the Scientific Reports study', labelZh: '查看腭中缝评估论文' }, { target: 'publications-interdisciplinary', label: 'Interdisciplinary publications' }]
    },
    energy: {
      question: 'What can wind turbines and smart meters tell us?',
      questionZh: '风机和智能电表的数据能用来研究什么？',
      answer: 'With wind turbines, one question is whether sensor readings reveal ice on the blades. FreqICE examines changes in signal frequencies to detect icing. For smart meters, we studied a different question: when does a reading look unusual given its context?',
      answerZh: '在风机上，我们关心传感器读数能否反映叶片结冰。FreqICE 从信号的频率特征中识别结冰。智能电表对应的是另一个问题：一个读数单看可能正常，放在当时的用电情境里是否异常？',
      aliases: ['energy research', 'ai for energy', 'wind energy', 'wind turbines', 'blade icing', 'smart meters', 'smart meter', 'wind power', '能源方向', '能源论文', '风电', '风机结冰', '叶片结冰', '智能电表'],
      links: [{ target: 'paper-freqice', label: 'FreqICE' }, { target: 'paper-smart-meters', label: 'Smart-meter anomaly detection', labelZh: '智能电表异常检测' }, { target: 'publications-interdisciplinary', label: 'Interdisciplinary publications' }]
    },
    generative: {
      question: 'What did you work on before time series?',
      questionZh: '在研究时间序列之前，你做过什么？',
      answer: 'One project asked how to generate a Chinese font from a single reference. Other work explored generating different views of an image, composing Chinese palindrome poetry with Liao Chen, and creating abstract paintings with FusionGAN.',
      answerZh: '我们曾研究如何从一个参考样例生成中文字体，也探索过图像的多视角生成。我还与 Liao Chen 合作研究过中文回文诗生成，并参与了用 FusionGAN 创作抽象画的工作。',
      aliases: ['generative model', 'generative models', 'generative papers', 'image generation', 'chinese fonts', 'palindrome poetry', 'liao chen', 'earlier work', '生成模型', '生成式模型', '生成模型论文', '图像生成', '字体生成', '回文诗', '抽象画'],
      links: [{ target: 'publications-generative', label: 'Generative model publications' }]
    },
    readingTopics: {
      question: 'Which papers should I read for my topic?',
      questionZh: '想按研究方向读论文，从哪里开始？',
      answer: 'For forecasting, missing readings or trajectories, start with Time Series. For wind energy, smart meters or dental research, choose Interdisciplinary Information. Generative Model collects the earlier work on images, fonts and poetry.',
      answerZh: '想读预测、数据补全或轨迹分析，可以从时间序列开始。风电、智能电表和口腔研究归在交叉研究里。生成模型则收录了早期关于图像、字体和诗歌的工作。',
      aliases: ['papers by topic', 'publications by topic', 'paper categories', 'publication filters', 'topic filters', 'reading list by topic', '论文分类', '按研究方向找论文', '按主题找论文', '按方向读论文'],
      links: [{ target: 'publications-time-series', label: 'Time Series' }, { target: 'publications-interdisciplinary', label: 'Interdisciplinary Information' }, { target: 'publications-generative', label: 'Generative Model' }]
    },
    talks: {
      question: 'Where have you given research talks?',
      questionZh: '你在哪些地方做过学术报告？',
      answer: 'Selected hosts include BUPT, Fuzhou University, Huawei, Tianjin University of Technology, Xidian University, Xiamen University and Zhejiang University.',
      answerZh: '我在北京邮电大学、福州大学、华为、天津理工大学、西安电子科技大学、厦门大学、浙江大学等高校与机构做过报告。',
      aliases: ['talks', 'seminars', 'invited talk', 'research talk', 'talk hosts', '学术报告', '受邀报告', '讲座', '报告单位'],
      links: [{ target: 'service', label: 'View talks and academic service', labelZh: '查看学术报告与服务' }]
    },
    evaluation: {
      question: "How should we evaluate a forecasting model?",
      questionZh: "怎样评估一个预测模型？",
      answer: "For a first comparison, train on earlier observations and test on a later period. Give each method the same forecast horizon and input history. A simple baseline, such as the most recent observed value, helps show when a more complex model adds something.",
      answerZh: "初次比较时，可以用较早的观测训练，在之后的时间段测试。各方法使用相同的历史长度和预测时长，并加入最近一次观测值这样的简单基线，再看复杂模型在哪些情况下有帮助。",
      aliases: ["baseline", "benchmark", "evaluate forecasts", "test set", "temporal split", "forecast horizon", "评估模型", "测试集", "基线", "时间划分", "评估预测"],
      links: [{ target: "paper-lightcts", label: "A related forecasting paper" }]
    },
    imputeForecast: {
      question: "How does imputation differ from forecasting?",
      questionZh: "插补和预测有什么区别？",
      answer: "Imputation estimates an observation missing inside a recorded period. Forecasting estimates a value after the observations available to the model. The same sensor data can support both tasks, but the time at which information becomes available changes how you design the experiment.",
      answerZh: "插补估计已记录时段中缺失的观测；预测估计当前可用观测之后的值。两项任务可以使用同一批传感器数据，但应按信息在什么时间可用来设计实验。",
      aliases: ["imputation vs forecasting", "imputation and forecasting", "imputation versus forecasting", "插补和预测", "补全和预测", "插补与预测", "预测和插补"],
      links: [{ target: "research", label: "Time series research interests" }]
    },
    labMembers: {
      question: "Who are the members of DIG@FZU?",
      questionZh: "我在哪里可以看到课题组成员名单？",
      answer: "I lead DIG@FZU in the College of Computer and Data Science. This page introduces the group’s research and lists my collaborators and mentors in Experience. It does not give a current student roster or group size.",
      answerZh: "我在福州大学计算机与大数据学院负责 DIG@FZU。主页介绍了研究方向，Experience 中列出了我的合作与指导经历；目前页面没有列出在读学生名单或课题组人数。",
      aliases: ["group members", "lab members", "student roster", "how many students", "group size", "成员名单", "组内成员", "课题组成员", "多少学生", "组里几个人", "how big is the lab", "group roster", "多少成员", "多少人", "组里有哪些人", "课题组人数"],
      links: [{ target: "about", label: "About the group" }]
    },
    meeting: {
      question: "Can I arrange a meeting or lab visit?",
      questionZh: "怎样预约讨论或来访？",
      answer: "Email lzc@fzu.edu.cn with the topic you would like to discuss and a few possible times. The office is in Room 101-2, Building No. 3. No fixed visiting hours are listed on this page.",
      answerZh: "可发邮件到 lzc@fzu.edu.cn，简要说明想讨论的问题和方便的时间。办公室在 3 号楼 101-2 室，主页没有列出固定接待时间。",
      aliases: ["appointment", "office hours", "arrange a meeting", "schedule a meeting", "meeting time", "预约", "约时间", "见面", "办公时间", "接待时间", "office open", "open for visitors", "book a visit", "visit your office", "参观实验室", "预约来访", "何时开门"],
      links: [{ target: "contact", label: "Office and email" }]
    },
    cv: {
      question: "Where can I find your CV?",
      questionZh: "怎样了解你的履历或获取个人简历？",
      answer: "The Experience section lists my education and appointments. Publications, Research Support and Academic Service cover other parts of my academic record. If you need a CV document, you can contact me at lzc@fzu.edu.cn.",
      answerZh: "Experience 中有我的教育和工作经历；论文、科研资助和学术服务分别列在对应栏目。如需简历文件，可以通过 lzc@fzu.edu.cn 联系我。",
      aliases: ["your cv", "download cv", "your resume", "curriculum vitae", "academic cv", "您的简历", "老师的简历", "下载简历", "个人履历", "你的 cv", "老师的 cv", "your academic cv", "哪里有简历"],
      links: [{ target: "organizations", label: "Education and appointments" }]
    }
  };

  entries.citations = {
    question: 'Where can I check current citation counts?',
    questionZh: '哪里可以查看最新引用数？',
    answer: 'The homepage lists publication details. For citation counts or an h-index, open my Google Scholar profile and check the current record there.',
    answerZh: '主页列出了论文信息。引用次数和 h 指数会变化，请到我的 Google Scholar 主页查看当前记录。',
    aliases: ['citations', 'citation count', 'cited by', 'h index', '被引', '引用次数', '引用量', '引用数', 'h指数'],
    links: [{ source: 'guide-scholar', label: 'Check Google Scholar' }]
  };
  entries.projectBrief = {
    question: 'What should we share in a first project email?',
    questionZh: '第一次联系合作需要介绍哪些数据？',
    answer: 'A short description of the measurements, how often they are collected and the question you hope to answer is enough to start a discussion. Mention any restrictions on sharing the data so we can discuss a feasible first step.',
    answerZh: '第一次可以先说明记录了哪些变量、采样频率以及希望解决的问题。如果数据共享有限制，也可以在邮件里说明，方便讨论可行的第一步。',
    aliases: ['data sharing', 'confidential data', 'sensitive data', 'share raw data', 'sharing constraints', '保密数据', '数据共享', '原始数据', '共享限制'],
    links: [{ source: 'collaboration-enquiry', label: 'Discuss your project' }]
  };
  entries.arrangements = {
    question: 'Can I take part remotely or part-time?',
    questionZh: '可以远程或兼职参与吗？',
    answer: 'Working arrangements are not specified on the homepage. In your enquiry, say where you are based, when you could take part and the kind of work you would like to do.',
    answerZh: '主页没有公布远程或兼职参与的统一安排。可以在来信中说明所在地、能参与的时间以及想做的研究，再具体讨论。',
    aliases: ['remote', 'part time', 'work from home', 'online internship', '远程', '兼职', '线上实习', '异地参与'],
    links: [{ target: 'email-templates', label: 'Choose an enquiry draft' }]
  };
  entries.eligibility = {
    question: 'Who can apply to join DIG@FZU?',
    questionZh: '目前哪些学生可以申请加入课题组？',
    answer: 'I welcome self-motivated students who are considering postgraduate study or looking for research experience in their first two undergraduate years. I am not currently accepting postgraduate applications from non-Chinese citizens. For postgraduate admission dates and programme requirements, check the university notice for your entry year.',
    answerZh: '欢迎有自驱力、计划读研或希望在大一大二尝试科研的同学来信。目前我暂不接收非中国籍学生的研究生申请。研究生报名时间和专业要求请以福州大学当年的招生简章为准。',
    aliases: ['international students', 'international applicant', 'non Chinese', 'foreign students', 'citizenship', 'nationality', 'can international students apply', '外国学生', '留学生', '国际生', '非中国籍', '国籍', '招国际学生吗'],
    links: [{ href: 'https://yjsy.fzu.edu.cn/index/zsjz.htm', label: 'FZU admissions notices', labelZh: '福大招生简章' }]
  };
  entries.recognition = {
    question: 'Which SIGMOD paper did Paper Digest highlight?',
    questionZh: '哪篇 SIGMOD 论文入选了 Paper Digest 榜单？',
    answer: 'LightCTS, our SIGMOD 2023 paper on lightweight forecasting for related time series, is included in Paper Digest’s September 2025 list of influential SIGMOD papers.',
    answerZh: '入选的是 SIGMOD 2023 论文 LightCTS，研究如何用轻量模型预测多条相关时间序列。它收录在 Paper Digest 2025 年 9 月发布的 SIGMOD 影响力论文榜单中。',
    aliases: ['Paper Digest', 'PaperDigest', 'influential SIGMOD papers', 'most influential', '影响力论文', '影响力榜单', '哪篇论文入选'],
    links: [{ target: 'paper-lightcts', label: 'LightCTS (SIGMOD 2023)' }, { source: 'lightcts-recognition', label: 'Open the Paper Digest list', labelZh: '查看 Paper Digest 榜单' }]
  };
  entries.international = {
    question: 'Do you accept postgraduate applications from non-Chinese citizens?',
    questionZh: '目前接收非中国籍学生的研究生申请吗？',
    answer: 'I am not currently accepting postgraduate applications from non-Chinese citizens.',
    answerZh: '目前我的课题组暂不接收非中国籍学生的研究生申请。',
    aliases: entries.eligibility.aliases,
    links: []
  };
  entries.eligibility.aliases = ['who is eligible to join', 'student eligibility', '哪些学生可以申请'];
  for (const key of ['joining', 'timing', 'phd', 'admissions']) {
    entries[key].answer += ' I am not currently accepting postgraduate applications from non-Chinese citizens.';
    entries[key].answerZh += '目前我的课题组暂不接收非中国籍学生的研究生申请。';
  }
  const followUps = {
    overview: ['readingTopics', 'applications'], readingTopics: ['recognition', 'downloads'],
    recognition: ['forecasting'], eligibility: ['apply', 'undergrad'], admissions: ['eligibility', 'timing'],
    joining: ['eligibility', 'apply'], undergrad: ['firstProject', 'studentEmail'],
    industryFit: ['pilot', 'collaboration'], pilot: ['projectBrief'], everyday: ['health', 'energy']
  };
  const byAudience = {
    researcher: ['overview', 'readingTopics', 'downloads', 'code', 'collaboration', 'funding'],
    industry: ['industryFit', 'energy', 'health', 'projectBrief', 'pilot', 'collaboration'],
    postgraduate: ['eligibility', 'timing', 'admissions', 'chooseTopic', 'mentor', 'apply'],
    student: ['undergrad', 'firstExperience', 'firstProject', 'mentor', 'studentEmail', 'office'],
    curious: ['name', 'everyday', 'applications', 'career', 'talks', 'office']
  };

  // Use the displayed titles and periods so the Guide stays in sync with Research Support.
  const grantNames = {
    'grant-moe': ['教育部国家海外引才专项', ['MOE', 'MOE talent programme', 'overseas talent recruitment', '教育部引才', '教育部海外引才', '海外引才专项']],
    'grant-nsfc': ['国家自然科学基金青年科学基金项目（C 类）', ['NSFC', 'Young Scientists Fund', '国自然', '国家自然科学基金', '青年科学基金', '国自然青年基金', '青基C', '青年基金']],
    'grant-zju': ['浙江大学区块链与数据安全全国重点实验室开放课题', ['ZJU open grant', 'Zhejiang University grant', 'blockchain and data security', 'open research grant', '浙大开放课题', '区块链开放课题', '浙大区块链', '浙大项目']],
    'grant-fujian': ['福建省高层次人才（C 类）', ['Fujian talent program', 'Fujian high-level talent', 'provincial talent', '福建省人才项目', '福建省高层次人才', '福建高层次人才', '福建省人才计划']],
    'grant-qishan': ['福州大学旗山学者计划', ['Qishan Scholar', 'Qishan', '旗山学者', '旗山学者计划']]
  };
  for (const card of document.querySelectorAll('#projects .pub-card[id]')) {
    const title = card.querySelector('.pub-title').textContent.trim();
    const period = card.querySelector('time').textContent.trim();
    const [titleZh, aliases] = grantNames[card.id] || [title, []];
    entries[card.id] = {
      question: title, questionZh: titleZh,
      answer: title + ' (' + period + ').', answerZh: titleZh + '，支持期为 ' + period + ' 年。',
      aliases: [title, titleZh, ...aliases],
      links: [{ target: card.id, label: 'View grant record', labelZh: '查看项目条目' }]
    };
    entries.funding.links.push({ target: card.id, label: title + ' · ' + period, labelZh: titleZh + ' · ' + period });
  }

  // Read titles, venues and author lists from the same records visitors see.
  const paperNotes = {
    'paper-impute': ['Impute On-Demand', 'It studies adaptive imputation of missing values in correlated time series when the environment changes.', '这项工作研究环境变化时，如何自适应地补全相关时间序列中的缺失值。'],
    'paper-movsemcl': ['MovSemCL', 'It studies how to learn trajectory similarity from movement semantics using contrastive learning.', '这项工作用对比学习建模轨迹中的运动语义，以研究轨迹相似度。'],
    'paper-distillation': ['LightCTS⋆', 'It studies how model distillation can support lightweight forecasting of correlated time series.', '这项工作研究如何用模型蒸馏增强相关时间序列的轻量预测。'],
    'paper-rectsi': ['ReCTSi', 'It studies resource-efficient imputation using decoupled pattern learning and completeness-aware attention.', '这项工作通过解耦模式学习和对完整度的感知，高效补全相关时间序列。'],
    'paper-e2usd': ['E2USD', 'It studies efficient, unsupervised detection of states in multivariate time series.', '这项工作研究如何高效地从多元时间序列中无监督识别状态。'],
    'paper-lightcts': ['LightCTS', 'It introduces a lightweight framework for forecasting several related time series.', '这项工作提出用于多条相关时间序列预测的轻量框架。'],
    'paper-saurl-ts': ['SaURL-TS', 'It studies how to learn representations of time series without labels using a self-adaptive framework.', '这项工作研究如何用自适应框架从无标签时间序列中学习表示。', ['SaURL TS', '无监督时序表示学习']],
    'paper-latte': ['LATTE', 'It studies how to divide trajectories into segments when learning to compare their similarity.', '这篇论文研究怎样自适应地分段轨迹，以学习轨迹之间的相似性。', ['自适应轨迹分段']],
    'paper-frequency-aware': ['Frequency-aware augmentation and alignment', 'It studies how to use frequency information when augmenting and aligning time series for contrastive learning.', '这篇论文研究在时间序列对比学习中，怎样利用频率信息进行数据增强和对齐。', ['frequency aware augmentation', '频率感知增强', '频域增强与对齐']],
    'paper-ostar': ['OSTAR', 'It studies how to detect an unusual portion of a trajectory online using topological information and autoregressive reasoning.', '这篇论文利用拓扑信息和自回归推理，研究如何在线检测轨迹中的异常片段。', ['异常子轨迹检测']],
    'paper-orangetree': ['OrangeTree', 'It combines linear and tree-based forecasting and supports different input lengths and forecast horizons.', '这项工作结合线性模型和树模型，支持不同的历史输入长度与预测长度。', ['orange tree', '树模型时序预测']],
    'paper-thesis': ['Doctoral thesis', 'My thesis brings together research on efficient deep learning for the analysis of correlated time series.', '我的博士论文围绕一个共同问题展开：如何用高效的深度学习方法分析多条相关时间序列。', ['PhD thesis', 'dissertation', '博士论文', '博士学位论文']],
    'paper-freqice': ['FreqICE', 'It studies whether frequency patterns in turbine measurements can reveal ice on the blades.', '这项工作研究如何从风机测量信号的频率特征中检测叶片结冰。', ['频率学习检测结冰']],
    'paper-digital-twin': ['Industrial symbiosis digital twin', 'This preprint examines the use of a digital twin to study carbon dioxide emission reduction in a Norwegian industrial symbiosis supply chain.', '这篇预印本以挪威的工业共生供应链为案例，研究如何用数字孪生分析二氧化碳减排。', ['digital twin', 'carbon dioxide emission reduction', '数字孪生', '工业共生供应链']],
    'paper-lightwind': ['LightWind', 'It studies lightweight forecasting of wind power output.', '这项工作研究如何用轻量模型预测风电功率。', ['light wind', '风电功率预测']],
    'paper-midpalatal-suture': ['Midpalatal suture assessment', 'It studies multimodal deep learning for assessing the midpalatal suture in the context of maxillary expansion.', '这篇论文研究如何在上颌扩弓评估中，使用多模态深度学习分析腭中缝。', ['maxillary expansion paper', '腭中缝评估', '上颌扩弓论文']],
    'paper-deepmsm': ['DeepMSM', 'This abstract describes multimodal deep learning for staging the maturation of the midpalatal suture.', '这篇摘要介绍了用多模态深度学习判断腭中缝成熟阶段的工作。', ['midpalatal suture maturation staging', '腭中缝成熟分期']],
    'paper-aira': ['AIRa', 'This building case study examines a blockchain-based alert system for assessing infection risk and informing decisions.', '这项工作以建筑空间为案例，研究如何用基于区块链的预警系统评估感染风险并支持决策。', ['infection risk assessment', '感染风险评估', '区块链预警系统']],
    'paper-blade-icing': ['Wavelet-based blade icing detection', 'It uses a multiscale wavelet-driven graph convolutional network to study wind turbine blade icing.', '这项工作研究如何用多尺度小波驱动的图卷积网络检测风机叶片结冰。', ['wavelet driven graph convolutional network', 'multiscale wavelet', '小波结冰', '小波图卷积']],
    'paper-fusiongan': ['FusionGAN', 'It explores how to combine certainty and uncertainty in a generative model for abstract paintings.', '这篇论文探索怎样在生成模型中结合确定性与不确定性，用于创作抽象画。', ['fusion gan', '生成抽象画']],
    'paper-chinese-fonts': ['Single-reference Chinese font generation', 'It studies generating Chinese fonts using a single reference example.', '这项工作研究如何从一个参考样例生成中文字体。', ['Chinese font generation', 'single reference font', '单样例字体生成', '中文字体生成']],
    'paper-palindrome-poetry': ['Chinese palindrome poetry', 'This work with Liao Chen and colleagues explores how to generate Chinese palindrome poetry.', '我与 Liao Chen 等人合作，探索了中文回文诗的生成。', ['palindrome poetry generation', '回文诗生成', '中文回文诗']],
    'paper-smart-meters': ['Smart-meter anomaly detection', 'It studies how the context of a smart-meter reading can help detect anomalies in a stream of energy measurements.', '这篇论文研究如何结合上下文，在连续的智能电表读数中检测异常。', ['smart meter', 'smart meters', '智能电表', '电表异常检测']],
    'paper-multi-view': ['Multi-view image generation', 'It explores generating multiple views of an image with a Cycle CVAE-GAN network.', '这项工作研究如何用 Cycle CVAE-GAN 网络生成不同视角的图像。', ['cycle CVAE GAN', 'multi view generation', '多视角图像生成', '多视图图像生成']]
  };
  const paperPdfs = {
    'paper-impute': { href: 'https://arxiv.org/pdf/2607.23503', label: 'Impute On-Demand (PDF)' },
    'paper-movsemcl': { href: 'https://arxiv.org/pdf/2511.12061', label: 'MovSemCL (extended PDF)', labelZh: 'MovSemCL（扩展版 PDF）' },
    'paper-rectsi': { href: 'https://rucforsk.ruc.dk/ws/portalfiles/portal/106424853/3637528.3671816.pdf', label: 'ReCTSi (PDF)' },
    'paper-e2usd': { href: 'https://arxiv.org/pdf/2402.14041', label: 'E2USD (PDF)' },
    'paper-lightcts': { href: 'https://arxiv.org/pdf/2302.11974', label: 'LightCTS (PDF)' }
  };
  const papers = [...document.querySelectorAll('#publications .pub-card[id]')].map(card => {
    const titleLink = card.querySelector('.pub-title a').cloneNode(true);
    titleLink.querySelector('.visually-hidden')?.remove();
    const title = titleLink.textContent.trim();
    const authors = card.querySelector('.pub-authors').textContent.trim();
    const venueYear = card.querySelector('.pub-venue').textContent.trim();
    const year = card.querySelector('time').dateTime;
    const venue = venueYear.replace(year, '').trim();
    const [short, note, noteZh, aliases = []] = paperNotes[card.id] || [titleLink.querySelector('.paper-token')?.textContent.trim() || title, '', ''];
    const readingLink = paperPdfs[card.id] || {
      href: titleLink.href, label: short + ' (publication page)', labelZh: short + '（作品页面）'
    };
    entries[card.id] = {
      question: short === title ? title : 'What is ' + short + ' about?',
      questionZh: short + ' 研究什么？',
      answer: [title + ' (' + venueYear + ').', note, 'Authors: ' + authors + '.'].filter(Boolean).join(' '),
      answerZh: '《' + title + '》（' + venueYear + '）。' + noteZh + ' 作者为 ' + authors + '。',
      aliases: [short, title, ...aliases], links: [readingLink, { target: card.id, label: 'View publication details', labelZh: '查看论文条目' }]
    };
    return { key: card.id, title, year, venue, readingLink, selected: card.dataset.filters.split(' ').includes('selected') };
  });
  entries.downloads.links = [...papers.filter(p => p.selected).map(p => p.readingLink), { target: 'publications-all', label: 'Browse all publications' }];
  const paperNames = papers.flatMap(paper =>
    entries[paper.key].aliases.map(alias => ({ name: normalize(alias), paper }))
  ).sort((a, b) => b.name.length - a.name.length);

  const audience = document.getElementById('guide-audience');
  const questions = document.getElementById('guide-questions');
  const form = document.getElementById('guide-form');
  const input = document.getElementById('guide-input');
  const result = document.getElementById('guide-answer');
  const phone = window.matchMedia('(max-width: 767px)');
  const han = /\p{Script=Han}/u;
  const localizedLinks = {
    about: '关于赖志宸', research: '研究兴趣', organizations: '教育与工作经历', publications: '论文',
    'publications-all': '查看全部论文', 'publications-selected': '代表性论文', 'publications-first-author': '查看第一作者作品',
    'publications-time-series': '时间序列论文', 'publications-interdisciplinary': '交叉研究论文', 'publications-generative': '生成模型论文', 'paper-freqice': 'FreqICE',
    contact: '联系信息', projects: '科研资助', service: '学术服务',
    'postgraduate-enquiry': '打开研究生咨询草稿', 'undergraduate-enquiry': '打开本科科研咨询草稿',
    'collaboration-enquiry': '打开科研合作草稿', 'email-templates': '选择邮件模板',
    'personal-profiles': '个人学术主页', 'guide-github': '打开 GitHub', 'guide-scholar': '打开 Google Scholar',
    'paper-rectsi': 'ReCTSi', 'paper-impute': 'Impute On-Demand', 'paper-lightcts': 'LightCTS',
    'paper-distillation': '模型蒸馏预测论文', 'paper-movsemcl': 'MovSemCL', 'paper-e2usd': 'E2USD'
  };

  function normalize(text) {
    return text.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase()
      .replace(/\bph\.d\.?/g, 'phd').replace(/['’]s\b/g, '')
      .replace(/\blightcts\s*[*⋆★]/g, 'lightcts star')
      .replace(/(\p{Script=Han})([a-z0-9])/gu, '$1 $2').replace(/([a-z0-9])(\p{Script=Han})/gu, '$1 $2')
      .replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  }

  const skip = new Set(('a an the and or is was are were be been do does did can could should ' +
    'would will has have how what which who why where when with from to of at on in for it i my we our ' +
    'me you your us his her about find any tell please want like know more some there get as work working use explain much ' +
    '的 了 呢 吗 在 是 有 我 你 您 请 请问 一下 怎么 如何 什么 可以 想 想问 想知道 是否').split(/\s+/));
  const segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter('zh', { granularity: 'word' }) : null;
  function tokens(text) {
    const parts = text.match(/[a-z0-9]+|\p{Script=Han}+/gu) || [];
    const words = parts.flatMap(part => {
      if (!han.test(part)) return [part];
      if (segmenter) return Array.from(segmenter.segment(part), item => item.segment);
      return Array.from(part.slice(1), (_, i) => part.slice(i, i + 2));
    });
    return [...new Set(words.filter(w => !skip.has(w) && (w.length > 1 || han.test(w))))];
  }

  const frequency = new Map();
  const index = Object.entries(entries).map(([key, entry]) => {
    const phrases = [entry.question, entry.questionZh, ...entry.aliases].map(normalize);
    const words = new Set(phrases.flatMap(tokens));
    for (const word of words) frequency.set(word, (frequency.get(word) || 0) + 1);
    return { key, phrases, words };
  });
  function wordWeight(word) {
    return 1 + Math.log((index.length + 1) / ((frequency.get(word) || 0) + 1));
  }
  function containsPhrase(text, phrase) {
    return han.test(phrase) ? text.includes(phrase) : (' ' + text + ' ').includes(' ' + phrase + ' ');
  }

  // Correct unique, near-identical English terms only (e.g. "forecasing").
  function correctTypos(query) {
    return query.replace(/[a-z]{6,}/g, word => {
      if (frequency.has(word)) return word;
      const candidates = [];
      for (const known of frequency.keys()) {
        if (known[0] !== word[0] || Math.abs(word.length - known.length) > 1) continue;
        let offset = 0;
        while (offset < word.length && word[offset] === known[offset]) offset++;
        const a = word.slice(offset), b = known.slice(offset);
        const near = a.slice(1) === b || a === b.slice(1) || a.slice(1) === b.slice(1) ||
          (a.length >= 2 && a[0] === b[1] && a[1] === b[0] && a.slice(2) === b.slice(2));
        if (near) candidates.push(known);
      }
      return candidates.length === 1 ? candidates[0] : word;
    });
  }
  function rank(query) {
    const words = tokens(query);
    const total = words.reduce((sum, word) => sum + wordWeight(word), 0);
    return index.map(({ key, phrases, words: vocabulary }) => {
      if (phrases.includes(query)) return { key, score: 100, confident: true };
      const shared = words.filter(word => vocabulary.has(word));
      const weight = shared.reduce((sum, word) => sum + wordWeight(word), 0);
      const coverage = total ? weight / total : 0;
      // A whole phrase is stronger evidence than scattered words in a long question.
      let phraseScore = 0;
      let distinctive = false;
      for (const phrase of phrases) {
        if (containsPhrase(query, phrase)) {
          const length = han.test(phrase) ? phrase.replace(/\s/g, '').length / 1.6 : phrase.split(' ').length;
          phraseScore = Math.max(phraseScore, 3 + Math.min(6, length));
          if (phrase.length >= 4 && frequency.get(phrase) === 1) distinctive = true;
        }
      }
      const confident = distinctive || phraseScore >= 5 || (phraseScore > 0 && (coverage >= .48 || shared.length >= 2)) ||
        (shared.length >= 2 && coverage >= .62);
      const score = phraseScore + 3 * coverage + Math.min(12, weight) / 4;
      return { key, score, confident };
    }).filter(match => match.score >= 1.6).sort((a, b) => b.score - a.score);
  }

  function showReply(heading, text, resources, chinese) {
    result.lang = chinese ? 'zh-CN' : 'en';
    const title = document.createElement('h3');
    title.textContent = heading;
    const paragraph = document.createElement('p');
    const keyword = chinese ? '有自驱力' : 'self-motivated';
    const offset = text.indexOf(keyword);
    if (offset < 0) {
      paragraph.textContent = text;
    } else {
      const emphasis = document.createElement('strong');
      emphasis.className = 'recruit-emphasis';
      emphasis.textContent = keyword;
      paragraph.append(text.slice(0, offset), emphasis, text.slice(offset + keyword.length));
    }
    result.replaceChildren(title, paragraph);
    if (!resources.length) return;
    const links = document.createElement('div');
    links.className = 'guide-links';
    for (const resource of resources) {
      const link = document.createElement('a');
      if (resource.source) {
        const original = document.getElementById(resource.source);
        link.href = original.href;
        link.target = original.target;
        link.rel = original.rel;
      } else if (resource.href) {
        link.href = resource.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      } else {
        link.href = '#' + resource.target;
      }
      link.textContent = chinese ? resource.labelZh || localizedLinks[resource.source || resource.target] || resource.label : resource.label;
      links.append(link);
    }
    result.append(links);
  }

  let lastPaper = null;
  function selectQuestion(key, chinese) {
    const entry = entries[key];
    lastPaper = key.startsWith('paper-') ? key : null;
    for (const button of questions.children) {
      button.setAttribute('aria-pressed', String(button.dataset.key === key));
    }
    showReply(chinese ? entry.questionZh : entry.question, chinese ? entry.answerZh : entry.answer, entry.links, chinese);
    if (followUps[key]) {
      const next = document.createElement('div');
      next.className = 'guide-suggestions';
      next.setAttribute('role', 'group');
      next.setAttribute('aria-label', chinese ? '相关问题' : 'Related questions');
      next.append(...followUps[key].map(topic => questionButton(topic, chinese)));
      result.append(next);
    }
  }

  function questionButton(key, chinese = false) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'guide-choice';
    button.dataset.key = key;
    button.textContent = chinese ? entries[key].questionZh : entries[key].question;
    button.setAttribute('aria-controls', result.id);
    button.addEventListener('click', () => {
      // Suggestions live inside the panel that is about to be replaced.
      const fromSuggestions = result.contains(button);
      if (!fromSuggestions) {
        input.value = '';
        input.setCustomValidity('');
      }
      selectQuestion(key, chinese);
      if (fromSuggestions) {
        result.tabIndex = -1;
        result.focus({ preventScroll: true });
      }
    });
    return button;
  }

  function paperList(query, chinese, wantsFullText) {
    if (/\breview(?:ing|er)?\b|审稿/.test(query)) return false;
    if (!/\b(papers?|publications?|publish(?:ed)?|articles?)\b|论文|发表|文章/.test(query)) return false;
    const year = query.match(/(?:19|20)\d{2}/)?.[0];
    const venues = new Map(papers.map(p => [normalize(p.venue.replace(/^IEEE /, '')), p.venue]));
    venues.set('kdd', 'SIGKDD').set('webconf', 'WWW').set('thewebconf', 'WWW');
    for (const other of ['ICLR', 'ICML', 'NeurIPS', 'CVPR', 'VLDB', 'CIKM', 'ICDM', 'DASFAA', 'CSCWD']) venues.set(other.toLowerCase(), other);
    const venue = [...venues].find(([name]) => new RegExp('(?:^|[^a-z])' + name + '(?:$|[^a-z])').test(query))?.[1];
    if (!year && !venue) return false;
    const matches = papers.filter(p => (!year || p.year === year) && (!venue || p.venue === venue));
    const filter = [venue, year].filter(Boolean).join(' ');
    const note = matches.length
      ? (chinese ? '主页列出的相关作品如下。' : 'These works appear in Publications.')
      : (chinese ? '主页没有符合这个条件的条目。也可以查看 Google Scholar。' : 'The homepage has no matching entry. You can also check Google Scholar.');
    showReply((chinese ? '论文 · ' : 'Publications · ') + filter, note, matches.length
      ? matches.map(p => wantsFullText ? p.readingLink : { target: p.key, label: p.title, labelZh: p.title })
      : [{ source: 'guide-scholar', label: 'Open Google Scholar' }], chinese);
    return true;
  }

  function suggest(matches, chinese) {
    const role = audience.querySelector('input:checked')?.value;
    const keys = matches.length ? matches.slice(0, 3).map(m => m.key) : (byAudience[role] || ['overview', 'joining', 'email']).slice(0, 3);
    showReply(chinese ? '你想了解哪一项？' : 'Which question did you have in mind?',
      matches.length
        ? (chinese ? '下面的问题可能相关，也可以换一种说法再问。' : 'Try one of these related questions, or rephrase your question.')
        : (chinese ? '主页问答中还没有找到对应答案。可以从下面的问题开始，或查看联系信息。' : 'I couldn’t find an answer to that in the homepage guide. Try one of these questions or use the contact details.'),
      matches.length ? [] : [{ target: 'contact', label: 'Contact details' }], chinese);
    const options = document.createElement('div');
    options.className = 'guide-suggestions';
    options.append(...keys.map(key => questionButton(key, chinese)));
    result.append(options);
  }

  function showQuestions() {
    const role = audience.querySelector('input:checked')?.value;
    questions.replaceChildren();
    questions.hidden = !role;
    if (!role) return;
    for (const key of byAudience[role]) {
      const button = questionButton(key);
      button.setAttribute('aria-pressed', 'false');
      questions.append(button);
    }
  }
  function setDefaultAudience() {
    audience.querySelector('input[value="researcher"]').checked = !phone.matches;
    showQuestions();
  }
  function keepSelection() {
    phone.removeEventListener('change', setDefaultAudience);
  }
  function answerQuery(query, chinese) {
    for (const button of questions.children) button.setAttribute('aria-pressed', 'false');
    if (/non chinese|nonchinese|foreign students?|international (?:students?|applicants?)|not a chinese citizen|非中国籍|外国籍|外籍|外国学生|国际生|留学生/.test(query)) {
      const undergraduate = /undergrad|freshm[ae]n|sophomore|first year undergraduate|本科|大一|大二/.test(query);
      const postgraduate = /postgrad|graduate school|master|phd|研究生|读研|硕士|博士/.test(query);
      selectQuestion(undergraduate && !postgraduate ? 'undergrad' : 'international', chinese);
      return;
    }
    if (/paper\s*digest|most influential sigmod|影响力榜单|影响力论文/.test(query)) {
      selectQuestion('recognition', chinese);
      return;
    }
    // Citation counts change independently of the static publication records.
    if (/\bcitations\b|\bcitation count|\bh index\b|被引|引用次数|引用量|引用数/.test(query)) {
      selectQuestion('citations', chinese);
      return;
    }
    const namedPaper = paperNames.find(({ name }) => containsPhrase(query, name))?.paper ||
      (/\bdistillation\b|蒸馏/.test(query) && papers.find(p => p.key === 'paper-distillation'));
    const asksMetadata = /autho(?:r|red)|wrote|published|which venue|which year|what year|作者|哪年|哪一年|发表在哪里|哪个会议|哪个期刊/.test(query);
    const asksSubject = /\b(?:paper|thesis|study|summary|summarize|about)\b|研究什么|研究了什么|主要内容|论文简介|介绍一下这篇/.test(query);
    const asksForText = /\b(?:pdf|download|full ?text)\b|下载|全文|原文/.test(query) &&
      !/\b(?:code|datasets?|cv|resume)\b|代码|数据集|简历/.test(query);
    const referredPaper = namedPaper || (/\bit\b|\bthis (paper|work)\b|这篇|它|这项/.test(query) && papers.find(p => p.key === lastPaper));
    if (referredPaper && asksForText) {
      lastPaper = referredPaper.key;
      const isPdf = Boolean(paperPdfs[referredPaper.key]);
      const note = isPdf
        ? (chinese ? '打开下方 PDF 即可阅读全文或保存副本。' : 'Open the PDF below to read the paper or save a copy.')
        : (chinese ? '下方链接通往这项作品的发表或收录页面，可在该页查看全文获取方式。' : 'The link below opens the publication record, where you can check the full-text options.');
      showReply(referredPaper.title, note, entries[referredPaper.key].links, chinese);
      return;
    }
    if (referredPaper && asksMetadata) {
      selectQuestion(referredPaper.key, chinese);
      return;
    }
    lastPaper = null;
    if (!namedPaper && paperList(query, chinese, asksForText)) return;
    if (asksForText && /\b(papers?|publications?|articles?)\b|论文|文章/.test(query)) {
      selectQuestion('downloads', chinese);
      return;
    }
    const matches = rank(query);
    const [best, next] = matches;
    if (best?.confident && (!next || best.score - next.score >= 1)) {
      selectQuestion(best.key, chinese);
    } else if (referredPaper && asksSubject) {
      selectQuestion(referredPaper.key, chinese);
    } else {
      suggest(matches, chinese);
    }
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const chinese = han.test(input.value);
    const query = correctTypos(normalize(input.value));
    if (!query) {
      input.setCustomValidity(chinese ? '请输入你的问题。' : 'Please enter a question.');
      input.reportValidity();
      return;
    }
    keepSelection();
    answerQuery(query, chinese);
  });
  input.addEventListener('input', () => {
    input.setCustomValidity('');
    keepSelection();
  });
  audience.addEventListener('click', keepSelection, { once: true });
  audience.addEventListener('change', () => {
    keepSelection();
    lastPaper = null;
    result.replaceChildren();
    input.value = '';
    input.setCustomValidity('');
    showQuestions();
  });
  questions.addEventListener('click', keepSelection, { once: true });
  phone.addEventListener('change', setDefaultAudience);
  setDefaultAudience();
})();
