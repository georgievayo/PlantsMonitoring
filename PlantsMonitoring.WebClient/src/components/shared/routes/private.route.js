import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function mapStateToProps(state, ownProps) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuthenticated
        ? <Component {...props} />
        : <Redirect to='/signin' />
    )} />
  );

export default connect(mapStateToProps, null)(PrivateRoute);