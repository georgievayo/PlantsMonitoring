import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as usersActions from '../../actions/users.actions';
import logo from '../../imgs/watering-a-plant.svg';

const pages = {
    dashboard: "Dashboard",
    devices: "Devices",
    groups: "Groups",
    rules: "Rules",
    alarms: 'Alarms'
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
                    <NavLink to="/dashboard" className="simple-text logo-mini" onClick={() => this.selectPage(pages.dashboard)}>
                        <img src={logo} alt="logo" />
                    </NavLink>
                    <NavLink to="/dashboard" className="simple-text simple-text logo-normal" onClick={() => this.selectPage(pages.dashboard)}>
                        Plants Monitoring
        </NavLink>
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        <li className={this.isActive(pages.dashboard)}>
                            <NavLink to="/dashboard" onClick={() => this.selectPage(pages.dashboard)}>
                                <i className="now-ui-icons business_chart-pie-36"></i>
                                <p>Dashboard</p>
                            </NavLink>
                        </li>
                        <li className={this.isActive(pages.devices)}>
                            <NavLink to="/devices" onClick={() => this.selectPage(pages.devices)}>
                                <i className="now-ui-icons tech_laptop"></i>
                                <p>Devices</p>
                            </NavLink>
                        </li>
                        <li className={this.isActive(pages.groups)}>
                            <NavLink to="/groups" onClick={() => this.selectPage(pages.groups)}>
                                <i className="now-ui-icons design_bullet-list-67"></i>
                                <p>Groups</p>
                            </NavLink>
                        </li>
                        <li className={this.isActive(pages.rules)}>
                            <NavLink to="/rules" onClick={() => this.selectPage(pages.rules)}>
                                <i className="now-ui-icons files_paper"></i>
                                <p>Rules</p>
                            </NavLink>
                        </li>
                        <li className={this.isActive(pages.alarms)}>
                            <NavLink to="/alarms" onClick={() => this.selectPage(pages.alarms)}>
                                <i className="now-ui-icons ui-2_time-alarm"></i>
                                <p>Alarms</p>
                            </NavLink>
                        </li>
                        <li className="active-pro">
                            <Button color="link" onClick={this.props.logout}>
                                <i className="now-ui-icons ui-1_lock-circle-open"></i>
                                <span>Logout</span>
                            </Button>
                        </li>
                    </ul>
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

export default connect(null, mapDispatchToProps)(Menu);