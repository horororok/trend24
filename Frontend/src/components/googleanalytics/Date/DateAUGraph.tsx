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

interface AUDataProps {
  date: string;
  dauPerMau: string;
  dauPerWau: string;
  wauPerMau: string;
}

interface DateUsersGraphProps {
  data: AUDataProps[]; // 여기서 data 타입을 DateUsersProps의 배열로 지정합니다.
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
        label: "DAU/MAU",
        data: data.map((d) => d.dauPerMau),
        fill: false,
        backgroundColor: "#5f996d",
        borderColor: "#5f996db0",
      },
      {
        label: "DAU/WAU",
        data: data.map((d) => d.dauPerWau),
        fill: false,
        backgroundColor: "rgb(97, 134, 158)",
        borderColor: "rgba(97, 134, 158, 0.2)",
      },
      {
        label: "WAU/MAU",
        data: data.map((d) => d.wauPerMau),
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
