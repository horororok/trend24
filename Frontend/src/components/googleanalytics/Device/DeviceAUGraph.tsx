import React from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DeviceAUProps {
  deviceCategory: string;
  dauPerMau: string;
  dauPerWau: string;
  wauPerMau: string;
}

interface DeviceAUGraphProps {
  data: DeviceAUProps[];
}

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  maintainAspectRatio: false,
};

const DeviceAUGraph: React.FC<DeviceAUGraphProps> = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.deviceCategory),
    datasets: [
      {
        label: "DAU/MAU",
        data: data.map((d) => d.dauPerMau),
        backgroundColor: "#77a081",
      },
      {
        label: "DAU/WAU",
        data: data.map((d) => d.dauPerWau),
        backgroundColor: "#8da392",
      },
      {
        label: "WAU/MAU",
        data: data.map((d) => d.wauPerMau),
        backgroundColor: "#c2cec5",
      },
    ],
  };

  return (
    <Container>
      <Bar data={chartData} options={options} />
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  height: 90%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

export default DeviceAUGraph;
