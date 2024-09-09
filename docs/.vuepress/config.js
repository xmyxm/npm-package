module.exports = {
  title: '@dp/fish',
  description:
      '采用声明式打点方案的，打点自动精确上报工具',
  themeConfig: {
      logo:
          'https://p0.meituan.net/scarlett/44c5450f975edc59b8b744f258995ed26093.png',
      sidebar: 'auto',
      nav: [
          { text: '介绍', link: '/index.md' },
          { text: '参数配置教程', link: '/option.md' },
          { text: '自定义功能使用教程', link: '/custom.md' },
          { text: '各版本CDN链接地址', link: '/sdk.version.md' },  
          { text: 'CHANGELOG', link: '/CHANGELOG.md' },
      ],
      lastUpdated: '上次更新',
  },
  theme: '@nibfe/vuepress-theme-sky',
};