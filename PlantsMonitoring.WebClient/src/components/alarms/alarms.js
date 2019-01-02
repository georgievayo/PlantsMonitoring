import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as alarmsActions from '../../actions/alarms.actions';
import { Loader, Header, Alert } from '../shared';

class Alarms extends Component {
    componentDidMount() {
        this.props.getAlarms();
    }

    render() {
        return ([
            <Header key="header" title="Alarms"/>,
            <div key="content" className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title"> Your alarms</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    {this.props.isFetching ?
                                        <Loader isFetching={this.props.isFetching}></Loader>
                                        : <table className="table">
                                            <tbody>
                                                <tr className="text-primary">
                                                    <th>
                                                        Type
                      </th>
                                                    <th>
                                                        For Rule
                      </th>
                                                    <th>
                                                        For Device
                      </th>
                                                    <th className="text-right">
                                                        Raised At
                      </th>
                                                </tr>
                                                {this.props.alarms.map(alarm =>
                                                    <tr key={alarm.device}>
                                                        <td>
                                                            {alarm.type}
                                                        </td>
                                                        <td>
                                                            {alarm.rule}
                                                        </td>
                                                        <td>
                                                            {alarm.device}
                                                        </td>
                                                        <td className="text-right">
                                                            {alarm.raisedAt}
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
                </div>
            </div>,
            <Alert key="alert" message={this.props.error} />
        ]);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        alarms: state.alarms.entities,
        isFetching: state.loading,
        error: state.errorMessage
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getAlarms: () => dispatch(alarmsActions.getAll())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Alarms);