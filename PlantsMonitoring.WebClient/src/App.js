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
      <div class="wrapper ">
      <Router>
      <div class="main-panel">
      <nav class="navbar navbar-expand-lg fixed-top navbar-transparent  bg-primary  navbar-absolute">
        <div class="container-fluid">
          <div class="navbar-wrapper">
            <div class="navbar-toggle">
              <button type="button" class="navbar-toggler">
                <span class="navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <a class="navbar-brand" href="#pablo">Devices</a>
          </div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-bar navbar-kebab"></span>
            <span class="navbar-toggler-bar navbar-kebab"></span>
            <span class="navbar-toggler-bar navbar-kebab"></span>
          </button>
        </div>
      </nav>
      <div class="panel-header panel-header-sm">
      </div>
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
