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
    let data = emptyData;
    debugger;
    if (telemetry.length > 0 && devices.length > 0) {
        debugger;
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

        return data;
    }
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