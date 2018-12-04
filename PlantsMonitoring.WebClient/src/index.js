import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import { Signup } from './components/signup';
import { Signin } from './components/signin';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';

const initialState = {};
let store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
                <Route path="/" component={App} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
