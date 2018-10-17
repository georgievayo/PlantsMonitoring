import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as devicesActions from '../../actions/devices.actions';

class Devices extends Component {
    state = {
        devices: []
    }

    componentDidMount() {

    }

    render() {
        return (
            <div class="content">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title"> Your devices</h4>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead class=" text-primary">
                                            <th>
                                                Id
                      </th>
                                            <th>
                                                Name
                      </th>
                                            <th>
                                                Group
                      </th>
                                            <th class="text-right">
                                                Status
                      </th>
                                        </thead>
                                        <tbody>
                                            {this.props.devices.map(device =>
                                                <tr>
                                                    <td>
                                                        {device.id}
                                                    </td>
                                                    <td>
                                                        {device.name}
                                                    </td>
                                                    <td>
                                                        {device.group}
                                                    </td>
                                                    <td class="text-right">
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
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        devices: state.devices.devices
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getDevices: dispatch(devicesActions.getAllDevices())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Devices);