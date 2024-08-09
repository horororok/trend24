import React from "react";
import { useState, useEffect } from "react";
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

interface BookClickDataProps {
  date: string;
  count: number;
}

interface BookClickGraphProps {
  data: BookClickDataProps[];
}

const options = {
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
  maintainAspectRatio: false,
};

const BookClickGraph: React.FC<BookClickGraphProps> = ({ data }) => {
  const [weekdata, setWeekdata] = useState<BookClickDataProps[]>([]);
  useEffect(() => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // 월(month)과 일(day)을 올바르게 포맷팅하는 함수
    const formatNumber = (num: number) => `0${num}`.slice(-2);

    // const today = `${year}-${formatNumber(month + 1)}-${formatNumber(day)}`;
    // Date 객체를 사용하여 7일 전 날짜를 정확하게 계산
    // const lastWeekDate = new Date(year, month, day - 7);
    // const lastweek = `${lastWeekDate.getFullYear()}-${formatNumber(
    //   lastWeekDate.getMonth() + 1
    // )}-${formatNumber(lastWeekDate.getDate())}`;

    const weekdates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(year, month, day - i);
      return `${d.getFullYear()}-${formatNumber(
        d.getMonth() + 1
      )}-${formatNumber(d.getDate())}`;
    });

    setWeekdata(
      weekdates.map((date) => {
        const weeklyData = data.find((d) => d.date === date);
        return {
          date,
          count: weeklyData ? weeklyData.count : 0,
        };
      })
    );
  }, [data]);

  const chartData = {
    labels: weekdata.map((d) => d.date),
    datasets: [
      {
        label: "클릭 수",
        data: weekdata.map((d) => d.count),
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
  width: 80%;
  height: 80%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;
export default BookClickGraph;
