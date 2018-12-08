import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import { Signup } from './components/signup';
import { Signin } from './components/signin';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import { PrivateRoute, PublicRoute } from './components/shared';

const initialState = {
    auth: {
        isAuthenticated: !!sessionStorage.getItem('token')
    }
};

let store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <PublicRoute path="/signup" component={Signup} />
                <PublicRoute path="/signin" component={Signin} />
                <PrivateRoute path="/" component={App} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
