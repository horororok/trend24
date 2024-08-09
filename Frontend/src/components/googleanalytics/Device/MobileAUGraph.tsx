import React from "react";
import styled from "styled-components";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DeviceAUProps {
  deviceCategory: string;
  dauPerMau: string;
  dauPerWau: string;
  wauPerMau: string;
}
interface MobileAUGraphProps {
  data: DeviceAUProps[];
}

const options = {
  maintainAspectRatio: false,
};

const MobileAUGraph: React.FC<MobileAUGraphProps> = ({ data }) => {
  const chartData = {
    labels: ["DAU/MAU", "DAU/WAU", "WAU/MAU"],
    datasets: [
      {
        data: [
          data.reduce((acc, cur) => acc + Number(cur.dauPerMau), 0),
          data.reduce((acc, cur) => acc + Number(cur.dauPerWau), 0),
          data.reduce((acc, cur) => acc + Number(cur.wauPerMau), 0),
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

export default MobileAUGraph;
