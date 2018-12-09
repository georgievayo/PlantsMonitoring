import React, { Component } from 'react';
import { CreateGroup } from '../createGroup';
import { connect } from 'react-redux';
import * as groupsActions from '../../actions/groups.actions';
import * as devicesActions from '../../actions/devices.actions';

class Groups extends Component {
    state = {
        showCreateGroup: false,
        groups: []
    };

    componentDidMount() {
        this.props.getGroups();
        this.props.getDevices();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.devices && nextProps.groups) {
            let { groups } = nextProps;
            nextProps.devices.forEach(device => {
                debugger;
                const groupIndex = groups.findIndex(g => g.name === device.group);
                groups[groupIndex].devices = [];
                groups[groupIndex].devices.push(device.name);
            });

            this.setState({groups: groups})
        }
    }

    openCreateGroupSection = () => {
        this.setState({ showCreateGroup: true });
    }

    closeCreateGroupSection = () => {
        this.setState({ showCreateGroup: false });
    }

    render() {
        return (
            [<nav key="nav" className="navbar navbar-expand-lg fixed-top navbar-transparent  bg-primary  navbar-absolute">
                <div className="container-fluid">
                    <div className="navbar-wrapper">
                        <div className="navbar-toggle">
                            <button type="button" className="navbar-toggler">
                                <span className="navbar-toggler-bar bar1"></span>
                                <span className="navbar-toggler-bar bar2"></span>
                                <span className="navbar-toggler-bar bar3"></span>
                            </button>
                        </div>
                        <a className="navbar-brand" href="#pablo">Groups</a>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navigation">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button className="nav-link" id="new-device-btn" onClick={this.openCreateGroupSection}>
                                    <i className="now-ui-icons ui-1_simple-add"></i>
                                    New Group
                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>,
            <div key="panel-header" className="panel-header panel-header-sm">
            </div>,
            <div key="content" className="content">
                <div className="row">
                    <div className={this.state.showCreateGroup ? "col-md-8" : "col-md-12"}>
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title"> Your groups</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <tbody>
                                            <tr className="text-primary">
                                                <th>
                                                    Group Name
                      </th>
                      <th>
                                                    Description
                      </th>
                                                <th>
                                                    Devices
                      </th>
                                            </tr>
                                            {this.state.groups.map(group =>
                                                <tr key={group.id}>
                                                    <td>
                                                        {group.name}
                                                    </td>
                                                    <td>
                                                        {group.description || '---'} 
                                                    </td>
                                                    <td>
                                                        {group.devices && group.devices.map(device =>
                                                            <span>{device} </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.showCreateGroup && <CreateGroup close={this.closeCreateGroupSection} />}
                </div>
            </div>]
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        groups: state.groups,
        devices: state.devices.entities
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getGroups: () => dispatch(groupsActions.getAllGroups()),
        getDevices: () => dispatch(devicesActions.getAllDevices())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Groups);