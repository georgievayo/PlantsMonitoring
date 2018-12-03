import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as alarmsActions from '../../actions/alarms.actions';

class Alarms extends Component {
    componentDidMount() {
        this.props.getAlarms();
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
                        <a className="navbar-brand" href="#pablo">Rules</a>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                    </button>
                </div>
            </nav>,
            <div key="panel-header" className="panel-header panel-header-sm">
            </div>,
            <div key="content" className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title"> Your alarms</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
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
                                                <tr key={alarm.id}>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>]
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        alarms: state.alarms.entities
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getAlarms: () => dispatch(alarmsActions.getAll())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Alarms);