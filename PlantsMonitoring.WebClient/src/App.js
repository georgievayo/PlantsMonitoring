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
import {isTokenExpired, hasLoggedUser} from './utilities/auth';
import { connect } from 'react-redux';
import * as usersActions from './actions/users.actions';

library.add(faStroopwafel);

class App extends Component {
  componentWillUpdate(nextProps) {
    if(!hasLoggedUser() || isTokenExpired()) {
      this.props.logout();
    }
  }

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

function mapDispatchToProps(dispatch, ownProps) {
  return {
    logout: () => dispatch(usersActions.logout())
  }
}

export default connect(null, mapDispatchToProps)(App);
