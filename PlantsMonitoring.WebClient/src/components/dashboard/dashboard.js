import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};
class Dashboard extends Component {
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
          <canvas id="bigDashboardChart"></canvas>
        </div>,
        <div key="content" className="content">
          <div className="row">
            <div className="col-lg-4">
              <div className="card card-chart">
                <div className="card-header">
                  <h4 className="card-title">Soil Moisture</h4>
                </div>
                <div className="card-body">
                  <div className="chart-area">
                    <Line id="lineChartExample" data={data} />
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
                  <h4 className="card-title">Temperature</h4>
                </div>
                <div className="card-body">
                  <div className="chart-area">
                    <canvas id="lineChartExampleWithNumbersAndGrid"></canvas>
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
                    <canvas id="barChartSimpleGradientsNumbers"></canvas>
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

export default Dashboard;