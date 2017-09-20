// ProtectedRoute.js

import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';

export default class ProtectedRoute extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allow: false,
			loading: true
		}
	}

	componentDidMount() {
		var self = this;
		var access_token = localStorage.getItem('access_token');
		axios.get('/api/me', {
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer '+access_token
			}
		})
		.then((response) => {
			self.setState({allow: true, loading: false}); 
			console.log("reachk");
			// return <Route path={this.props.path} component={this.props.component}/>;
		})
		.catch((error) => {
			self.setState({loading: false}); 
			console.log("reachf");
			// return <Redirect to='/login' push/>;
		});
	}

	render(){
		if(this.state.loading){
			return <div className="app bg-secondary text-center d-flex flex-column justify-content-center text-light"><div className="h3">Checking login...</div></div>
		} else {
			if(this.state.allow)
				return <Route path={this.props.path} component={this.props.component}/>
			else
				return <Redirect to='/login' push/>
		}
	}
}