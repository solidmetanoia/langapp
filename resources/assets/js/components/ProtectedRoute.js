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
        if(expires === null || expires.length === 0)
          return cfg;

        // If X seconds * 1000 left until losing auth,
        // refresh as to not lose it.
        if(  expires-60*1000 < Date.now()
            && !cfg.url.startsWith('/logout')
            && !cfg.url.startsWith('/login')
            && !cfg.url.startsWith('/api/me')
          ){
          console.log('Refreshing token');
          await axios.post('/login/refresh', {})
            .then((response) => {
              if(response.status == 200){
                localStorage.setItem('access_token', JSON.parse(response.data).access_token);
                localStorage.setItem('expires_in',  Date.now()+JSON.parse(response.data).expires_in*1000);
              }
            })
            .catch((error) => {
              localStorage.clear();
            });
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
    var self = this;
    axios.get('/api/me', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer '+localStorage.getItem('access_token')
      }
    })
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data));
    })
    .catch((error) => {
      localStorage.clear();
      self.setState({loading: false, logout: true})
    });
    this.idleTimer.reset();
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
            localStorage.setItem('expires_in',  Date.now()+JSON.parse(response.data).expires_in*1000);
            self.setState({allow: true, loading: false});
          }
        })
        .catch((error) => {
          localStorage.clear();
          self.setState({loading: false});
        });
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
            ref={elem => this.idleTimer = elem}
            idleAction={this.onIdle}
            timeout={10*1000} // check every X*1000 seconds while idle
            >
            <Route path={this.props.path} component={this.props.component}>
              { (document.getElementById('android-theme-color'))?document.getElementById('android-theme-color').setAttribute('content', '#4B5D7E'):''}
            </Route>
          </IdleTimer>
        )
      else
        return <Redirect to='/login' push/>
    }
  }
}
