// Question.js

import React, {Component} from 'react';

export default class Question extends Component {
	render(){
		let example = null;
		if(this.props.data.example != null){
			example = <div className='h1 p-2'>{this.props.data.example}</div>;
		}
		if(this.props.data.example_ja != null){
			example = <div className='h1 p-2' dangerouslySetInnerHTML={{__html: this.props.data.example_ja}} />;
		}
		let cardFooter = [];
		console.log(this.props.data);

		switch(this.props.data.answer_type){
			case 'button':
				this.props.data.answers.map((answer, index)=>{
					cardFooter.push(<button key={index} className='btn btn-success border-primary flex-1 text-center text-light rounded-0'>{answer}</button>);
				});
				break;
			case 'text':
			case 'input':
			default:
				cardFooter = <input type='text' className='form-control form-control-lg flex-1 bg-success text-light text-center'></input>;
				break;
		}
		
		return (
			<div className='d-flex flex-column text-center flex-grow-1 w-100'>
				<div className='p-2 bg-secondary'><div className='h2'>{this.props.type}</div></div>
				<div className='flex-center flex-column flex-grow-1'>
					<div className='flex-center flex-column flex-grow-7'>
						<div className='display-1'>{this.props.data.title || this.props.data.word}</div>
						{example}
					</div>
					<div className='bg-secondary h2 p-2 m-0 flex-column flex-center flex-grow-1'>{this.props.data.required}</div>
					<div className='flex-center bg-primary p-1'>
						{cardFooter}
					</div>
					<div className='display-4 flex-center flex-column flex-grow-3'>
						{this.props.data.type}
					</div>
				</div>
				<div className='p-2 bg-secondary'><div className='h2'>{this.props.type}</div></div>
			</div>
		)
	}
}