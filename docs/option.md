
# 参数配置教程

## 一. 初始化参数介绍
```javascript
 // pv 数据格式配置
export interface pageViewItem {
  path?: string|null, // 页面路径，第一匹配参数,来源于 pathname + search + hash;
  reg?: RegExp|null, // 判断唯一页面匹配正则，在不存在path时使用此配置
  data: string|object, // view点数据，data可直接传cid，也可传 {valLab, environment, cid} 格式对象，对齐灵犀参数
}
// click 上报配置
export interface clickConfig {
  encryptType?: number, // 默认0，加密类型，0 为不加密 1 为混淆加密，2 为压缩加密
  clickAttr?: string, // 默认 data-mc，click点数据存储的dom属性名
  clickData?: object, // 默认无，click点上报数据
  clickType?: number, // 默认0, 0 为上报目标节点及其所有父节点的数据，1 为点击元素必须为目标元素才会上报, 2 为仅上报最近的一个节点的数据(上报点击元素，或者最近的一个元素)
  clickCount?: number, // 默认0，click点上报限制次数，为0不限制，大于0为最大上报次数
  sendClickData?: Function, // click点数据上报回调, (已内置默认函数，可重写覆盖)
}
// view 上报配置
export interface viewConfig {
  encryptType?: number, // 默认0，加密类型，0 为不加密 1 为混淆加密，2 为压缩加密
  viewAttr?: string, // 默认 data-mv, view点数据存储的dom属性名
  viewData?: object, // 默认无，view点上报数据
  viewCount?: number, // 默认0，view点上报限制次数，为0不限制，大于0为最大上报次数
  viewDuration?: number, // 默认0，单位毫秒，元素在视口最少有效展示时长, 为0不限制，大于0为最低限制时长
  threshold?: number, // 默认0，可视区域的呈现比例，默认大于0开始上报
  selectors?: boolean | string | Element, // 默认true，DOM变化监视选择器，(默认值true)，如果不上报动态插入元素的view点请设置为false性能最佳，如果有要监听的区域请传入css 选择器或者dom
  root?: Element | null | undefined, // 默认值 null,指定根(root)元素，观察元素的视口。必须是目标元素的父级元素。如果未指定或者为null则默认为浏览器视窗
  sendViewData?: Function, // view点数据上报回调, (已内置默认函数，可重写覆盖)
}

// pv 上报配置
export interface pageViewConfig {
  pageViewData?: (pageViewItem | pageViewItem[]), // 默认无，仅支持对象或者对象的数组类型，若为对象数组表示此应用为SPA的单页应用，会开启url变更监听
  pageViewDuration?: number, // 默认0，单位毫秒，pv上报页面最低展示时长, 为0不限制，大于0为最低限制时长
  onUrlChange?: Function, // 页面初始化或者页面url路径切换时调用, (已内置默认回调，可重写覆盖)
  sendPageViewData?: Function, // pageview点数据上报回调, (已内置默认函数，可重写覆盖)
}

// 全局 config 配置
export interface Config extends clickConfig, viewConfig, pageViewConfig {
  debug?: boolean, // 默认false, 是否开启打印debug日志
  encryptType?: number, // 默认0，加密类型，0 为不加密 1 为混淆加密，2 为压缩加密
  closeAutoPV: boolean, // 关闭自动上报 PV，默认 false
  closeAutoMV: boolean, // 关闭自动上报 MV，默认 false
  closeAutoMC: boolean, // 关闭自动上报 MC，默认 false
}

// 非单页应用配置示例
const options: Config = {   
    debug: true, // 开启debug调试模式  
    encryptType: 1, // 打点数据开启混淆加密   
    pageViewData: { data: 'c_dianping_nova_citycalender' } 
};
// 单页应用配置示例
const options: Config = {   
    debug: true, // 开启debug调试模式  
    encryptType: 1, // 打点数据开启混淆加密   
    pageViewData: [
      { path: 'content/list', data: {cid: 'c_dianping_nova_citycalender', valLab: {poi_id: '123456'}, environment: {env: 'App'}} },
      { reg: /^\/users\/(\d+)$/, data: 'c_dianping_nova_citycalender' },
      { reg: /^/design/(\w+)$/, data: function({ path }) {
        const [_, component ] = /^/design/(\w+)$/.match(path);
        return {
          cid: '',
          valLab: {
            component,
          }
        }
      } },
      { path: '/design/:component', data: { cid: '', valLab: { component: ':component' }} },
    ]
};
// 开启fish监听 
Fish.init(options);
```


## 二. 打点数据配置介绍
```javascript
   // click 点和 view 点可单独配置 config, 单独配置 config 优先级高于全局config配置，配置属性含义相同

   // click点配置属性及类型
   interface clickBaseConfig {
       clickCount?: number, 
       clickType?: number 
   }
    // view点配置属性及类型
   interface viewBaseConfig {
       viewCount?: number, 
       viewDuration?: number 
   }

    // click config 示例配置 
    const clickSetting = {
        clickCount: 1,
        clickType: 1,
    }

    // view  config 示例配置 
    const viewSetting = {
        viewCount: 3,  
        viewDuration: 0.5
    }

    // click 点上报数据示例
    const clickData = {
        valBid: "b_dianping_nova_citycolumn_operatetag_mv"
        valLab: {title: "pageName"}, 
        config: clickSetting
    }

    // view 点上报数据示例
    const viewData = {
        valBid: "b_dianping_nova_citycolumn_operatetag_mv"
        valLab: {title: "pageName"}, 
        config: viewSetting
    }

    // DOM注入打点配置数据
    <div {...attr({clickData, viewData})} >商户</div>
    
```
