import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line, Bar } from 'react-chartjs-2';
import * as telemetryActions from '../../actions/dashboard.actions';
import * as devicesActions from '../../actions/devices.actions';
import {
    extractChartData,
    emptyData,
    lineOptions,
    bigDashboardChartData,
    bigDashboardChartOptions
} from '../../utilities/methods';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getDevices();
        this.props.getTelemetry();
    }

    render() {
        const { telemetry, devices } = this.props;
        const data = telemetry.length > 0 ? extractChartData(devices, telemetry) : { ...emptyData };

        return (
            [
                <nav key="navbar" className="navbar navbar-expand-lg fixed-top navbar-transparent  bg-primary  navbar-absolute">
                    <div className="container-fluid">
                        <div className="navbar-wrapper">
                            <div className="navbar-toggle">
                                <button type="button" className="navbar-toggler">
                                    <span className="navbar-toggler-bar bar1"></span>
                                    <span className="navbar-toggler-bar bar2"></span>
                                    <span className="navbar-toggler-bar bar3"></span>
                                </button>
                            </div>
                            <a className="navbar-brand" href="#pablo">Dashboard</a>
                        </div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-bar navbar-kebab"></span>
                            <span className="navbar-toggler-bar navbar-kebab"></span>
                            <span className="navbar-toggler-bar navbar-kebab"></span>
                        </button>
                    </div>
                </nav>,
                <div key="header" className="panel-header panel-header-lg">
                    <Line id="bigDashboardChart" data={bigDashboardChartData} options={bigDashboardChartOptions} />
                </div>,
                <div key="content" className="content">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card card-chart">
                                <div className="card-header">
                                    <h4 className="card-title">Temperature</h4>
                                </div>
                                <div className="card-body">
                                    <div className="chart-area">
                                        <Line id="lineChartExample" data={data.temperature} options={lineOptions} />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="stats">
                                        <i className="now-ui-icons ui-2_time-alarm"></i> Last 7 days
                      </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card card-chart">
                                <div className="card-header">
                                    <h4 className="card-title">Soil Moisture</h4>
                                </div>
                                <div className="card-body">
                                    <div className="chart-area">
                                        <Line id="lineChartExample" data={data.humidity} options={lineOptions} />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="stats">
                                        <i className="now-ui-icons ui-2_time-alarm"></i> Last 7 days
                      </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card card-chart">
                                <div className="card-header">
                                    <h4 className="card-title">Sunlight Level</h4>
                                </div>
                                <div className="card-body">
                                    <div className="chart-area">
                                        <Bar data={data.light} />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="stats">
                                        <i className="now-ui-icons ui-2_time-alarm"></i> Last 7 days
                      </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ]
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        telemetry: state.telemetry,
        devices: state.devices
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getTelemetry: () => dispatch(telemetryActions.getTelemetry()),
        getDevices: () => dispatch(devicesActions.getAllDevices())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);