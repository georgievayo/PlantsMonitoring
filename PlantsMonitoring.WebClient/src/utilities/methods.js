export const getResult = (response) => response.Result || response.result || [];

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const getColors = (devices) => {
    let colors = [];
    devices.forEach(device => {
        const color = getRandomColor();
        colors.push({value: color, deviceId: device.id, deviceName: device.name});
    });

    return colors;
}

export const emptyData = { temperature: { datasets: [] }, humidity: { datasets: [] }, light: { datasets: [] } };

export const getDeviceChartData = (telemetry, device, color) => {
    let data = JSON.parse(JSON.stringify(emptyData));
    const temperatureTelemetry = telemetry.filter(t => t.deviceId === device.id)
        .map(t => {
            return {
                x: new Date(t.receivedAt),
                y: t.temperature
            }
        });
    const humidityTelemetry = telemetry.filter(t => t.deviceId === device.id)
        .map(t => {
            return {
                x: new Date(t.receivedAt),
                y: t.humidity
            }
        });
    const lightTelemetry = telemetry.filter(t => t.deviceId === device.id)
        .map(t => {
            return {
                x: new Date(t.receivedAt),
                y: t.light
            }
        });

    const temperatureDataset = {
        label: device.name,
        data: temperatureTelemetry,
        fill: false,
        showLine: true,
        backgroundColor: color,
        borderColor: color
    };

    const humidityDataset = {
        label: device.name,
        data: humidityTelemetry,
        fill: false,
        showLine: true,
        backgroundColor: color,
        borderColor: color
    };

    const lightDataset = {
        label: device.name,
        data: lightTelemetry,
        fill: false,
        showLine: true,
        backgroundColor: color,
        borderColor: color
    };

    data.temperature.datasets.push(temperatureDataset);
    data.humidity.datasets.push(humidityDataset);
    data.light.datasets.push(lightDataset);

    return data;
}

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