import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line, Bar } from 'react-chartjs-2';
import { Card, CardHeader, CardBody, CardFooter, Row, Col, Button } from "reactstrap";
import * as telemetryActions from '../../actions/dashboard.actions';
import * as devicesActions from '../../actions/devices.actions';
import {
    bigDashboardChartData,
    bigDashboardChartOptions,
    getDeviceChartData,
    getColors
} from '../../utilities/methods';
import { lineChartOptionsWithLegend } from '../../utilities/charts.config';
import { toMeasurementModel } from '../../models/telemetry';
import openSocket from 'socket.io-client';

class Dashboard extends Component {
    state = {
        colors: [],
        selectedDeviceData: {},
        selectedDeviceId: undefined
    }

    componentDidMount() {
        this.props.getDevices();
        this.props.getTelemetry();
        const socket = openSocket('http://localhost:5000');
        socket.on('SendMeasurement', (measurement) => {
            const mappedMeasurement = toMeasurementModel(measurement);
            this.props.addMeasurement(mappedMeasurement);
        });
    }

    componentWillReceiveProps(nextProps) {
        const { devices, telemetry } = nextProps;
        if (devices && telemetry &&
            telemetry.length > 0 && devices.length > 0) {
            const colors = getColors(devices);
            const selectedDeviceData = getDeviceChartData(telemetry, devices[0], colors[0].value);
            this.setState({ colors, selectedDeviceData, selectedDeviceId: devices[0].id });
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
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>Your devices</CardHeader>
                                <CardBody>
                                    {this.state.colors.map(color =>
                                        <Button id={color.deviceId}
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
                            <Card className="card-chart">
                                <CardHeader>
                                    <h4 className="card-title">Temperature</h4>
                                </CardHeader>
                                <CardBody>
                                    <Line
                                        data={this.state.selectedDeviceData.temperature}
                                        options={lineChartOptionsWithLegend}
                                        redraw={true}
                                    />
                                </CardBody>
                                <CardFooter>
                                    <div className="stats">
                                        <i className="now-ui-icons arrows-1_refresh-69"></i> Just Updated
                      </div>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col lg={4} xs={12}>
                            <Card className="card-chart">
                                <CardHeader>
                                    <h4 className="card-title">Soil Moisture</h4>
                                </CardHeader>
                                <CardBody>
                                    <Line
                                        data={this.state.selectedDeviceData.humidity}
                                        options={lineChartOptionsWithLegend}
                                        redraw={true}
                                    />
                                </CardBody>
                                <CardFooter>
                                    <div className="stats">
                                        <i className="now-ui-icons arrows-1_refresh-69"></i> Just Updated
                      </div>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col lg={4} xs={12}>
                            <Card className="card-chart">
                                <CardHeader>
                                    <h4 className="card-title">Sunlight Level</h4>
                                </CardHeader>
                                <CardBody>
                                    <Bar data={this.state.selectedDeviceData.light} />
                                </CardBody>
                                <CardFooter>
                                    <div className="stats">
                                        <i className="now-ui-icons arrows-1_refresh-69"></i> Just Updated
                      </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            ]
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        telemetry: state.telemetry,
        devices: state.devices.entities
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getTelemetry: () => dispatch(telemetryActions.getTelemetry()),
        getDevices: () => dispatch(devicesActions.getAllDevices()),
        addMeasurement: (measurement) => dispatch(telemetryActions.addMeasurement(measurement))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);