require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Home';
import LearnApp from './LearnApp';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import ProtectedRoute from './components/ProtectedRoute';

ReactDOM.render((
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Home}/>
			<Route exact path='/login' component={Login}/>
			<Route exact path='/logout' component={Logout}/>
			<Route exact path='/register' component={Register}/>
			<Route>
				<ProtectedRoute path='/youcant' component={LearnApp}/>
			</Route>
		</Switch>
	</BrowserRouter>
), document.getElementById('app'));