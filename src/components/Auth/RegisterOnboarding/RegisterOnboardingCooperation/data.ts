export const roleOptions = [
  {
    id: 'independent',
    label: '独立开发者',
    icon: `<svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" /><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" /></svg>`,
  },
  {
    id: 'professional',
    label: '在职程序员',
    icon: `<svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>`,
  },
  {
    id: 'techlead',
    label: '技术负责人',
    icon: `<svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>`,
  },
  {
    id: 'ops',
    label: '运维',
    icon: `<svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clip-rule="evenodd" /></svg>`,
  },
  {
    id: 'pm',
    label: '产品经理',
    icon: `<svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" /></svg>`,
  },
  {
    id: 'other',
    label: '其他',
    icon: `<svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /></svg>`,
  },
];

export const commonInterests = {
  title: '工作领域',
  options: [
    'Web开发',
    '移动开发',
    '人工智能',
    '数据科学',
    '云计算',
    '区块链',
    '游戏开发',
    'DevOps',
    '网络安全',
    '嵌入式系统',
  ],
};

export const roleSpecificInterests: Record<string, { title: string; options: string[] }[]> = {
  independent: [
    {
      title: '你的创业方向会用以下技术么？',
      options: [
        'React',
        'Vue',
        'Angular',
        'Nodejs',
        '小程序',
        'Flutter',
        'React Native',
        'PHP',
        'Python',
        'Java',
        'Go',
      ],
    },
    {
      title: '创业方向',
      options: [
        'SaaS',
        'PaaS',
        'IaaS',
        'AI应用',
        '开发者工具',
        '企业服务',
        '消费类应用',
        '教育科技',
        '金融科技',
        '医疗科技',
      ],
    },
  ],
  professional: [
    {
      title: '专业技能',
      options: [
        '前端开发',
        '后端开发',
        '全栈开发',
        '移动开发',
        '数据库',
        '系统架构',
        '微服务',
        '容器化',
        '持续集成/持续部署',
        '测试自动化',
      ],
    },
  ],
  techlead: [
    {
      title: '技术管理',
      options: [
        '团队管理',
        '项目管理',
        '技术规划',
        '性能优化',
        '代码审查',
        '技术债务管理',
        '技术文档',
        '技术分享',
        '招聘面试',
        '导师制',
      ],
    },
  ],
  ops: [
    {
      title: '运维技能',
      options: [
        'Linux系统管理',
        '网络管理',
        '数据库管理',
        '云服务管理',
        '监控和告警',
        '日志管理',
        '安全管理',
        '自动化运维',
        '容器编排',
        '灾备和恢复',
      ],
    },
  ],
  pm: [
    {
      title: '产品技能',
      options: [
        '用户研究',
        '需求分析',
        '产品规划',
        '原型设计',
        '用户体验',
        '数据分析',
        'A/B测试',
        '产品路线图',
        '市场分析',
        '竞品分析',
      ],
    },
  ],
  other: [
    {
      title: '其他技能',
      options: [
        '技术写作',
        '技术支持',
        '技术销售',
        '技术培训',
        '用户界面设计',
        '用户体验设计',
        '数据可视化',
        '商业智能',
        '人工智能伦理',
        '技术咨询',
      ],
    },
  ],
};
