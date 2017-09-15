require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Home';
import LearnApp from './LearnApp';
import Login from './Login';
import Register from './Register';

ReactDOM.render((
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Home}/>
			<Route exact path='/login' component={Login}/>
			<Route exact path='/register' component={Register}/>
			<Route>
				<Route path='/youcant' component={LearnApp}/>
			</Route>
		</Switch>
	</BrowserRouter>
), document.getElementById('app'));