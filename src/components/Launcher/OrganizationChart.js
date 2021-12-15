import React from 'react'
import { HorizontalBar, defaults } from 'react-chartjs-2'
import "../../css/graphcss.css"

defaults.global.tooltips.enabled = true;
defaults.global.legend.position = 'bottom';

const OrganizationChart = (props) => {
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
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                    ],
                    }
                }
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

export default OrganizationChart;