// Sidebar.js

import React, {Component} from 'react';
import { Router, Route, NavLink } from 'react-router-dom';

export default class Sidebar extends Component {
	render(){
		return (
			<div className={'sidebar pt-3 px-0 bg-primary '+ this.props.className }>
				<div className='navbar-dark'>
					<h4 className='navbar-brand p-3'>You (Can't)<br/>Learn Japanese</h4>
					<nav className='nav navbar-nav navbar-toggleable nav-stacked flex-column'>
						<li className='nav-item'>
							<ShortNavLink exact to={'/'} label='Home'/>
						</li>
						<li className='nav-item'>
							<ShortNavLink to={'/learn'} label='Learn'/>
							<div>
								<ShortNavLink exact to={'/learn/japanese/kanji'} label='japanese kanji'/>
								<div>
									<ShortNavLink exact to={'/learn/japanese/kanji/n3'} label='jlptn3'/>
								</div>
							</div>
							<div>
								<ShortNavLink exact to={'/learn/japanese/vocabulary'} label='japanese vocabulary'/>
								<div>
									<ShortNavLink exact to={'/learn/japanese/vocabulary/core'} label='core'/>
								</div>
								<div>
									<ShortNavLink exact to={'/learn/japanese/vocabulary/n3'} label='jlptn3'/>
								</div>
							</div>
							<div>
								<ShortNavLink exact to={'/learn/japanese/grammar'} label='japanese grammar'/>
							</div>
						</li>
						<li className='nav-item'>
							<ShortNavLink to={'/logout'} label='Logout'/>
						</li>

					</nav>
					{/*Insert study progress here?*/}
				</div>
			</div>
		)
	}
}

class ShortNavLink extends Component {
	render(){
		return <NavLink className='py-1 nav-link px-3 m-0' exact={this.props.exact?'true':'false'} to={this.props.to}>{this.props.label||'missing label'}</NavLink>;
	}
}
