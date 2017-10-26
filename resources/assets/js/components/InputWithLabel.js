// InputWithLabel.js

import React, {Component} from 'react';

export default class InputWithLabel extends Component {

	constructor() {
		super();
		this.state = {};

        this.handleInput = this.handleInput.bind(this);
	}

	handleInput(e){
        this.props.onChangeCallback(e.target);
	}

	render(){
		var data = this.props.data;
		return (
			<div className='form-group row'>
				<label className='col-12 col-md-2 col-form-label capitalize' htmlFor={data.name}>{data.label}</label>
				<div className='col-12 col-md-10'>
					<input id={data.name} type={data.type} value={this.state[data.name]} onChange={this.handleInput} className='form-control' name={data.name} placeholder={data.placeholder}></input>
				</div>
			</div>
		)
	}
}
