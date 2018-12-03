export const pieChartData = (pieData) => {
    return {
        labels: ['Critical', 'Information', 'Warning'],
        datasets: [
            {
                pointRadius: 0,
                pointHoverRadius: 0,
                backgroundColor: ["#d9364c", "#4acccd", "#fcc468"],
                borderWidth: 0,
                data: pieData
            }
        ]
    }
}

export const pieChartOptions = {
    legend: {
        position: 'right'
    },
    pieceLabel: {
        render: "percentage",
        fontColor: ["white"],
        precision: 2
    },
};

export const lineChartData = (data) => {
    return {
        datasets: [
            {
                data: data,
                fill: false,
                borderColor: "#fbc658",
                backgroundColor: "transparent",
                pointBorderColor: "#fbc658",
                pointRadius: 2,
                pointHoverRadius: 4,
                pointBorderWidth: 8
            }
        ]
    }
};

export const lineChartOptions = {
    legend: {
        display: false
    },
    // scaleShowGridLines: false,
    // scaleGridLineColor: 'rgba(0,0,0,.05)',
    // scaleGridLineWidth: 1,
    // scaleShowHorizontalLines: true,
    // scaleShowVerticalLines: true,
    // bezierCurve: true,
    // bezierCurveTension: 0.4,
    // pointDot: true,
    // pointDotRadius: 4,
    // pointDotStrokeWidth: 1,
    // pointHitDetectionRadius: 20,
    // datasetStroke: true,
    // datasetStrokeWidth: 4,
    // datasetFill: true,
    scales: {
        xAxes: [{
            type: 'time',
            display: false,
            time: {
                unit: 'second',
                displayFormats: {
                    second: 'h:mm:ss a'
                }
            }
        }]
    }
};