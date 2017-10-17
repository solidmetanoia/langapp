// Question.js

import React, {Component} from 'react';
	
export default class Question extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: null,
			correct: null,
			defaultData: {
				"correct": {
					"word": "TEST",
					"meaning": "TEST MEANING",
					"type": "NONE",
					"reading": "\u305d\u308c",
					"example_ja": "A TEST SENTENCE",
					"example_en": "MEANING TEST SENTENCE",
				},
				"answer_type": "input",
			}
		};

		this.getNextItem = this.getNextItem.bind(this);

		this.getNextItem(this.props.language, this.props.type);

		this.handleAnswer = this.handleAnswer.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleAnswer(data){
		let output = {
			question: this.state.data.correct.id,
			answer: data.target.value
		};

		axios.post('/api/'+this.props.language+'/'+this.props.type, output, {
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer '+localStorage.getItem('access_token')
				}
			})
			.then((response) => {
				console.log(response);
				if(response.status == 200){
					// Load new card
					if(response.data.status == 'success')
						this.setState({correct: true});
					else if (response.data.status == 'fail')
						this.setState({correct: false})
					// this.getNextItem(this.props.language, this.props.type);
				}
			})
			.catch((error) => {
				console.log(response);
			});
	}

	handleKeyPress(e){
		if (e.key === 'Enter') {
			this.handleAnswer(e);
		}   
	}

	componentWillReceiveProps(nextProps){
		console.log(nextProps);
		if(this.props != nextProps){
			this.getNextItem(nextProps.language, nextProps.type);
		}
	}	

	getNextItem(language = this.props.language, type = this.props.type){
		axios.get('/api/'+language+'/'+type, {
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer '+localStorage.getItem('access_token')
			}
		})
		.then((response) => {
			if(response.status == 200){
				this.setState({data: response.data, correct: null});
			}
		})
		.catch((error) => {
			// Default data used to check if something changed.
			this.setState({data: this.state.defaultData, correct: null});
			console.log(error.response);
		});
	}

	render(){
		if(this.state.data == null){
			return <div className="text-center"><div className="h3">Loading...</div></div>
		} else {
			let data = this.state.data;
			let example = null;
			let cardFooter = [];

			if(data.example != null){
				example = <div className='h3 p-2'>{data.example}</div>;
			}

			if(data.correct.example_ja != null){
				example = <div className='h3 p-2' dangerouslySetInnerHTML={{__html: data.correct.example_ja}} />;
			}

			if(this.state.correct == null){
				switch(data.answer_type){
					case 'button':
						data.answers.map((answer, index)=>{
							cardFooter.push(<input type='button' key={index} value={answer.meaning || answer} onClick={this.handleAnswer} className='btn btn-success border-primary flex-1 text-center text-light rounded-0'></input>);
						});
						break;
					case 'text':
					case 'input':
					default:
						cardFooter = <input type='text' key={34} onKeyPress={this.handleKeyPress} className='form-control form-control-lg flex-1 bg-success text-light text-center'></input>;
						break;
				}
			} else {
				cardFooter = <input type='button' key={63} onClick={() => { this.getNextItem() }} value="next" className={((this.state.correct)?'btn-success-alt':'btn-warning-alt')+' btn border-primary flex-1 text-center text-white rounded-0'}></input>
			}

			return (
				<div className='d-flex flex-column text-center flex-grow-1 w-100'>
					<div className='p-2 bg-secondary'><div className='h2'>{this.props.type}</div></div>
					<div className='flex-center flex-column flex-grow-1'>
						<div className='flex-center flex-column flex-grow-7'>
							<div className='display-1'>{this.state.data.correct.word || "Word missing"}</div>
							{example}
							{this.state.correct != null &&
								<div className='h3 p-2' dangerouslySetInnerHTML={{__html: data.correct.example_en}} />
							}
						</div>
						<div className='bg-secondary h2 p-2 m-0 flex-column flex-center flex-grow-1'>{this.state.data.correct.required || "meaning"}</div>
						<div className='flex-center bg-primary p-1'>
							{cardFooter}
						</div>
						<div className='display-4 flex-center flex-column flex-grow-2'>
							{this.state.data.correct.type || "Word type missing"}
						</div>
					</div>
					<div className='p-2 bg-secondary'><div className='h2'>{this.props.type}</div></div>
				</div>
			)
		}
	}
}