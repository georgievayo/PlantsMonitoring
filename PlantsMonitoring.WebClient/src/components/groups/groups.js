import React, { Component } from 'react';
import { CreateGroup } from '../createGroup';
import { connect } from 'react-redux';
import { Header, Loader, Alert } from '../shared';
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
        this.setState({ groups: [] });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.devices && nextProps.groups) {
            let { groups } = nextProps;
            groups.forEach(group => {
                group.devices = [];
            });
            nextProps.devices.forEach(device => {
                const groupIndex = groups.findIndex(g => g.name === device.group);
                if (groupIndex >= 0) {
                    groups[groupIndex].devices.push(device.name);
                }
            });

            this.setState({ groups })
        }
    }

    openCreateGroupSection = () => {
        this.setState({ showCreateGroup: true });
    }

    closeCreateGroupSection = () => {
        this.setState({ showCreateGroup: false });
    }

    render() {
        return ([
            <Header title="Groups" showAddSection={this.openCreateGroupSection} button="New group" />,
            <div key="content" className="content">
                <div className="row">
                    <div className={this.state.showCreateGroup ? "col-md-8" : "col-md-12"}>
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title"> Your groups</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    {this.props.isFetching ?
                                        <Loader isFetching={this.props.isFetching}></Loader>
                                        :
                                        <table className="table">
                                            <tbody>
                                                <tr className="text-primary">
                                                    <th>
                                                        Group Name
                      </th>
                                                    <th>
                                                        Description
                      </th>
                                                    <th className="text-right">
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
                                                        <td className="text-right">
                                                            {group.devices.length > 0 ? group.devices.map(device =>
                                                                <span>{device} </span>
                                                            ) : <span>No devices yet</span>}
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
                    {this.state.showCreateGroup && <CreateGroup close={this.closeCreateGroupSection} />}
                </div>
            </div>,
            <Alert message={this.props.error}/>
        ]);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        groups: state.groups,
        devices: state.devices.entities,
        error: state.errorMessage,
        isFetching: state.loading
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getGroups: () => dispatch(groupsActions.getAllGroups()),
        getDevices: () => dispatch(devicesActions.getAllDevices())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Groups);