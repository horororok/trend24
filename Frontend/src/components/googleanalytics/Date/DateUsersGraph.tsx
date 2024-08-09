import React from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DateUsersProps {
  date: string;
  activeUsers: string;
  totalUsers: string;
  newUsers: string;
}

interface DateUsersGraphProps {
  data: DateUsersProps[]; // 여기서 data 타입을 DateUsersProps의 배열로 지정합니다.
}

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  maintainAspectRatio: false,
};

const DateUsersGraph: React.FC<DateUsersGraphProps> = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "활성 사용자",
        data: data.map((d) => d.activeUsers),
        fill: false,
        backgroundColor: "#5f996d",
        borderColor: "#5f996db0",
      },
      {
        label: "전체 사용자",
        data: data.map((d) => d.totalUsers),
        fill: false,
        backgroundColor: "rgb(97, 134, 158)",
        borderColor: "rgba(97, 134, 158, 0.2)",
      },
      {
        label: "신규 사용자",
        data: data.map((d) => d.newUsers),
        fill: false,
        backgroundColor: "#c2cec5",
        borderColor: "#c2cec5b0",
      },
    ],
  };

  return (
    <Container>
      <Line data={chartData} options={options} />
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

export default DateUsersGraph;
