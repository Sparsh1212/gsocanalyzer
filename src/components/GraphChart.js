import React from 'react'
import { Bar, defaults } from 'react-chartjs-2'
import "../css/graphcss.css"

defaults.global.tooltips.enabled = true;
defaults.global.legend.position = 'bottom';

const GraphChart = (props) => {
    return (
        <div className="gsocChart">
            <Bar
                data={{
                    labels: ['2010','2011','2012','2013','2014','2015','2016', '2017', '2018', '2019', '2020', '2021'],
                    datasets: [
                        {
                            label: 'No. of Participants accepted',
                            data: [410,630,905,1126,1000,1026,1115,1212,1192,1307,1051, 1206, 1318, 1264, 1276, 1198, 1292],
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
                        {
                            label: 'Sucessful participants',
                            data: [328,516.6,733.05,935,850,913.14,981,1073,1060,1172,927, 1032, 1136, 1090, 1136, 1106, 1205],
                            backgroundColor: 'orange',
                            borderColor: 'red',
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
                            fontSize: props.font ,
                        }
                    },
                }}
            />
        </div>
    )
}

export default GraphChart;