// Login.js

import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {

	constructor() {
		super();

		localStorage.removeItem('access_token');
		axios.post('/logout', {})
			.then((response) => {
			})
			.catch((error) => {
			});
	}

	render(){
		return <Redirect to='/' push/>
	}
}