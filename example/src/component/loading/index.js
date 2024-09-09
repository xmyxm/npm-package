import React,{Component} from 'react';
import './index.less';

export default class Loading extends Component{
	render(){
		return (
			<div className = "loading-box">
				<div className = "bg" >
					加载中...
				</div>
			</div>)
	}
}
