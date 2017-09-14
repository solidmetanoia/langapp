require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import App from './components/App';
import Login from './components/Login';
import Register from './components/Register';

ReactDOM.render((
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Home}/>
			<Route exact path='/login' component={Login}/>
			<Route exact path='/register' component={Register}/>
			<Route path='/youcant' component={App}/>
		</Switch>
	</BrowserRouter>
), document.getElementById('app'));