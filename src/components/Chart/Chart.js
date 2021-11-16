import { Button, Col, Row } from "antd";
import React from "react";
import { Line } from "react-chartjs-2";
import { useGetSixMonthDataQuery } from "../../services/covidData";
import Loader from "../Loader/Loader";

function Chart({ selectedCountry }) {
  const { data: sixMonthData } = useGetSixMonthDataQuery(
    selectedCountry.split(",")[0]
  );
  if (!sixMonthData) return <Loader />;
  const reversedData = sixMonthData.slice(0).reverse()
  console.log(sixMonthData);
  const data = {
    datasets: [
      {
        label: "Infected",
        data: reversedData.map((data) => data.new_cases),
        borderColor: "#3333ff",
        fill: true,
      },
      {
        data: reversedData.map((data) => data.new_deaths),
        label: "Deaths",
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        fill: true,
      },
    ],
    labels: reversedData.map((data) => data.date),
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="chart_container">
      {<Line options={options} data={data} />}
    </div>
  );
}

export default Chart;
