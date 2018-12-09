import decode from 'jwt-decode';
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {Signin} from '../components/signin';
export default function withAuth(AuthComponent) {
    return class extends React.Component {
    
        // componentDidMount() {
        //   // ... that takes care of the subscription...
        //   DataSource.addChangeListener(this.handleChange);
        // }
    
        render() {
          if(hasLoggedUser() && !isTokenExpired()) {
            return <AuthComponent props={this.props}/>;
          } else {
              this.props.history.push('/signin');
              return <Signin />;
          }
      }
    }
}

const hasLoggedUser = () => {
    const token = sessionStorage.getItem('token');
    return !!token;
}

const isTokenExpired = () => {
    const token = sessionStorage.getItem('token');
    try {
        const decoded = decode(token);
        return decoded.exp < Date.now() / 1000;
    } catch (err) {
        return false;
    }
}