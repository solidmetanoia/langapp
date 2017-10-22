// Home.js

import React, {Component} from 'react';
import { Router, Route, NavLink } from 'react-router-dom';
import Header from './components/Header';

export default class Home extends Component {
	render(){
		return (
			<div>
				<Header/>
				<div className="container">
					<div className="text-center display-3">piercer's langapp</div>
					<div className="py-5">
						I've been trying to learn japanese, but:
						<ul className="list-unstyled ml-3">
							<li>WaniKani's style of learning was partially good, but I didn't need a lot of it</li>
							<li>Anki's style didn't check if you remember, but had a lot of data from decks</li>
						</ul>
						so I started making this thing.<br/>
					</div>
					<div>
						It started off as a Japanese language learning thing for vocab
						, but it might expand as learning needs increase.
					</div>
				</div>
			</div>
		)
	}
}
