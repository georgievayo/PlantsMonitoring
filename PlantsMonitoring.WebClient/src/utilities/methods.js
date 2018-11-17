export const getResult = (response) => response.Result || response.result || [];

export const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const emptyData = { temperature: { datasets: [] }, humidity: { datasets: [] }, light: { datasets: [] } };

export const extractChartData = (devices, telemetry) => {
    let data = JSON.parse(JSON.stringify(emptyData));
    if (telemetry.length > 0 && devices.length > 0) {
        devices.forEach(device => {
            const temperatureTelemetry = telemetry.filter(t => t.deviceId === device.id)
                .map(t => {
                    return {
                        x: t.receivedAt.split('T')[0],
                        y: t.temperature
                    }
                });
            const humidityTelemetry = telemetry.filter(t => t.deviceId === device.id)
                .map(t => {
                    return {
                        x: t.receivedAt.split('T')[0],
                        y: t.humidity
                    }
                });
            const lightTelemetry = telemetry.filter(t => t.deviceId === device.id)
                .map(t => {
                    return {
                        x: t.receivedAt.split('T')[0],
                        y: t.light
                    }
                });

            const deviceColorLine = getRandomColor();

            const temperatureDataset = {
                label: device.name,
                data: temperatureTelemetry,
                fill: false,
                showLine: true,
                backgroundColor: deviceColorLine,
                borderColor: deviceColorLine
            };

            const humidityDataset = {
                label: device.name,
                data: humidityTelemetry,
                fill: false,
                showLine: true,
                backgroundColor: deviceColorLine,
                borderColor: deviceColorLine
            };

            const lightDataset = {
                label: device.name,
                data: lightTelemetry,
                fill: false,
                showLine: true,
                backgroundColor: deviceColorLine,
                borderColor: deviceColorLine
            };

            data.temperature.datasets.push(temperatureDataset);
            data.humidity.datasets.push(humidityDataset);
            data.light.datasets.push(lightDataset);
        });
    }

    return data;
}

export const lineOptions = {
    scales: {
        xAxes: [{
            type: 'time',
            time: {
                unit: 'day',
                unitStepSize: 1,
                displayFormats: {
                    'millisecond': 'MMM DD',
                    'second': 'MMM DD',
                    'minute': 'MMM DD',
                    'hour': 'MMM DD',
                    'day': 'MMM DD',
                    'week': 'MMM DD',
                    'month': 'MMM DD',
                    'quarter': 'MMM DD',
                    'year': 'MMM DD',
                }
            }
        }]
    }
};

export const bigDashboardChartData = {
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    datasets: [{
        label: "Data",
        borderColor: "#FFFFFF",
        pointBorderColor: "#FFFFFF",
        pointBackgroundColor: "#1e3d60",
        pointHoverBackgroundColor: "#1e3d60",
        pointHoverBorderColor: "#FFFFFF",
        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: true,
        backgroundColor: "rgba(128, 182, 244, 0)",
        borderWidth: 2,
        data: [50, 150, 100, 190, 130, 90, 150, 160, 120, 140, 190, 95]
    }]
};

export const bigDashboardChartOptions = {
    layout: {
        padding: {
            left: 20,
            right: 20,
            top: 0,
            bottom: 0
        }
    },
    maintainAspectRatio: false,
    tooltips: {
        backgroundColor: '#fff',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
    },
    legend: {
        position: "bottom",
        fillStyle: "#FFF",
        display: false
    },
    scales: {
        yAxes: [{
            ticks: {
                fontColor: "rgba(255,255,255,0.4)",
                fontStyle: "bold",
                beginAtZero: true,
                maxTicksLimit: 5,
                padding: 10
            },
            gridLines: {
                drawTicks: true,
                drawBorder: false,
                display: true,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent"
            }

        }],
        xAxes: [{
            gridLines: {
                zeroLineColor: "transparent",
                display: false,

            },
            ticks: {
                padding: 10,
                fontColor: "rgba(255,255,255,0.4)",
                fontStyle: "bold"
            }
        }]
    }
};