import React, { Component } from 'react';
import Menu from './components/menu/menu';
import { Route, Switch } from 'react-router-dom';
import { Devices } from './components/devices';
import { Dashboard } from './components/dashboard';
import { Rules } from './components/rules';
import { Alarms } from './components/alarms';
import { DeviceDetails } from './components/devices';
import { Groups } from './components/groups';
import './styles/now-ui-dashboard.css';
import './styles/demo.css';
import 'bootstrap/dist/css/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel);

class App extends Component {
  render() {
    return (
      <div className="wrapper ">
        <div className="main-panel">
          <Menu />
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/devices" component={Devices} />
            <Route path="/devices/:id" component={DeviceDetails} />
            <Route path="/groups" component={Groups} />
            <Route path="/rules" component={Rules} />
            <Route path="/alarms" component={Alarms} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
