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
    scales: {
        xAxes: [{
            type: 'time',
            display: false,
            distribution: 'series',
            time: {
                minUnit: 'millisecond',
                unit: 'second'
            }
        }]
    }
};

export const lineChartOptionsWithLegend = {
    legend: {
        display: true
    },
    scales: {
        xAxes: [{
            type: 'time',
            display: false,
            distribution: 'series',
            time: {
                minUnit: 'millisecond',
                unit: 'second'
            }
        }]
    }
};