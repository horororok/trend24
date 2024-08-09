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

interface MobileUsersGraphProps {
  data: DeviceDataProps[];
}

const options = {
  maintainAspectRatio: false,
};

const MobileUsersGraph: React.FC<MobileUsersGraphProps> = ({ data }) => {
  const chartData = {
    labels: ["활성 사용자", "전체 사용자", "신규 사용자"],
    datasets: [
      {
        data: [
          data.reduce((acc, cur) => acc + Number(cur.activeUsers), 0),
          data.reduce((acc, cur) => acc + Number(cur.totalUsers), 0),
          data.reduce((acc, cur) => acc + Number(cur.newUsers), 0),
        ],
        backgroundColor: ["#77a081", "#8da392", "#c2cec5"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Container>
      <Pie data={chartData} options={options} />
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  height: 90%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

export default MobileUsersGraph;
