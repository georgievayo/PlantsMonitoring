export const pieChart = (pieData) => {
    return {
        data: {
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
        },
        options: {
            pieceLabel: {
                render: "percentage",
                fontColor: ["white"],
                precision: 2
            },

            tooltips: {
                enabled: false
            },

            scales: {
                yAxes: [
                    {
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            drawBorder: false,
                            zeroLineColor: "transparent",
                            color: "rgba(255,255,255,0.05)"
                        }
                    }
                ],

                xAxes: [
                    {
                        barPercentage: 1.6,
                        gridLines: {
                            drawBorder: false,
                            color: "rgba(255,255,255,0.1)",
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            display: false
                        }
                    }
                ]
            }
        }
    }
}

export const lineChart = (data) => {
    return {
        data: {
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
            },
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
        ,
        options: {
            legend: {
                display: false,
                position: "top"
            }
        }
    }
};