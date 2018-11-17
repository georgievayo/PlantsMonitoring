import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CreateDevice } from '../createDevice';
import * as devicesActions from '../../actions/devices.actions';

class Devices extends Component {
    state = {
        devices: [],
        showCreateDevice: false
    }

    openCreateDeviceSection = () => {
        this.setState({ showCreateDevice: true });
    }

    closeCreateDeviceSection = () => {
        this.setState({ showCreateDevice: false });
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
                        <a className="navbar-brand" href="#pablo">Devices</a>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navigation">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button className="nav-link" id="new-device-btn" onClick={this.openCreateDeviceSection}>
                                    <i className="now-ui-icons ui-1_simple-add"></i>
                                    New Device
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
                    <div className={this.state.showCreateDevice ? "col-md-8" : "col-md-12"}>
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title"> Your devices</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <tbody>
                                            <tr className="text-primary">
                                                <th>
                                                    Id
                      </th>
                                                <th>
                                                    Name
                      </th>
                                                <th>
                                                    Plant Type
                      </th>
                                                <th className="text-right">
                                                    Status
                      </th>
                                            </tr>
                                            {this.props.devices.map(device =>
                                                <tr key={device.id}>
                                                    <td>
                                                        <Link to={"/devices/" + device.id}>
                                                            {device.id}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        {device.name}
                                                    </td>
                                                    <td>
                                                        {device.group}
                                                    </td>
                                                    <td className="text-right">
                                                        {device.status}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.showCreateDevice && <CreateDevice close={this.closeCreateDeviceSection} />}
                </div>
            </div>]
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        devices: state.devices.entities
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getDevices: dispatch(devicesActions.getAllDevices())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Devices);