import React from "react";
import { Bar } from "react-chartjs-2";
import {
  defaults,
  Chart,
  CategoryScale,
  BarElement,
  PointElement,
  Legend,
  Tooltip,
  BarController,
} from "chart.js";
import "../../css/graphcss.css";

// Chart.defaults.plugins.tooltip.enabled = true;
// Chart.defaults.plugins.legend.position = "bottom";

const OrganizationChart = (props) => {
  Chart.defaults.font.size = props.font;
  Chart.register(
    CategoryScale,
    BarElement,
    PointElement,
    Legend,
    Tooltip,
    BarController
  );
  return (
    <div className="gsocChart" id="company">
      <Bar
        data={{
          labels: [
            "2005",
            "2006",
            "2007",
            "2008",
            "2009",
            "2010",
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
            "2022",
          ],
          datasets: [
            {
              label: "Open Source Organizations",
              data: [
                42, 102, 135, 175, 150, 150, 175, 180, 177, 190, 134, 178, 198,
                206, 201, 199, 199, 202,
              ],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                font: {
                  size: 12,
                },
              },
            },
            x: {
              beginAtZero: true,
              ticks: {
                font: {
                  size: 12,
                },
              },
            },
          },
          indexAxis: "y",
        }}
      />
    </div>
  );
};

export default OrganizationChart;
