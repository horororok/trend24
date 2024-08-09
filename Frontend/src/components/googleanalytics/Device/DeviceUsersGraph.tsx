import React from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2"; // Line 대신 Bar를 import합니다.
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

interface DeviceDataProps {
  deviceCategory: string;
  activeUsers: string;
  totalUsers: string;
  newUsers: string;
}

interface DeviceUsersGraphProps {
  data: DeviceDataProps[];
}

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  maintainAspectRatio: false,
};

const DeviceUsersGraph: React.FC<DeviceUsersGraphProps> = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.deviceCategory),
    datasets: [
      {
        label: "활성 사용자",
        data: data.map((d) => d.activeUsers),
        backgroundColor: "#77a081",
      },
      {
        label: "전체 사용자",
        data: data.map((d) => d.totalUsers),
        backgroundColor: "#8da392",
      },
      {
        label: "신규 사용자",
        data: data.map((d) => d.newUsers),
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

export default DeviceUsersGraph;
