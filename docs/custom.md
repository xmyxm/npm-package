
# 自定义功能

## 一. 方案一（我们提供了按需引入的能力，比较适合打点自动上报，页面点击自动唤起等能力）
```javascript
import initClick from '@dp/fish/build/es/core/click-listener'
import initView from '@dp/fish/build/es/core/view-listener'
import initPageView from '@dp/fish/build/es/core/page-listener'
// 如果只使用其中一项功能建议使用以上引入方式以减少体积， 如果是使用功能较多可如下全量引入
import {initClick, initView, initPageView, dataToJson} from '@dp/fish'

// 配置监听DOM节点的属性，在发生click点击、view展示在视口内及页面切换时触发回调拿到配置数据
export class Index extends Component {
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
      const pageViewData = [{ path: '/index', data: { valLab: { title: '首页' }, cid: 'cid_1' } },{ path: '/list', data: { valLab: { title: '列表页' }, cid: 'cid_2' } }]
      initPageView({
        pageViewData,
        pageViewDuration: 0,
        onUrlChange: function (res) { console.log('自定义initPageView打开页面', res) },
        sendPageViewData: function (res) {console.log('自定义initPageView发送数据', res) }
      })
    }
    render() {
        let { visible, title, message, leftText, rightText} = this.state

        return (
            <div
                className="confirm-main"
                data-click={dataToJson({ content: '测试我们的 data-click' })}
                data-view={dataToJson({content: '测试我们的 data-view'})} 
            >
            </div>
        )
    }
}

```


## 二. 方案二
```javascript
import Fish from '@dp/fish'

// 配置监听DOM节点的属性，在发生click点击、view展示在视口内及页面切换时触发回调拿到配置数据
export class Index extends Component {
    componentDidMount() {
      const pageViewData = [{ path: '/index', data: { valLab: { title: '首页' }, cid: 'cid_1' } },{ path: '/list', data: { valLab: { title: '列表页' }, cid: 'cid_2' } }]
      Fish.init({
        debug: true,
        encryptType: 2, // 开启打点数据压缩加密
        clickAttr: 'data-click',
        viewAttr: 'data-view',
        sendClickData: function(res){ console.log('自定义initClick捕获到数据：', res) },
        sendViewData: function(res){ console.log('自定义initView捕获到数据：', res) },
        onUrlChange: function (res) { console.log('自定义initPageView打开页面', res) },
        sendPageViewData: function (res) {console.log('自定义initPageView发送数据', res) }
        pageViewData,
      });
    }

    render() {
        let { visible, title, message, leftText, rightText} = this.state

        return (
            <div
                className="confirm-main"
                data-click={Fish.dataToJson({ content: '测试我们的 data-click' })}
                data-view={Fish.dataToJson({content: '测试我们的 data-view'})} 
            >
            </div>
        )
    }
}
```
## 三. 说明
1. 在使用以上自定义配置时，参数都为非必传，参数根据需要传入即可，功能皆可配
2. [参数配置教程说明文档](http://git.dianpingoa.com/v2/sh/projects/YAYAJING/repos/fish/browse?branch=master&path=docs/option.md)
