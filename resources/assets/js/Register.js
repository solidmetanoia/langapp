// Register.js

import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import Input from './components/Input';

export default class Register extends Component {
	
	constructor() {
		super();
		this.state = {
			username: '',
			email: '',
			password: ''
		};

		this.handleReceive = this.handleReceive.bind(this);
		this.submitRegister = this.submitRegister.bind(this);
	}

	submitRegister(e){
		e.preventDefault();
		axios.post('/api/register', this.state)
			.then((response) => {
				if(response.status == 201){
					this.props.history.push("/");
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
			{ name: 'email', label: 'E-mail:', placeholder: 'cantlearn@japanese.co.jp', type: 'email' },
			{ name: 'password', label: 'Password:', placeholder: '助けて', type: 'password' }
		];

		return (
			<div className='bg-success text-light app d-flex flex-column align-content-center justify-content-center'>
				<form action='/api/register' method='post' className='container'>
					<div>
						{inputs.map((input, i) => {
							return <Input data={input} key={i} onChangeCallback={this.handleReceive}/>;
						})}
						<div className='d-flex flex-md-row flex-sm-column-reverse'>
							<NavLink className='btn btn-secondary flex-grow-1' to={'/login'}>Back to Login</NavLink>
							<button type='submit' onClick={this.submitRegister} className='btn btn-primary flex-grow-2'>Create Account</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}