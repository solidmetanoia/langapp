// ProtectedRoute.js
require("babel-polyfill");

import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import IdleTimer from 'react-idle-timer';

export default class ProtectedRoute extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allow: false,
			loading: true
		}

		axios.interceptors.request.use(async function (config) {
				let cfg = config;
				let expires = localStorage.getItem('expires_in');
				if(expires === null || expires.length === 0){
					expires = 0;
				}

				// If X seconds * 1000 left until losing auth,
				// refresh as to not lose it.
				if(expires-30*1000 < Date.now() && !cfg.url.startsWith('/login')){
					console.log('Refreshing token');
					await axios.post('/login/refresh', {})
						.then((response) => {
							if(response.status == 200){
								console.log(response);
								localStorage.setItem('access_token', JSON.parse(response.data).access_token);
								localStorage.setItem('expires_in',  Date.now()+JSON.parse(response.data).expires_in*1000);
							}
							console.log(cfg.url);
						})
						.catch((error) => {
							localStorage.clear();
						});
					console.log(cfg);
					cfg.headers.Authorization = 'Bearer '+localStorage.getItem('access_token');
				}
				return cfg ;
			}
			, function (error) {
		    // Do something with request error
		    return Promise.reject(error);
		  }
		);

		this.onIdle = this.onIdle.bind(this);
	}

	onIdle(){
		localStorage.clear();
		this.setState({logout: true})
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
			self.setState({loading: false});
		});

	}

	render(){
		if(this.state.loading){
			return <div className="app bg-secondary text-center d-flex flex-column justify-content-center text-light"><div className="h3">Checking login...</div></div>
		} else {
			if(this.state.allow)
				if(this.state.logout){
					return <Redirect to='/logout' push/>
				} else
				return (
					<IdleTimer
						idleAction={this.onIdle}
						// timeout={5000} // for test purposes 5 seconds
						timeout={1000*60*10} // 10 minutes
						>
						<Route path={this.props.path} component={this.props.component}/>
					</IdleTimer>
				)
			else
				return <Redirect to='/login' push/>
		}
	}
}
