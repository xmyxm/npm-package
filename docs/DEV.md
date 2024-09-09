开发者使用介绍

### 一. 打包@dp/fish
```bash
  npm run fish:build
  ax publish
```
### 二. 安装和启动demo
```bash
  git clone ssh://git@git.dianpingoa.com/yayajing/fish.git
  cd fish
  npm run init
  npm run start:demo
```

### 三. url变更监听问题及方案
```
1.处理单页应用页面切换事件监听：
    a. history.pushState() 或者 history.replaceState() 不会触发 popstate 事件。 
 popstate 事件只会在浏览器某些行为下触发， 比如点击后退、前进按钮(或者在JavaScript中调用history.back()、history.forward()、history.go()方法
    b. 不同的浏览器在加载页面时处理popstate事件的形式存在差异。页面加载时Chrome和Safari通常会触发(emit )popstate事件，但Firefox则不会
    c. react的 History 包中处理页面跳转时区分 hashHistory 与 browserHistory，如果是 browserHistory 路由则采用 globalHistory.pushState({ key, state }, null, href) 或 globalHistory.replaceState({ key, state }, null, href) 的方式来处理跳转，如果是 hashHistory 路由则采用 window.location.hash = path 或 window.location.replace(stripHash(window.location.href) + '#' + path) 的方式来处理跳转，对应源码地址：https://github.com/ReactTraining/history/blob/master/modules/createBrowserHistory.js
    d. 浏览器hash变更是会触发 popstate 事件，不论是浏览器前进或者后退或者 location.hash = 'index'都能触发
```
```javascript
// history劫持
(function(history){
    var pushState = history.pushState;
    history.pushState = function(state) {
        if (typeof history.onpushstate == "function") {
            history.onpushstate({state: state});
        }
        return pushState.apply(history, arguments);
    };
})(window.history);
history.onpushstate = function(e) {
    console.log('pushed');
}
```
### 四. IntersectionObserver兼容性问题调研与处理方案
```
2.IntersectionObserver Api 兼容性问题处理
  PC端:
  a.不兼容IE，Edge兼容15及以上版本 
  b.Firefox 兼容55及以上版本
  c.Chrome 兼容51及以上版本
  d.Safari 兼容12.1及以上版本
  移动端:
  a.iOS Safari 兼容到12.2及以上版本
  b.android Browser 兼容 android5 及以上版本
  c.Chrome for Android 兼容到 80 及以上版本
采用其 polyfill 解决兼容性问题 https://github.com/w3c/IntersectionObserver/tree/master/polyfill
  a.IE兼容到7及以上版本，Edge 全系支持
  b.chrome 全系支持
  c.Firefox 全系支持
  d.iOS Safari 兼容到6及以上版本
  e.android Browser 兼容 android4.4 及以上版本
  f.Opera 全系支持
```

### 五. MutationObserver 兼容性调研
```
3.MutationObserver Api 兼容性
  PC端:
  1.IE 兼容11及以上版本, Edge 全系支持
  2.Firefox 兼容14及以上版本
  3.Chrome 兼容51及以上版本
  4.Safari 兼容6及以上版本
    移动端:
  1.iOS Safari 兼容到6.1及以上版本
  2.android Browser 兼容 android4.4 及以上版本
  3.Chrome for Android 兼容到 80 及以上版本
  整体兼容性比较优秀
```


## 六. 灵犀上报API说明
```
1. 在上报view点数据较多时会采用post的方式，访问域名：http://report.meituan.com，上报view点数据较少时采用get方式，访问域名：http://wreport.meituan.net/
2. 灵犀文档 https://docs.sankuai.com/lx/web/conceptions/
```
