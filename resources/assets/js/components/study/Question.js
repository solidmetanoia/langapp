// Question.js

import React, {Component} from 'react';

export default class Question extends Component {
	render(){
		let example = null;
		if(this.props.data.example != null){
			example = <div className='h1 p-2'>{this.props.data.example}</div>;
		}
		let cardFooter = [];
		
		if(this.props.data.type != null){
			if(this.props.data.type == 'text' || this.props.data.type == 'input'){
				cardFooter = <input type='text' className='form-control flex-1 bg-success text-light text-center'></input>;
			} else if(this.props.data.type == 'button'){
				this.props.data.answers.map((answer, index)=>{
					cardFooter.push(<button key={index} className='btn btn-success border-primary flex-1 text-center text-light rounded-0'>{answer}</button>);
				});
			}
		}
		return (
			<div className='d-flex flex-column text-center flex-grow-1 w-100'>
				<div className='p-2 bg-secondary'><div className='h2'>{this.props.type}</div></div>
				<div className='flex-center flex-column flex-grow-1'>
					<div className='flex-center flex-column flex-grow-7'>
						<div className='display-1'>{this.props.data.title}</div>
						<div/>
						{example}
					</div>
					<div className='bg-secondary h2 p-2 m-0 flex-column flex-center flex-grow-1'>{this.props.data.required}</div>
					<div className='flex-center bg-primary flex-grow-4 p-1'>
						{cardFooter}
					</div>
				</div>
				<div className='p-2 bg-secondary'><div className='h2'>{this.props.type}</div></div>
			</div>
		)
	}
}