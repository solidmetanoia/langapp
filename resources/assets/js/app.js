require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import LearnApp from './LearnApp';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import ProtectedRoute from './components/ProtectedRoute';
import PageNotFound from './components/PageNotFound';

// Static IP for Cordova (example IP)
// axios.defaults.baseURL = 'http://192.168.179.17/';

ReactDOM.render((
	<BrowserRouter>
		{/* For Cordova replace BrowserRouter with HashRouter*/}
		<Switch>
			<Route exact path='/' component={Home}/>
			<Route exact path='/login' component={Login}/>
			<Route exact path='/logout' component={Logout}/>
			<Route exact path='/register' component={Register}/>
			<ProtectedRoute path='/learn' component={LearnApp}/>
			<Route component={PageNotFound} />
		</Switch>
	</BrowserRouter>
), document.getElementById('app'));
