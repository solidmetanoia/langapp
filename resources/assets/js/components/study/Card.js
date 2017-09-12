// Card.js

import React, {Component} from 'react';

export default class Card extends Component {
	render(){
		let example = null;
		if(this.props.data.example != null){
			example = <h3>{this.props.data.example}</h3>;
		}
		let cardFooter = [];
		
		if(this.props.data.answers != null){
			this.props.data.answers.map((answer, index)=>{
				cardFooter.push(<button key={index} className='btn m-1'>{answer}</button>);
			});
		} else if(this.props.data.type != null){
			if(this.props.data.type == 'text' || this.props.data.type == 'input'){
				cardFooter.push(<input type='text' className='form-control text-center m-1'></input>);
			}
		}
		return (
			<div className='card text-center'> 
				<div className='card-header'>
					<h1 className='card-title'>{this.props.data.title}</h1>
					{example}
				</div>
				<div className=''>{this.props.data.required}</div>
				<div className='card-footer'>
					{cardFooter}
				</div>
			</div>
		)
	}
}