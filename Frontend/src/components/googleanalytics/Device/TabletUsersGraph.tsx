import React from "react";
import styled from "styled-components";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DeviceDataProps {
  deviceCategory: string;
  activeUsers: string;
  totalUsers: string;
  newUsers: string;
}

interface TabletUsersGraphProps {
  data: DeviceDataProps[];
}

const TabletUsersGraph: React.FC<TabletUsersGraphProps> = ({ data }) => {
  const chartData = {
    labels: ["활성 사용자", "전체 사용자", "신규 사용자"],
    datasets: [
      {
        data: [
          data.reduce((acc, cur) => acc + Number(cur.activeUsers), 0),
          data.reduce((acc, cur) => acc + Number(cur.totalUsers), 0),
          data.reduce((acc, cur) => acc + Number(cur.newUsers), 0),
        ],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(75, 192, 192)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Container>
      <Pie data={chartData} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

export default TabletUsersGraph;
