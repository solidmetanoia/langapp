// Register.js

import React, {Component} from 'react';
import { Router, Route, NavLink } from 'react-router-dom';

export default class Register extends Component {
	constructor() {
		super();
	}
	render(){
		return (
			<div className='bg-success text-light app d-flex flex-column'>
				<h1>Set up register here.</h1>
			</div>
		)
	}
}