import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";
import { Alert, Loader, LineChart } from '../shared';
import * as telemetryActions from '../../actions/dashboard.actions';
import * as devicesActions from '../../actions/devices.actions';
import * as alarmsActions from '../../actions/alarms.actions';
import {
    bigDashboardChartData,
    bigDashboardChartOptions,
    getDeviceChartData,
    getColors,
    emptyData
} from '../../utilities/methods';
import { lineChartOptionsWithLegend } from '../../utilities/charts.config';
import { toMeasurementModel } from '../../models/telemetry';
import openSocket from 'socket.io-client';

class Dashboard extends Component {
    state = {
        colors: [],
        selectedDeviceData: { ...emptyData },
        selectedDeviceId: undefined,
        statistics: { online: 0, offline: 0, total: 0 },
        alarmsData: {}
    }

    componentDidMount() {
        this.props.getDevices();
        this.props.getTelemetry();
        this.props.getAlarms();
        const socket = openSocket(`${process.env.REACT_APP_TELEMETRY_URL}`);
        socket.on('SendMeasurement', (measurement) => {
            const mappedMeasurement = toMeasurementModel(measurement);
            this.props.addMeasurement(mappedMeasurement);
        });
    }

    componentWillReceiveProps(nextProps) {
        const { devices, telemetry, alarms } = nextProps;
        if (devices && devices.length > 0) {
            const onlineDevicesCount = devices.filter(d => d.status === 'Online').length;
            const offlineDevicesCount = devices.filter(d => d.status === 'Offline').length;
            this.setState({ statistics: { online: onlineDevicesCount, offline: offlineDevicesCount, total: devices.length } });
            if (this.state.colors.length <= 0) {
                const colors = getColors(devices);
                this.setState({ colors });
            }

            if (telemetry && telemetry.length > 0 && this.state.colors.length > 0) {
                const selectedDeviceData = getDeviceChartData(telemetry, devices[0], this.state.colors[0].value);
                this.setState({ selectedDeviceData, selectedDeviceId: devices[0].id });
            }
        }

        if (alarms && alarms.length > 0) {
            const dates = alarms.map(a => a.Date.split('T')[0]);
            const alarmsCounts = alarms.map(a => a.Count);
            const chartData = bigDashboardChartData(dates, alarmsCounts);
            this.setState({ alarmsData: chartData });
        }
    }

    handleDeviceSelect = (event) => {
        const deviceId = event.target.id;
        const deviceName = event.target.innerText;
        const color = event.target.style.backgroundColor;
        const data = getDeviceChartData(this.props.telemetry, { id: deviceId, name: deviceName }, color)
        this.setState({ selectedDeviceData: data, selectedDeviceId: deviceId });
    }

    render() {
        return ([
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
                <Line data={this.state.alarmsData} options={bigDashboardChartOptions} />
            </div>,
            <div key="content" className="content">
                <Row>
                    <Col md={6} xs={12}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title">Devices Status</h4>
                            </CardHeader>
                            <CardBody>
                                {this.props.isFetching ?
                                    <Loader isFetching={this.props.isFetching}></Loader>
                                    :
                                    [<div key="all">
                                        <strong>{this.state.statistics.total}</strong> All Devices
                                    </div>,
                                    <div key="online">
                                        <strong>{this.state.statistics.online}</strong> Online Devices
                                    </div>,
                                    <div key="offline">
                                        <strong>{this.state.statistics.offline}</strong> Offline Devices
                                    </div>]
                                }
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={6} xs={12}>
                        <Card>
                            <CardHeader>
                                <h4 className="card-title">Select Device</h4>
                            </CardHeader>
                            <CardBody>
                                {this.props.isFetching ?
                                    <Loader isFetching={this.props.isFetching}></Loader>
                                    : this.state.colors.map(color =>
                                        <Button id={color.deviceId}
                                            key={color.deviceId}
                                            size="sm"
                                            style={{ backgroundColor: color.value, borderColor: color.value }}
                                            onClick={this.handleDeviceSelect}>
                                            {color.deviceName}
                                        </Button>
                                    )}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4} xs={12}>
                        <LineChart isFetching={this.props.isFetching}
                            data={this.state.selectedDeviceData.temperature}
                            options={lineChartOptionsWithLegend}
                            title="Temperature"
                        />
                    </Col>
                    <Col lg={4} xs={12}>
                        <LineChart isFetching={this.props.isFetching}
                            data={this.state.selectedDeviceData.humidity}
                            options={lineChartOptionsWithLegend}
                            title="Soil Moisture"
                        />
                    </Col>
                    <Col lg={4} xs={12}>
                        <LineChart isFetching={this.props.isFetching}
                            data={this.state.selectedDeviceData.light}
                            options={lineChartOptionsWithLegend}
                            title="Sunlight Level"
                        />
                    </Col>
                </Row>
            </div>,
            <Alert key="alert" message={this.props.error} />
        ]);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        telemetry: state.telemetry,
        devices: state.devices.entities,
        alarms: state.alarms.summary,
        error: state.errorMessage,
        isFetching: state.loading
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getTelemetry: () => dispatch(telemetryActions.getTelemetry()),
        getDevices: () => dispatch(devicesActions.getAllDevices()),
        getAlarms: () => dispatch(alarmsActions.getAlarmsSummary()),
        addMeasurement: (measurement) => dispatch(telemetryActions.addMeasurement(measurement))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);