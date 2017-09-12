// Home.js

import React, {Component} from 'react';
import { Router, Route, NavLink } from 'react-router-dom';

export default class Home extends Component {
	render(){
		return (
			<header className='bg-transparent text-center text-gray-dark'>
				<nav className='justify-content-center navbar'>
				 	<NavLink className='h4 p-3' exact to={'/'}>home</NavLink>
				 	<NavLink className='h4 p-3' to={'/youcant'}>learn</NavLink>
				 	<NavLink className='h4 p-3' to={'/portfolio'}>portfolio</NavLink>
				</nav>
			</header>
		)
	}
}