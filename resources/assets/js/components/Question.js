// Question.js

import React, {Component} from 'react';
import wanakana, {bind, toHiragana} from 'wanakana';

export default class Question extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: null,
			correct: null,
			answer: null,
			message: null,
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
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.quickButton = this.quickButton.bind(this);
	}

	handleAnswer(e){
		let output = {
			question: this.state.data.correct.id,
			type: this.state.data.answer_type,
			required: this.state.data.required,
			answer: e.target.value,
		};
		this.setState({answered: e.target.value, message: null});
		e.persist();
		e.target.disabled = true;

		axios.post('/api/'+this.props.language+'/'+this.props.type, output, {
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer '+localStorage.getItem('access_token')
				}
			})
			.then((response) => {
				if(response.status == 200){
					// Load new card
					if(response.data.status == 'success')
						this.setState({correct: true});
					else if (response.data.status == 'fail')
						this.setState({correct: false})
					else if (response.data.status == 'context'){
						e.target.disabled = false;
					}
					this.setState({message: response.data.message})
					// this.getNextItem(this.props.language, this.props.type);
				}
			})
			.catch((error) => {
				console.log(error);
				e.target.disabled = false;
			});
	}

	handleKeyDown(e){
		if (e.keyCode === 13) {
			if(this.state.data.required == 'reading')
				e.target.value = toHiragana(e.target.value);
			this.handleAnswer(e);
		}
	}

	quickButton(e){
		if(this.state.data.answer_type == 'button'){
			if([49,50,51,52,53,54,81,87,69].includes(e.keyCode)) {
				console.log(e);
				let buttons = {
					49: 0,
					50: 1,
					51: 2,
					52: 3,
					53: 4,
					54: 5,
					81: 3,
					87: 4,
					69: 5
				};
				document.querySelectorAll('input[type="button"]')[buttons[e.keyCode]].click();
			}
		}
	}

	componentDidMount(){
		document.addEventListener("keydown", this.quickButton, false);
	}
	componentWillUnmount(){
		document.removeEventListener("keydown", this.quickButton, false);
	}

	componentWillReceiveProps(nextProps){
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
				this.setState({data: response.data, correct: null, answered: null});
			}
		})
		.catch((error) => {
			// Default data used to check if something changed.
			this.setState({data: this.state.defaultData, correct: null});
			console.log(error);
		});
	}

	render(){
		if(this.state.data == null){
			return <div className="text-center"><div className="h3">Loading...</div></div>
		} else {
			let data = this.state.data;
			let example, information, required, required_color = null;
			let answerArea = [];

			information = (
				<div>
					<hr/>
					<div className='h3 p-2' dangerouslySetInnerHTML={{__html: data.correct.example_en}} />
				</div>
			);

			switch (this.state.data.required) {
				case 'meaning': required_color = 'bg-secondary'; break;
				case 'reading': required_color = 'bg-primary text-white'; break;
				default: required_color = 'bg-warning'; break;
			}

			required = (
				<div className={required_color +' h3 p-2 m-0 flex-column flex-center'}>
					{this.state.correct == null ?
						(this.state.data.required || "Answer type missing"):
					 	this.state.data.correct.meaning
					}
				</div>
			);

			if(data.example != null){
				example = <div className='h3 p-2'>{data.example}</div>;
			}

			if(data.correct.example_ja != null){
				example = <div className='h3 p-2' dangerouslySetInnerHTML={{__html: data.correct.example_ja}} />;
			}

			if(this.state.correct == null){
				switch(data.answer_type){
					case 'button':
						answerArea =
						<div>
							<div className="flex-1 d-none d-lg-flex flex-center flex-column flex-all-even">
								<div className='flex-center bg-primary p-1 flex-wrap'>
									{data.answers.map((answer, index)=>{
										return <input type='button' key={100+index} value={answer.meaning || answer} onClick={this.handleAnswer} className='btn btn-lg btn-success border-primary flex-1 text-center text-light rounded-0'></input>;
									})}
								</div>
							</div>
							<div className='d-md-block d-lg-none bg-primary p-1'>
								{data.answers.map((answer, index)=>{
									return <input type='button' key={200+index} value={answer.meaning || answer} onClick={this.handleAnswer} className='btn btn-lg btn-success border-primary text-center text-light rounded-0 col-4'></input>;
								})}
							</div>
						</div>;
						break;
					case 'text':
					case 'input':
					default:
						if(this.state.data.required == 'reading'){
							answerArea = <input type='text' autoFocus placeholder='・・・' key={34} ref={elem => bind(elem)} onKeyDown={this.handleKeyDown} className='form-control form-control-lg bg-success text-light text-center pm0 flex-grow-1 flex-center'></input>;
						}
						else{
							answerArea = <input type='text' autoFocus placeholder='・・・' key={35} onKeyDown={this.handleKeyDown} className='form-control form-control-lg bg-success text-light text-center pm0 flex-grow-1 flex-center'></input>;
						}
						break;
				}
			} else {
				answerArea = <input type='button' autoFocus key={63} onClick={() => { this.setState({message: null}); this.getNextItem() }} value="next" className={((this.state.correct)?'btn-success-alt':'btn-warning-alt')+' btn btn-lg border-primary pm0 text-center text-white rounded-0 flex-grow-1 flex-center'}></input>
			}

			return (
				<div className='d-flex flex-column text-center flex-grow-1 flex-basis-0 w-100'>
					<div className='h2 p-2 m-0 bg-secondary d-smh-none flex-column flex-center flex-1'>{this.props.type}</div>
					<div className='flex-center flex-column flex-grow-9'>
						<div className='flex-center flex-column flex-1'>
							<div className={this.state.correct == null ? 'display-1' : 'display-3'}>{this.state.data.correct.word || "Word missing"}</div>
							{this.state.correct != null &&
								<div className='h3 pm0'>{this.state.data.correct.reading}</div>
							}
							{example}
							{this.state.correct != null &&
								information
							}
						</div>
					</div>
					<div className='h4 m-0 d-flex flex-column flex-grow-3 flex-basis-0'>
						{answerArea}
						<div className='d-flex flex-row flex-1 flex-all-even'>
							<div className='flex-center flex-column'>
								{this.state.data.correct.type || "Word type missing"}
							</div>
							{required}
							<div className={(this.state.correct == false ? 'bg-warning-alt' : '') +' flex-column flex-center'}>
								{this.state.correct == false ? <s>{this.state.answered}</s> : null}
							</div>
						</div>
					</div>
					<div className='bg-secondary flex-grow-1 h4 p-0 m-0 flex-column flex-center'>
						{this.state.message || '　'}
					</div>
				</div>
			)
		}
	}
}
