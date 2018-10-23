import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const pages = {
  dashboard: "Dashboard",
  devices: "Devices",
  rules: "Rules"
};

class Menu extends Component {
  state = {
    selectedPage: pages.dashboard
  };

  selectPage = (page) => {
    this.setState({ selectedPage: page });
  }
  
  isActive = (page) => {
    return this.state.selectedPage === page ? 'active' : '';
  }

  render() {
    return (
      <div className="sidebar" data-color="orange">
        <div className="logo">
          <NavLink to="/dashboard" className="simple-text logo-mini" onClick={() =>this.selectPage(pages.dashboard)}>
            <img src="./imgs/watering-a-plant.svg" alt="logo" />
          </NavLink>
          <NavLink to="/dashboard" className="simple-text simple-text logo-normal" onClick={() =>this.selectPage(pages.dashboard)}>
            Plants Monitoring
        </NavLink>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            <li className={this.isActive(pages.dashboard)}>
              <NavLink to="/dashboard" onClick={() =>this.selectPage(pages.dashboard)}>
                <i className="now-ui-icons business_chart-pie-36"></i>
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li className={this.isActive(pages.devices)}>
              <NavLink to="/devices" onClick={() =>this.selectPage(pages.devices)}>
                <i className="now-ui-icons tech_laptop"></i>
                <p>Devices</p>
              </NavLink>
            </li>
            <li className={this.isActive(pages.rules)}>
              <NavLink to="/rules" onClick={() =>this.selectPage(pages.rules)}>
                <i className="now-ui-icons files_paper"></i>
                <p>Rules</p>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Menu;