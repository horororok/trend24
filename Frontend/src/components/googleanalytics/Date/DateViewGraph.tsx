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

interface DateViewProps {
  date: string;
  screenPageViews: string;
}

interface DateUsersGraphProps {
  data: DateViewProps[]; // 여기서 data 타입을 DateUsersProps의 배열로 지정합니다.
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
        label: "페이지 조회수",
        data: data.map((d) => d.screenPageViews),
        fill: false,
        backgroundColor: "#5f996d",
        borderColor: "#5f996db0",
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
