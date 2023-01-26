import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment/moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ selected }) => {

  const coinChartData = selected.map((coin) =>
    coin.prices.map((value) => ({ x: value[0], y: value[1].toFixed(2) })) //sets coing data to x and y
  );

  const chartNumbers = {
    labels: coinChartData[0].map((value) => moment(value.x).format("LT")), //create label(x)
    datasets: selected.map((data, i) => ({ //for each selected coin create dataset
      label: data.name,
      data: coinChartData[i].map((val) => val.y), //maps data to get y
      borderColor: `rgb(255, ${255 / i + 1}, ${255 / i + 1})`, //create different colors
      backgroundColor: `rgb(255, ${255 / i + 1}, ${255 / i + 1})`,
    })),
  };

  const options = {
    responsive: true,
  };

  return (
    <div className="chart">
      <Line className="chartEl" options={options} data={chartNumbers} />
    </div>
  );
};

export default Chart;
