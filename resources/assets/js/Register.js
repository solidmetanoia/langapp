// Register.js

import React, {Component} from 'react';
import { Router, Route, NavLink } from 'react-router-dom';

export default class Register extends Component {
	
	constructor() {
		super();
		this.state = {
			username: '',
			email: '',
			password: ''
	    };

        this.handleInput = this.handleInput.bind(this);
        this.submitRegister = this.submitRegister.bind(this);
	}

	submitRegister(e){
		e.preventDefault();
		axios.post('/api/register', this.state)
			.then(function(response){
				// If response.status == 200, good, redirect to login or intended
				// Else, show error
				console.log(response);
			});
	}

	handleInput(e){
		const target = e.target;
		this.setState({
			[target.name]: target.value
		});
	}

	render(){
		return (
			<div className='bg-success text-light app d-flex flex-column align-content-center justify-content-center'>
				<form action='/api/register' method='post' className='container'>
					<div>
						<div className='form-group row'>
							<label className='col-2 col-form-label' htmlFor='username'>Username:</label>
							<div className='col-10'>
								<input id='username' type='text' value={this.state.username} onChange={this.handleInput} className='form-control' name='username' placeholder='dekinai-kun'></input>
							</div>
						</div>
						<div className='form-group row'>
							<label className='col-2 col-form-label' htmlFor='email'>E-mail:</label>
							<div className='col-10'>
								<input id='email' type='text' value={this.state.email} onChange={this.handleInput} className='form-control' name='email' placeholder='cantlearn@japanese.co.jp'></input>
							</div>
						</div>
						<div className='form-group row'>
							<label className='col-2 col-form-label' htmlFor='password'>Password:</label>
							<div className='col-10'>
								<input id='password' type='password' value={this.state.password} onChange={this.handleInput} className='form-control' name='password' placeholder='助けて'></input>
							</div>
						</div>
						<button type='submit' onClick={this.submitRegister} className='btn btn-primary btn-block'>Register</button>
					</div>
				</form>
			</div>
		)
	}
}