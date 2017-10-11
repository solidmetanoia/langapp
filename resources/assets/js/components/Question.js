// Question.js

import React, {Component} from 'react';

export default class Question extends Component {
	constructor(props) {
		super(props);

		this.handleAnswer = this.handleAnswer.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleAnswer(data){
		console.log(this.props.data);
		console.log(data.target.value);
		// Change value into a full answer here.
        // this.props.onChangeCallback(data);   
    }

    handleKeyPress(e){
		if (e.key === 'Enter') {
			this.handleAnswer(e);
		}   
    }

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
					cardFooter.push(<input type='button' key={index} value={answer.meaning || answer} onClick={this.handleAnswer} className='btn btn-success border-primary flex-1 text-center text-light rounded-0'></input>);
				});
				break;
			case 'text':
			case 'input':
			default:
				cardFooter = <input type='text' onKeyPress={this.handleKeyPress} className='form-control form-control-lg flex-1 bg-success text-light text-center'></input>;
				break;
		}
		
		return (
			<div className='d-flex flex-column text-center flex-grow-1 w-100'>
				<div className='p-2 bg-secondary'><div className='h2'>{this.props.type}</div></div>
				<div className='flex-center flex-column flex-grow-1'>
					<div className='flex-center flex-column flex-grow-7'>
						<div className='display-1'>{this.props.data.word || this.props.data.title}</div>
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