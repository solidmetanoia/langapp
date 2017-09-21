// Sidebar.js

import React, {Component} from 'react';
import { Router, Route, NavLink } from 'react-router-dom';

export default class Sidebar extends Component {
	render(){
		return (
			<div className={'sidebar pt-3 px-0 bg-primary '+ this.props.className }> 
				<div className='navbar-dark'>
					<h4 className='navbar-brand p-3'>You (Can't) Learn Japanese</h4>
					<nav className='nav navbar-nav navbar-toggleable nav-stacked flex-column'>
						<li className='nav-item'>
							<NavLink className='py-1 nav-link px-3 m-0' exact to={'/'}>Home</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink className='py-1 nav-link px-3 m-0' to={'/learn'}>Learn</NavLink>
							<div>
								<NavLink className='py-1 nav-link px-3 m-0' exact to={'/learn/japanese/kanji'}>japanese kanji</NavLink>
							</div>
							<div>
								<NavLink className='py-1 nav-link px-3 m-0' exact to={'/learn/japanese/vocabulary'}>japanese vocabulary</NavLink>
							</div>
							<div>
								<NavLink className='py-1 nav-link px-3 m-0' exact to={'/learn/japanese/grammar'}>japanese grammar</NavLink>
							</div>
						</li>
						<li className='nav-item'>
							<NavLink className='py-1 nav-link px-3 m-0' to={'/logout'}>Logout</NavLink>
						</li>
						
					</nav>
				</div>
			</div>
		)
	}
}