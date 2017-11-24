// LearnApp.js

import React, {Component} from 'react';
import { Router, Route, NavLink } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Question from './components/Question';

export default class LearnApp extends Component {
	render(){
		return (
			<div className='bg-success text-light app d-flex flex-column flex-md-row'>
				<Header className='d-md-none text-center'/>
				<div className='d-flex flex-row flex-grow-1'>
					<Sidebar className='d-none d-md-block'/>
					<div className='d-flex flex-column flex-grow-1 text-center align-items-center justify-content-center'>
						<Route path='/learn/:language/:question/:list' component={DisplayJapaneseQuestion}/>
						<Route exact path='/learn' component={JaPreSelect}/>
						<Route exact path='/learn/japanese' component={JaPreSelect}/>
					</div>
				</div>
			</div>
		)
	}
}

const JaPreSelect = ({match}) => {
	return (
		<div>
			<h1>japanese</h1>
			<NavLink className='py-1 nav-link px-3 m-0 h5' exact to={'/learn/japanese/kanji/n3'}>kanji jlptn3</NavLink>
			<NavLink className='py-1 nav-link px-3 m-0 h5' exact to={'/learn/japanese/vocabulary/core'}>vocabulary core</NavLink>
			<NavLink className='py-1 nav-link px-3 m-0 h5' exact to={'/learn/japanese/vocabulary/n3'}>vocabulary jlptn3</NavLink>
		</div>
	)
}

const DisplayJapaneseQuestion = props => {
	return <Question
					language={props.match.params.language}
					type={props.match.params.question}
					list={props.match.params.list}
				/>
}
