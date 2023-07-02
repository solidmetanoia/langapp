// PageNotFound.js

import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

export default class PageNotFound extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    var text = '出来ない';
    var canvas = document.createElement("canvas");
    var fontSize = 18;
    canvas.setAttribute('height', fontSize+2);
    canvas.setAttribute('width', 80);
    var context = canvas.getContext('2d');
    context.fillStyle = '#dfe8f1';
    context.font = fontSize + 'px sans-serif';
    context.fillText(text, 5, fontSize);

    var style = {
      background: 'url('+canvas.toDataURL('image/png')+') repeat',
      WebkitTransition: 'all',
      msTransition: 'all'
    }
    return (
      <div className="app bg-secondary d-flex flex-column justify-content-center text-light text-center" style={style}>
        <div className="d-flex flex-column flex-1 text-light">
          <NavLink to={'/'}><div className="display-4 bg-light text-dark">HOME</div></NavLink>
        </div>
          <div className='display-3 bg-warning'>出来ない</div>
        <div className="d-flex flex-column flex-1 text-light justify-content-end">
          <NavLink to={'/learn'}><div className="display-4 bg-light text-dark">LEARN</div></NavLink>
        </div>
      </div>
    )
  }
}
