// Header.js

import React, {Component} from 'react';
import { Router, Route, NavLink } from 'react-router-dom';

export default class Header extends Component {
	render(){
		return (
			<header className={'bg-transparent '+ this.props.className }>
				<nav className='justify-content-center navbar'>
				 	<NavLink className='h4 p-3' exact to={'/'}>home</NavLink>
				 	<NavLink className='h4 p-3' to={'/learn'}>learn</NavLink>
				 	{/* <NavLink className='h4 p-3' to={'/'}>about</NavLink> */}
				</nav>
			</header>
		)
	}
}
