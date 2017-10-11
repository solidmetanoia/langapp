// Login.js

import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import InputWithLabel from './components/InputWithLabel';

export default class Login extends Component {

	constructor() {
		super();

		this.state = {
			username: '',
			password: '',
			errors: ''
		};

		this.handleReceive = this.handleReceive.bind(this);
		this.submitLogin = this.submitLogin.bind(this);
	}

	submitLogin(e){
		e.preventDefault();
		axios.post('/login', this.state)
			.then((response) => {
				if(response.status == 200){
					localStorage.setItem('access_token', JSON.parse(response.data).access_token);
					this.props.history.push("/learn");
				}
			})
			.catch((error) => {
				// Set up fail state here.
				var output = Object.keys(error.response.data).map((key) => {
					return [<div>{error.response.data[key]}</div>];
				});
				this.setState({errors: output})
				setTimeout(()=>{if(this.state.errors == output)  this.setState({errors: ''})}, 3000);
			});
	}

	handleReceive(target){
		this.setState({
			[target.name]: target.value
		});
	}

	render(){
		var inputs = [
			{ name: 'username', label: 'Username:', placeholder: 'dekinai-kun', type: 'text' },
			{ name: 'password', label: 'Password:', placeholder: '助けて', type: 'password' }
		];
		
		return (
			<div className='bg-success text-light app d-flex flex-column align-content-center justify-content-center'>
				<div className='container'>
					<form action='/login' method='POST'>
						<div>
							{inputs.map((input, i) => {
								return <InputWithLabel data={input} key={i} onChangeCallback={this.handleReceive}/>;
							})}
							<div className='d-flex flex-md-row flex-sm-column'>
								<button type='submit' onClick={this.submitLogin} className='btn btn-primary flex-grow-2'>Login</button>
								<NavLink className='btn btn-secondary flex-grow-1' to={'/register'}>I'm a new user</NavLink>
							</div>
						</div>
					</form>
					{(this.state.errors) &&
						<div className='bg-warning text-white text-center rounded error'>{this.state.errors}</div>
					}
				</div>
			</div>
		)
	}
}