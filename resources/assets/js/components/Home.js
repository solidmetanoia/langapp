// Home.js

import React, {Component} from 'react';
import { Router, Route, NavLink } from 'react-router-dom';
import Header from './Header';

export default class Home extends Component {
	render(){
		return (
			<Header/>
		)
	}
}