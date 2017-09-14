// Login.js

import React, {Component} from 'react';
import { Router, Route, NavLink } from 'react-router-dom';

export default class Login extends Component {
	constructor() {
		super();
	}
	render(){
		return (
			<div className='bg-success text-light app d-flex flex-column'>
				<h1>Set up login here.</h1>
			</div>
		)
	}
}