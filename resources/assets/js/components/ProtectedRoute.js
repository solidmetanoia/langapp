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
		axios.get('/api/me', {
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer '+localStorage.getItem('access_token')
			}
		})
		.then((response) => {
			localStorage.setItem('user', JSON.stringify(response.data));
			self.setState({allow: true, loading: false}); 
		})
		.catch((error) => {
			axios.post('/login/refresh', {})
				.then((response) => {
					if(response.status == 200){
						localStorage.setItem('access_token', JSON.parse(response.data).access_token);
					}	
					self.setState({allow: true, loading: false}); 
				})
				.catch((error) => {
					localStorage.removeItem('user');
					self.setState({loading: false}); 
				});
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