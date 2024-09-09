import React, { Component } from "react"
import Header from "../component/header/index";
import ReactDOM from 'react-dom';
import "../style/mutation.less";

class Mutation extends Component {
  constructor(options) {
    super(options)
    this.observer = null;
    this.state = {
      attrList: [
        { name: 'childList', val: true, checked: false, info: '设为 true 以监视目标节点（如果 subtree 为 true，则包含子孙节点）添加或删除新的子节点。默认值为 false' },
        { name: 'subtree', val: true, checked: false, info: '设为 true 以将监视范围扩展至目标节点整个节点树中的所有节点。MutationObserverInit 的其他值也会作用于此子树下的所有节点，而不仅仅只作用于目标节点。默认值为 false' },
        { name: 'attributeFilter', val: ["data-mv"], checked: false, info: '要监视的特定属性名称的数组。如果未包含此属性，则对所有属性的更改都会触发变动通知。无默认值' },
        { name: 'attributes', val: true, checked: false, info: '设为 true 以观察受监视元素的属性值变更。默认值为 false' },
        { name: 'characterData', val: true, checked: false, info: '设为 true 以监视指定目标节点或子节点树中节点所包含的字符数据的变化。无默认值' },
        { name: 'attributeOldValue', val: true, checked: false, info: '当监视节点的属性改动时，将此属性设为 true 将记录任何有改动的属性的上一个值。有关观察属性更改和值记录的详细信息。无默认值' },
        { name: 'characterDataOldValue', val: true, checked: false, info: '设为 true 以在文本在受监视节点上发生更改时记录节点文本的先前值。无默认值' },
      ],
      eleList: [],
      content: '',
    }
  }

  componentDidMount() {
    function callback(mutationList) {
      console.log('MutationObserver callback', mutationList);
    }
    this.observer = new MutationObserver(callback);
  }

  clickAddEle() {
    const { eleList } = this.state;
    eleList.push(eleList.length);
    this.setState({ eleList });
  }

  clickClearText() {
    this.setState({ content: '' });
  }

  clickUPText() {
    this.setState({ content: Date.now() });
  }

  clickCheckbox(event) {
    const { attrList } = this.state;
    const options = {};
    attrList.forEach(item => { 
      if (item.name === event.target.value) item.checked = event.target.checked;
      if (item.checked) options[item.name] = item.val;
    })
    this.setState({ attrList });
    this.observer.disconnect();
    this.observer.observe(document.body, options);
  }

  render() {
    const { attrList, eleList, content } = this.state;
    return (
      <React.Fragment>
        <Header title={"mutation API测试"} borderBottom bg ></Header>
        <div className="mt-box">
          <div className="title">observe参数选择：</div>
          <div className="attr-list">
            {
              attrList.map(item => { 
                return <React.Fragment key={item.name}>
                          <div className="attr-item">
                          <input onChange={this.clickCheckbox.bind(this)} checked={item.checked} className="checkbox-item" type="checkbox" value={item.name}/>
                          <span className="attr-text">{item.name}</span>
                          </div>
                          <div className="text-gery">{item.info}</div>
                        </React.Fragment>
              })
            }
          </div>
          <div className="note-gery">备注：增删文本节点的回调是无法在配置参数中过滤</div>
          <div className="btn-list">
            <div onClick={this.clickAddEle.bind(this)} className="btn-item">添加子元素</div>
            <div onClick={this.clickUPText.bind(this)} className="btn-item">修改文字节点</div>
            <div onClick={this.clickClearText.bind(this)} className="btn-item">清除文字节点</div>
          </div>
          <div className="text-box">{ content }</div>
          <div className="ele-list">
            {
              eleList.map((num) => { 
                return <div key={num} data-mv={`mv:${num}`} data-mc={`mc:${num}`} className="ele-item">{ num }</div>
              })
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<Mutation />, document.querySelector('#main'));