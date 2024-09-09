import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory, createHashHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import VConsole from 'vconsole/dist/vconsole.min';
import Fish from '@dp/fish';
import loadComponent from './component/loadComponent.js';

const Index = loadComponent(() => import(/* webpackChunkName: "app-index" */'./page/index.js'));
const Home = loadComponent(() => import(/* webpackChunkName: "app-home" */'./page/home.js'));
const List = loadComponent(() => import(/* webpackChunkName: "app-list" */'./page/list.js'));
const Detail = loadComponent(() => import(/* webpackChunkName: "app-detail" */'./page/detail.js'));
const Lab = loadComponent(() => import(/* webpackChunkName: "app-lab" */'./page/lab.js'));
const Intersection = loadComponent(() => import(/* webpackChunkName: "app-lab" */'./page/intersection.js'));

const isBrowser = false;
const history = isBrowser ? createBrowserHistory() : createHashHistory({ hashType: 'noslash' });//设置省略前导斜杠
new VConsole();
const { pathname } = window.location;
const pageViewData = [
  { path: isBrowser ? '/index' : pathname + '#index', data: 'cid_1' }, // { valLab: { title: '首页' }, cid: 'cid_1' }
  { path: isBrowser ? '/list' : pathname + '#list', data: { valLab: { title: '列表页' }, cid: 'cid_2', category: 'category_list' } },
  { path: isBrowser ? '/detail' : pathname + '#detail', data: { valLab: { title: '详情页' }, cid: 'cid_3', category: 'category_detail', environment: { uid: '948623778882311' } } },
  { path: isBrowser ? '/home' : pathname + '#home', data: { valLab: { title: '弹层页' }, cid: 'cid_4', category: 'category_home' } },
  { path: isBrowser ? '/lab' : pathname + '#lab', data: { valLab: { title: '实验室' }, cid: 'cid_5', category: 'category_lab' } },
  { path: isBrowser ? '/intersection' : pathname + '#intersection', data: { valLab: { title: 'IntersectionObserver API 测试' }, cid: 'cid_6', category: 'category_intersection' } },
];
Fish.init({
  debug: true,
  encryptType: 0,
  clickCount: 0,
  clickData: { valLab: { title: 'MC全局标题', custom: {abTest: 'AB测试', tag_id: 10000000}}},
  viewData: { valLab: { title: 'MV全局标题', custom: {abTest: 'AB测试', tag_id: 10000000}}},
  threshold: 0.5,
  viewCount: 0,
  viewDuration: 0,
  pageViewDuration: 0,
  pageViewData,
});

// Fish.initPageView({
//   pageViewData,
//   pageViewDuration: 0,
//   onUrlChange: function (res) { console.log('自定义initPageView打开页面', res) },
//   sendPageViewData: function (res) {console.log('自定义initPageView发送数据', res) }
// })

ReactDOM.render(
  <Router history = {history}>
    <div className = "app-box">
      <Switch>
        <Route path="/index" exact component = {Index} ></Route>
        <Route path="/home" component = {Home} ></Route>
        <Route path="/list" component = {List} ></Route>
        <Route path="/lab" component = {Lab}></Route>
        <Route path="/detail" component={Detail} ></Route>
        <Route path="/intersection" component = {Intersection} ></Route>
        <Redirect to={ isBrowser ? "/index" : "index"} />
      </Switch>
    </div>
  </Router>,
  document.querySelector('#main'),
);
