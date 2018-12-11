import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import openSocket from 'socket.io-client';
import { Pie } from "react-chartjs-2";
import { Loader, Header, Alert, LineChart, RulesCard } from '../shared';
import { lineChartData, lineChartOptions, pieChartData, pieChartOptions } from '../../utilities/charts.config';
import * as devicesActions from '../../actions/devices.actions';

class DeviceDetails extends Component {
    state = {
        temperatureChartData: {},
        humidityChartData: {},
        lightChartData: {},
        alarmsChartData: {}
    }

    componentDidMount() {
        const socket = openSocket(`${process.env.TELEMETRY_URL}`);
        socket.on('SendMeasurement', (measurement) => {
            this.props.addMeasurement(measurement);
        });

        socket.on('SendAlarm', (alarm) => {
            this.props.addAlarm(alarm);
        });
    }

    componentWillReceiveProps(nextProps) {
        const alarmsChartData = pieChartData(nextProps.device.alarmsData);
        const temperatureChartData = lineChartData(nextProps.device.temperatureData);
        const humidityChartData = lineChartData(nextProps.device.humidityData);
        const lightChartData = lineChartData(nextProps.device.lightData);

        this.setState({ alarmsChartData, temperatureChartData, humidityChartData, lightChartData });
    }

    render() {
        const { device } = this.props;
        return ([
            <Header title="Device Details" />,
            <div key="content" className="content">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <h4>{device.name}</h4>
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                {this.props.isFetching ?
                                    <Loader isFetching={this.props.isFetching}></Loader>
                                    :
                                    [<Row key="details">
                                        <Col xs={12} md={4}>
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Details</CardTitle>
                                                </CardHeader>
                                                <CardBody>
                                                    <Row>
                                                        <Col>
                                                            Device Id: {device.id}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            Device Name: {device.name}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            Plant type: {device.group}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            Status: {device.status}
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <Row>
                                                <Col>
                                                    <RulesCard title="Information Rules"
                                                        count={device.informationRulesCount}
                                                        icon="business_bulb-63"
                                                        color="text-success"
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <RulesCard title="Warning Rules"
                                                        count={device.warningRulesCount}
                                                        icon="business_bulb-63"
                                                        color="text-warning"
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <RulesCard title="Critical Rules"
                                                        count={device.criticalRulesCount}
                                                        icon="business_bulb-63"
                                                        color="text-danger"
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={12} sm={12} md={4}>
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Alarms Statistics</CardTitle>
                                                    <p className="card-category"><i className="now-ui-icons arrows-1_refresh-69"></i> Just Updated</p>
                                                </CardHeader>
                                                <CardBody>
                                                    <Pie
                                                        data={this.state.alarmsChartData}
                                                        options={pieChartOptions}
                                                        redraw={true}
                                                    />
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>,
                                    <Row key="charts">
                                        <Col xs={12} sm={12} md={4}>
                                            <LineChart isFetching={this.props.isFetching}
                                                data={this.state.temperatureChartData}
                                                options={lineChartOptions}
                                                title="Temperature"
                                                width={400}
                                                height={140}
                                            />
                                        </Col>
                                        <Col xs={12} sm={12} md={4}>
                                            <LineChart isFetching={this.props.isFetching}
                                                data={this.state.humidityChartData}
                                                options={lineChartOptions}
                                                title="Soil Moisture"
                                                width={400}
                                                height={140}
                                            />
                                        </Col>
                                        <Col xs={12} sm={12} md={4}>
                                            <LineChart isFetching={this.props.isFetching}
                                                data={this.state.lightChartData}
                                                options={lineChartOptions}
                                                title="Sunlight Level"
                                                width={400}
                                                height={140}
                                            />
                                        </Col>
                                    </Row>
                                    ]
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>,
            <Alert message={this.props.error} />
        ]);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        device: state.devices.selectedDevice,
        error: state.errorMessage,
        isFetching: state.loading
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getDeviceDetails: dispatch(devicesActions.getDeviceDetails(ownProps.match.params.id)),
        addMeasurement: (measurement) => dispatch(devicesActions.addMeasurementToDevice(measurement)),
        addAlarm: (alarm) => dispatch(devicesActions.addAlarmToDevice(alarm))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceDetails);