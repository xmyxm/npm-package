<img width="48" height="48" src="https://p0.meituan.net/scarlett/44c5450f975edc59b8b744f258995ed26093.png" >

# 自动化打点上报工具 @dp/fish 介绍

```
一. 整体介绍: 
1. 采用声明式打点方案，通过DOM上的属性配置解决click点和view点和pageView点自动上报能力

2. 支持根据配置曝光时长和曝光面积占比以及上报次数来自动精确上报

3. 帮助用户脱离业务代码中繁琐的打点需求，做到解耦

4. 解决页面或模块各类 滑动、动画 或新增元素带来的打点监听开发成本问题

5. 跨平台支持单页应用，多页应用，react，vue，及静态页打点，且支持同构

6. 源代码体积较小；性能消耗小; gzip体积小于6k;

7. 兼容性可靠性满足目前大部分场景，已在线上稳定使用

8. 低迁移成本，旧的打点方案迁移过来可显著减少业务代码量，业务逻辑简单更清晰

9. 测试友好，通过debug开关在控制台随时看到数据的上报时机和上报结果

10. 支持根据配置的曝光时长和曝光区域占比长自动进行模块曝光点精确上报

11. 灵活的参数配置实现全场景打点精确上报策略，参数配置支持如下：
      a.click点和view点上报次数限制，支持单个打点或全局打点配置
      b.视口内view点元素曝光面积占比配置，支持单个view点或全局打点配置
      c.视口内view点元素曝光最短有效时间配置，支持单个view点或全局打点配置
      d.页面最低展示时长pv点上报配置，支持单个或全局配置
      e.支持单页应用多PV点上报配置，根据页面切换自动上报PV数据
      f.打点配置数据支持加密与压缩加密两种方式，避免敏感数据泄露

12. 拓展能力
      a.可配置模块点击，曝光，页面浏览行为的回调函数，实现如点击各模块唤起不同页面的能力
      b.我们也支持可在页面中只引入任意一种或多种监听能力，已实现不同需求
      c.fish打点可和各类自定义能力共存，享有各自独立配置

13. 沟通建议及时反馈，长期持续集成和迭代，欢迎一起共建

```

## 二. 安装
```bash
npm install --save @dp/fish
or
yarn add @dp/fish
```

## 三. 快速使用
### 1. react 项目
```javascript
import React, { Component } from "react"
import Fish, { attr } from "@dp/fish"

// 并初始化fish打点
Fish.init();
class Index extends Component {
    render() {
        const data = {
            clickData: "list_content_item_mc",// 可以只上报bid，也可上报业务数据： { valBid: "list_content_item_mc", valLab: { title: "商户名", poi_id: 1} }
            viewData: "list_content_item_mv", // 可以只上报bid，也可上报业务数据：{ valBid: "list_content_item_mv", valLab: { title: "商户名", poi_id: 1} }
        }
        return  <div className="demo" >
                    <div {...attr(data)} >商户</div>
                </div>
    }
}
```

### 2. vue 项目
```javascript
<template>
<div v-bind="attr(lxData)" >商户</div>
</template>
<script>
import Fish, { attr } from "@dp/fish"
// SPA单页应多PV配置，并初始化fish打点
Fish.init({pageViewData: [
  {path: '/content/guide/read' ,data: 'c_dianping_nova_citycalender'},
  {reg: /^\/users\/(\d+)$/ ,data: 'c_dianping_nova_user'},
]});
export default {
  name: 'Demo',
  data() {
    return {
      lxData: {
          clickData: "list_content_item_mc" ,
          viewData: "list_content_item_mv"
      },
    };
  }
};
</script>
```

### 3. html静态页 使用示例
```html
<script crossorigin="anonymous" src="//h5.51ping.com/app/dp-fish/js/fish.js"></script>
<div id="shop">商户</div>
<script type="text/javascript">
    // pv数据自动上报详细配置，并初始化fish打点
    Fish.init({pageViewData: { data: {cid: 'c_dianping_nova_citycalender',valLab: {movie_id: 123456}, environment: {cityid: 1}} }});
    var shopData = { clickData: 'shop_mc', viewData: 'shop_mv'};
    document.getElementById('shop').setAttribute('data-mc', Fish.dataToJson(shopData));
</script>
```

### 4. 手动上报打点
```javascript
import React, { Component } from "react"
import { fishClick, fishView, fishPV } from "@dp/fish"

// 并初始化fish打点
Fish.init();
class Index extends Component {
    btnClick() {
      // 手动上报点击点不带数据
      fishClick('c_dianping_nova_mc');
      // 手动上报点击点加业务数据
      fishClick({valBid: 'c_dianping_nova_mc', valLab: { title: '点评首页'}, options: {} });

      // 手动曝光不带数据
      fishView('c_dianping_nova_mv');
      // 手动曝光加业务数据
      fishView({valBid: 'c_dianping_nova_mv', valLab: { title: '点评首页'}, options: {} });

      // 手动pv不带数据
      fishPV('c_dianping_nova_p0bhksl');
      // 手动pv带业务数据
      fishPV({cid: 'c_dianping_nova_p0bhksl', valLab: { custom: {infrom:'index'} }, environment: {cityid: 1}});
    }

    render() {
        return  <div click={this.btnClick.bind(this)} className="demo" >
                    <div>商户</div>
                </div>
    }
}
```

### 5. 自定义使用
```javascript
import React, { Component } from "react"
import Fish, { attr } from "@dp/fish"

// 配置自定义处理函数，覆盖原打点上报函数
Fish.init({
  sendClickData: (res) => {
      // 自定义实现 模块跳转 或 唤起能力
      location.href = res.link; 
    },
  sendViewData: (res) => {
      // 自定义实现 用户浏览行为通知
      console.log('报告商户浏览通知' + res.shopName);
    },
  sendPageViewData: () => {},
});
class Index extends Component {
    render() {
        const data = {
            clickData: { link: "dianping://picassofinddetail?mainid=111" },// 
            viewData: { shopInfo: { shopName: '商家A', cityName: '城市A' } } // 
        }
        return  <div className="demo" >
                    <div {...attr(data)} >商户</div>
                </div>
    }
}
```

### 6. 部分能力使用
```javascript
import React, { Component } from "react"
import { initClick, initView, attr } from '@dp/fish';

// 配置自定义处理函数，覆盖原打点上报函数
class Index extends Component {
    componentDidMount() {
      initClick({
          clickAttr: 'data-click',
          sendClickData: function (res) { 
              console.log('自定义initClick捕获到数据：', res)
          }
      })
      initView({
          viewAttr: 'data-view',
          sendViewData: function (res) { 
              console.log('自定义initView捕获到数据：', res)
          }
      })
    }
    render() {
        const data = {
            clickData: { text: "点击数据" },// 
            viewData: { text: "曝光数据" } 
          } // 
        return  <div className="demo" >
                    <div {...attr(data)} >商户</div>
                </div>
    }
}
```

## 四. SDK链接

[@dp/fish各版本CDN链接地址](http://git.dianpingoa.com/v2/sh/projects/YAYAJING/repos/fish/browse?branch=master&path=docs/sdk.version.md)

## 五. 打点参数介绍

属性 | 类型 | 必传 | 说明 
-|-|-|-
clickData | string/object/null | 否 | 可以直接传 click 点的 valBid，也可以传灵犀参数对象，例如：{valBid, valLab, options})
viewData  | string/object/null | 否 | 可以直接传 view 点的 valBid，也可以传灵犀参数对象，例如：{valBid, valLab, options})

## 六.更多高级功能和特性
1. [参数配置教程说明文档](http://dev.sankuai.com/code/repo-detail/YAYAJING/fish/file/detail?branch=master&codeArea=sh&sourceRepo=YAYAJING%2Ffish&target=refs%2Fheads%2Fmaster&targetRepo=YAYAJING%2Ffish&path=docs%2Foption.md)
1. [自定义监听能力接入文档](http://dev.sankuai.com/code/repo-detail/YAYAJING/fish/file/detail?branch=master&codeArea=sh&sourceRepo=YAYAJING%2Ffish&target=refs%2Fheads%2Fmaster&targetRepo=YAYAJING%2Ffish&path=docs%2Fcustom.md)
2. [开发者说明文档](http://dev.sankuai.com/code/repo-detail/YAYAJING/fish/file/detail?branch=master&codeArea=sh&sourceRepo=YAYAJING%2Ffish&target=refs%2Fheads%2Fmaster&targetRepo=YAYAJING%2Ffish&path=docs%2FDEV.md)

## 七. 兼容性
```
1. 兼容到 ios4.0 android2.3 
2. view点动态插入dom节点的自动上报能力兼容到 ios6.1 及 android 4.4 
```

## 八. 竞品分析
[竞品分析详情](https://km.sankuai.com/page/295080539)

## 九. 自动化打点展示
<video src="https://1251413404.vod2.myqcloud.com/vodgzp1251413404/5285890792884877453/HoTeRy7AaqMA.mp4" width="768" height="460"
controls="controls"></video>

## 十. 扫一扫体验自动化打点
<img src="https://p0.meituan.net/scarlett/f1da476d59f719f0ca904feb458ea3ad12980.png">


## 十一. 如何联系客服
<img src="https://p0.meituan.net/scarlett/a4486f3d08138a72b2003571e575351416189.jpg">
