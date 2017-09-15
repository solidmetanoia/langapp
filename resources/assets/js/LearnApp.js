// LearnApp.js

import React, {Component} from 'react';
import { Router, Route, NavLink } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Question from './components/study/Question';
import Card from './components/study/Card';

export default class LearnApp extends Component {
	constructor() {
		super();
		// Answer is right now string. Can use array of keyless objects to iterate
		// and make buttons with their values.
		// The ajax still needs to be sent from card, not from button... 
		// how do I send call of child object to parent?
		// do I keep it as buttons not more components?
		this.state = {
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
					<div className='pt-3 d-flex flex-column flex-grow-1 text-center align-items-center justify-content-center'>
						<Question data={this.state.meaningwithex}/>
						{/*
						<Card data={this.state.meaning}/>
						<Card data={this.state.reading}/>
						<Card data={this.state.listening}/>
						<Card data={this.state.reverse}/>
						<Card data={this.state.meaningwithex}/>
						*/}
					</div>
				</div>
			</div>
		)
	}
}