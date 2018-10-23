import React, { Component } from 'react';
import Menu from './components/menu/menu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Devices } from './components/devices';
import { Dashboard } from './components/dashboard';
import { Rules } from './components/rules';
import './styles/now-ui-dashboard.css';
import './styles/demo.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="wrapper ">
      <Router>
      <div className="main-panel">
          <Menu />
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/devices" component={Devices} />
            <Route path="/rules" component={Rules} />
          </Switch>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
