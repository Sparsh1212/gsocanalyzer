import React from 'react'
import { HorizontalBar, defaults } from 'react-chartjs-2'

defaults.global.tooltips.enabled = true;
defaults.global.legend.position = 'bottom';

const CompanyChart = (props) => {
    return (
        <div className="gsocChart" id="company">
            <HorizontalBar
                data={{
                    labels: ['2010','2011','2012','2013','2014','2015','2016', '2017', '2018', '2019', '2020', '2021'],
                    datasets: [
                        {
                            label: 'Open Source Organizations',
                            data: [42,102,135,175,150,150,175,180,177,190,134, 178, 198, 206, 201, 199, 199],
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            // [
                            //     'rgba(255, 99, 132, 0.2)',
                            //     'rgba(54, 162, 235, 0.2)',
                            //     'rgba(255, 206, 86, 0.2)',
                            //     'rgba(75, 192, 192, 0.2)',
                            //     'rgba(153, 102, 255, 0.2)',
                            //     'rgba(255, 159, 64, 0.2)',
                            // ],
                            borderColor: 'rgba(54, 162, 235, 1)',
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

export default CompanyChart;