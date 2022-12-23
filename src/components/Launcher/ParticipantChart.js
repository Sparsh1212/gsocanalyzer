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
} from "chart.js";
import "../../css/graphcss.css";
const ParticipantChart = (props) => {
  Chart.defaults.font.size = props.font;
  Chart.register(CategoryScale, BarElement, PointElement, Legend, Tooltip);
  return (
    <div className="gsocChart">
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
              label: "No. of Participants accepted",
              data: [
                410, 630, 905, 1126, 1000, 1026, 1115, 1212, 1192, 1307, 1051,
                1206, 1318, 1264, 1276, 1198, 1292, 1209,
              ],
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Sucessful participants",
              data: [
                328, 516, 733, 935, 850, 913, 981, 1073, 1060, 1172, 927, 1032,
                1136, 1090, 1136, 1106, 1205, 1054,
              ],
              backgroundColor: "orange",
              borderColor: "red",
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
          legend: {
            labels: {
              font: { size: props.font },
            },
          },
        }}
      />
    </div>
  );
};

export default ParticipantChart;
