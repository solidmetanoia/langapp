// Login.js

import React, {Component} from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Input from './components/Input';

export default class Login extends Component {

	constructor() {
		super();

		this.state = {
			username: '',
			password: ''
	    };

        this.handleReceive = this.handleReceive.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
	}

	submitLogin(e){
		e.preventDefault();
		axios.post('/api/login', this.state)
			.then((response) => {
				if(response.status == 200){
					localStorage.setItem('access_token', JSON.parse(response.data).access_token);
				    this.props.history.push("/youcant");
				} 
			})
			.catch((error) => {
				console.log(error);
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
				<form action='/api/login' method='POST' className='container'>
					<div>
						{inputs.map((input, i) => {
							return <Input data={input} key={i} onChangeCallback={this.handleReceive}/>;
						})}
						<div className='d-flex flex-md-row flex-sm-column'>
							<button type='submit' onClick={this.submitLogin} className='btn btn-primary flex-grow-2'>Login</button>
							<NavLink className='btn btn-secondary flex-grow-1' to={'/register'}>I'm a new user</NavLink>
						</div>
					</div>
				</form>
			</div>
		)
	}
}