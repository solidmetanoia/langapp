require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import App from './components/App';

ReactDOM.render((
	<BrowserRouter>
    	<Switch>
			<Route exact path='/' component={Home}/>
			<Route path='/youcant' component={App}/>
		</Switch>
	</BrowserRouter>
), document.getElementById('app'));