import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col
} from "reactstrap";
import { Line, Pie } from "react-chartjs-2";
import {lineChart, pieChart} from './charts.config';

import * as devicesActions from '../../actions/devices.actions';

class DeviceDetails extends Component {
    render() {
        const { device } = this.props;
        let temperatureData, humidityData, lightData;
        if(device.telemetry)
        {
            debugger;
            temperatureData  = device.telemetry.map(t => {
                return {
                    x: t.receivedAt.split('T')[0],
                    y: t.temperature
                }
            });
            humidityData = device.telemetry.map(t => {
                return {
                    x: t.receivedAt.split('T')[0],
                    y: t.humidity
                }
            });
            lightData = device.telemetry.map(t => {
                return {
                    x: t.receivedAt.split('T')[0],
                    y: t.light
                }
            });
        }
        
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
                        <a className="navbar-brand" href="#pablo">Device Details</a>
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
                                <h4 className="card-title"> Information about {device.name}</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        Device Id: {device.id}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        Plant type: {device.group}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        Status: {device.status}
                                    </div>
                                </div>
                                <Row>
                                    <Col xs={12} sm={12} md={6}>
                                        <Card className="card-chart">
                                            <CardHeader>
                                                <CardTitle>Temperature</CardTitle>
                                                <p className="card-category"><i className="now-ui-icons arrows-1_refresh-69"></i> Just Updated</p>
                                            </CardHeader>
                                            <CardBody>
                                                <Line
                                                    data={lineChart(temperatureData).data}
                                                    options={lineChart(temperatureData).options}
                                                    width={400}
                                                    height={140}
                                                />
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col xs={12} sm={12} md={6}>
                                        <Card className="card-chart">
                                            <CardHeader>
                                                <CardTitle>Soil Moisture</CardTitle>
                                                <p className="card-category"><i className="now-ui-icons arrows-1_refresh-69"></i> Just Updated</p>
                                            </CardHeader>
                                            <CardBody>
                                                <Line
                                                    data={lineChart(humidityData).data}
                                                    options={lineChart(humidityData).options}
                                                    width={400}
                                                    height={140}
                                                />
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={12} md={4}>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Alarms Statistics</CardTitle>
                                                <p className="card-category">Last 1 month</p>
                                            </CardHeader>
                                            <CardBody>
                                                <Pie
                                                    data={pieChart.data}
                                                    options={pieChart.options}
                                                />
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col xs={12} sm={12} md={{ size: 8 }}>
                                        <Card className="card-chart">
                                            <CardHeader>
                                                <CardTitle>Sunlight Level</CardTitle>
                                                <p className="card-category"><i className="now-ui-icons arrows-1_refresh-69"></i> Just Updated</p>
                                            </CardHeader>
                                            <CardBody>
                                                <Line
                                                    data={lineChart(lightData).data}
                                                    options={lineChart(lightData).options}
                                                    width={400}
                                                    height={105}
                                                />
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
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
        device: state.devices.selectedDevice
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getDeviceDetails: dispatch(devicesActions.getDeviceDetails(ownProps.match.params.id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceDetails);