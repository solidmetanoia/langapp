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

ReactDOM.render((
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Home}/>
			<Route exact path='/login' component={Login}/>
			<Route exact path='/logout' component={Logout}/>
			<Route exact path='/register' component={Register}/>
			<ProtectedRoute path='/learn' component={LearnApp}/>

			{/* For Cordova */}
			<Route exact path='/index.html'>
				<Redirect to='/' push/>
			</Route>
			<Route component={PageNotFound} />
		</Switch>
	</BrowserRouter>
), document.getElementById('app'));
