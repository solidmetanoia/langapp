// Question.js

import React, {Component} from 'react';

export default class Question extends Component {
	render(){
		let example = null;
		if(this.props.data.example != null){
			example = <h3>{this.props.data.example}</h3>;
		}
		let cardFooter = [];
		
		if(this.props.data.answers != null){
			this.props.data.answers.map((answer, index)=>{
				cardFooter.push(<button key={index} className='btn btn-primary text-light m-1'>{answer}</button>);
			});
		} else if(this.props.data.type != null){
			if(this.props.data.type == 'text' || this.props.data.type == 'input'){
				cardFooter = <input type='text' className='form-control bg-success text-light text-center m-1'></input>;
			}
		}
		return (
			<div className='d-flex flex-column text-center'> 
				<div className=''>
					<h1 className=''>{this.props.data.title}</h1>
					{example}
				</div>
				<div className='bg-secondary'>{this.props.data.required}</div>
				<div className=''>
					{cardFooter}
				</div>
			</div>
		)
	}
}