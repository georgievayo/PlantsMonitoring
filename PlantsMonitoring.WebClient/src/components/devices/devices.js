import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CreateDevice } from '../createDevice';
import { Loader, Header, Alert } from '../shared';
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
        return ([
            <Header key="header" title="Devices" showAddSection={this.openCreateDeviceSection} button="New Device"/>,
            <div key="content" className="content">
                <div className="row">
                    <div className={this.state.showCreateDevice ? "col-md-8" : "col-md-12"}>
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title"> Your devices</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    {this.props.isFetching ?
                                        <Loader isFetching={this.props.isFetching}></Loader>
                                        : <table className="table">
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
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.showCreateDevice && <CreateDevice close={this.closeCreateDeviceSection} />}
                </div>
            </div>,
            <Alert key="alert" message={this.props.error} />
        ]);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        devices: state.devices.entities,
        error: state.errorMessage,
        isFetching: state.loading
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getDevices: dispatch(devicesActions.getAllDevices())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Devices);