import React from 'react'
import { Line, defaults } from 'react-chartjs-2'

defaults.global.tooltips.enabled = true;
defaults.global.legend.position = 'bottom';

const GraphChart = (props) => {
    return (
        <div className="gsocChart" >
            <Line
                data={{
                    labels: ['2010','2011','2012','2013','2014','2015','2016', '2017', '2018', '2019', '2020', '2021'],
                    datasets: [
                        {
                            label: '% of Participants successful',
                            data: [80,82,81,83,85,89,88,88.50,88.90,89.70,88.20, 85.60, 86.20, 86.24, 89.05, 92.32, 93.27],
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            // [
                            //     'rgba(255, 99, 132, 0.2)',
                            //     'rgba(54, 162, 235, 0.2)',
                            //     'rgba(255, 206, 86, 0.2)',
                            //     'rgba(75, 192, 192, 0.2)',
                            //     'rgba(153, 102, 255, 0.2)',
                            //     'rgba(255, 159, 64, 0.2)',
                            // ],
                            borderColor: 'rgba(255, 99, 132, 1)',
                            // [
                            //     'rgba(255, 99, 132, 1)',
                            //     'rgba(54, 162, 235, 1)',
                            //     'rgba(255, 206, 86, 1)',
                            //     'rgba(75, 192, 192, 1)',
                            //     'rgba(153, 102, 255, 1)',
                            //     'rgba(255, 159, 64, 1)',
                            // ],
                            borderWidth: 1,
                        },
                    ],
                    }
                }

                // height="200px"
                // width="300px"
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                    legend: {
                        labels: {
                            fontSize: props.font,
                        },
                    },
                }}
            />
        </div>
    )
}

export default GraphChart;