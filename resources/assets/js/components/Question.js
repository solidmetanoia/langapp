// Question.js

import React, {Component} from 'react';

export default class Question extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		}

		this.handleAnswer = this.handleAnswer.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	componentDidMount() {
		var self = this;
		if(self.props.data){
			self.setState({loading: false}); 
		}		
	}

	handleAnswer(data){
		console.log(this.props.data);
		console.log(data.target.value);
		let output = {
			question: this.props.data.correct.id,
			answer: data.target.value
		};
		console.log(output);
		// Change value into a full answer here.
        // this.props.onChangeCallback(data);   
    }

    handleKeyPress(e){
		if (e.key === 'Enter') {
			this.handleAnswer(e);
		}   
    }

	render(){
		if(this.state.loading){
			return <div className="text-center"><div className="h3">Loading...</div></div>
		} else {
			let data = this.props.data;
			let example = null;
			console.log("DATA");
			console.log(data);

			if(data.example != null){
				example = <div className='h1 p-2'>{data.example}</div>;
			}
			console.log("DATA CORR");
			console.log(data.correct)
			if(data.correct.example_ja != null){
				example = <div className='h1 p-2' dangerouslySetInnerHTML={{__html: data.correct.example_ja}} />;
			}
			let cardFooter = [];

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
							<div className='display-1'>{this.props.data.correct.word || this.props.data.title}</div>
							{example}
						</div>
						<div className='bg-secondary h2 p-2 m-0 flex-column flex-center flex-grow-1'>{this.props.data.correct.required}</div>
						<div className='flex-center bg-primary p-1'>
							{cardFooter}
						</div>
						<div className='display-4 flex-center flex-column flex-grow-3'>
							{this.props.data.correct.type}
						</div>
					</div>
					<div className='p-2 bg-secondary'><div className='h2'>{this.props.type}</div></div>
				</div>
			)
		}
	}
}