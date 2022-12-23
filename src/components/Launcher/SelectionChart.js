import React from "react";
import { Line } from "react-chartjs-2";
import {
  defaults,
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import "../../css/graphcss.css";

const SelectionChart = (props) => {
  Chart.defaults.font.size = props.font;
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend,
    Tooltip
  );
  return (
    <div className="gsocChart">
      <Line
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
              label: "% of Participants successful",
              data: [
                80, 82, 81, 83, 85, 89, 88, 88.5, 88.9, 89.7, 88.2, 85.6, 86.2,
                86.24, 89.05, 92.32, 93.27, 87.17,
              ],
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
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
              maxHeight: "50",
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
        }}
      />
    </div>
  );
};

export default SelectionChart;
