// LearnApp.js

import React, {Component} from 'react';
import { Router, Route, NavLink } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Question from './components/Question';

export default class LearnApp extends Component {
	constructor() {
		super();

		this.state = {
			data: {},
			meaning: {title: '空', required: 'meaning', answers: ['sky', 'ground', 'jacket', 'impossible', 'free', 'life']},
			meaningwithex: {title: '空', example: '空に飛びたい', required: 'meaning', answers: ['sky', 'ground', 'jacket', 'impossible', 'free', 'life']},
			reading: {title: '空', required: 'reading', type: "text"},
			listening: {title: '空', required: 'pronunciation', answers: ['そら', 'つち', 'うわぎ', 'むり', 'むりょう', 'せい']},
			reverse: {title: 'sky', required: 'reading', answers: ['空', '土', '上着', '無理', '無料', '生']},
		};
	}

	render(){
		return (
			<div className='bg-success text-light app d-flex flex-column flex-md-row'>
				<Header className='d-md-none text-center'/>
				<div className='d-flex flex-row flex-grow-1'>
					<Sidebar className='d-none d-md-block'/>
					<div className='d-flex flex-column flex-grow-1 text-center align-items-center justify-content-center'>
						<Route exact path='/learn' component={PreSelect}/>
						<Route path='/learn/:language/:question' component={DisplayJapaneseQuestion}/>
					</div>
				</div>
			</div>
		)
	}
}

const PreSelect = ({match}) => {
	return (
		<div>
			<NavLink className='py-1 nav-link px-3 m-0 h5' exact to={'/learn/japanese/kanji'}>japanese kanji</NavLink>
			<NavLink className='py-1 nav-link px-3 m-0 h5' exact to={'/learn/japanese/vocabulary'}>japanese vocabulary</NavLink>
			<NavLink className='py-1 nav-link px-3 m-0 h5' exact to={'/learn/japanese/grammar'}>japanese grammar</NavLink>
		</div>
	)
}

class DisplayJapaneseQuestion extends Component {
	constructor(props) {
		super(props);
	}	

	render(){
		return <Question language={this.props.match.params.language} type={this.props.match.params.question}/>
	}
}