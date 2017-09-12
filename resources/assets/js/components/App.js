// App.js

import React, {Component} from 'react';
import { Router, Route, NavLink } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Card from './study/Card';

export default class App extends Component {
	constructor() {
		super();
		// Answer is right now string. Can use array of keyless objects to iterate
		// and make buttons with their values.
		// The ajax still needs to be sent from card, not from button... 
		// how do I send call of child object to parent?
		// do I keep it as buttons not more components?
		this.state = {
			meaning: {title: '空', required: 'meaning', answers: ['sky', 'ground', 'jacket', 'impossible', 'free', 'life']},
			meaningwithex: {title: '空', example: '空飛びたい', required: 'meaning', answers: ['sky', 'ground', 'jacket', 'impossible', 'free', 'life']},
			reading: {title: '空', required: 'reading', type: "text"},
			listening: {title: '空', required: 'pronunciation', answers: ['そら', 'つち', 'うわぎ', 'むり', 'むりょう', 'せい']},
			reverse: {title: 'sky', required: 'reading', answers: ['空', '土', '上着', '無理', '無料', '生']},
		};
	}
	render(){
		return (
			<div className='container-fluid h-100'>
				<div className='row h-100'>
					<Sidebar />
					<div className='col-10 pt-3 card-columns'>
						<Card data={this.state.meaning}/>
						<Card data={this.state.reading}/>
						<Card data={this.state.listening}/>
						<Card data={this.state.reverse}/>
						<Card data={this.state.meaningwithex}/>
					</div>
				</div>
			</div>
		)
	}
}