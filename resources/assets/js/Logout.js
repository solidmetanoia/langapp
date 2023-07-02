// Login.js

import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {

  constructor() {
    super();

    axios.post('/api/logout', {}, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer '+localStorage.getItem('access_token')
        }
      })
      .then((response) => {
      })
      .catch((error) => {
      });
    localStorage.clear();
  }

  render(){
    return <Redirect to='/' push/>
  }
}