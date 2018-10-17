import React, { Component } from 'react';

class Menu extends Component {
    render() {
        return (
    <div class="sidebar" data-color="orange">
      <div class="logo">
        <a href="#" class="simple-text simple-text logo-normal">
          Plants Monitoring
        </a>
      </div>
      <div class="sidebar-wrapper">
        <ul class="nav">
          <li class="active ">
            <a href="./dashboard.html">
              <i class="now-ui-icons business_chart-pie-36"></i>
              <p>Dashboard</p>
            </a>
          </li>
          <li>
            <a href="./icons.html">
              <i class="now-ui-icons tech_laptop"></i>
              <p>Devices</p>
            </a>
          </li>
          <li>
            <a href="./map.html">
              <i class="now-ui-icons files_paper"></i>
              <p>Rules</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
        );
    }
}

export default Menu;