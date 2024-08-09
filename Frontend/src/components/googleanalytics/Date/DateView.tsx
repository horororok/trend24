import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

import DateViewGraph from "./DateViewGraph";

interface ViewDataProps {
  date: string;
  screenPageViews: string;
}

const DateView = () => {
  const [totalViewData, setTotalViewData] = useState<ViewDataProps[]>([]);
  const reportData = useSelector((state: RootState) => state.ga.dateReport);
  const [badgeClicked, setBadgeClicked] = useState<boolean>(false);

  useEffect(() => {
    setTotalViewData(
      reportData.map((data) => ({
        date: data.dimensionValues[0].value,
        screenPageViews: data.metricValues[6].value,
      }))
    );
  }, [reportData]);

  const handleBadgeShow = () => {
    setBadgeClicked(!badgeClicked);
  };

  return (
    <Container>
      <Title>
        <div>날짜별 조회수</div>

        <Badge onClick={handleBadgeShow}>
          <FaRegQuestionCircle />
          {badgeClicked && (
            <Tooltip>
              <div>
                스크린 페이지 조회수 (screen page view) 사용자가 본 앱 화면 또는
                웹 페이지 수. 단일 페이지나 화면의 반복된 조회수도 포함됩니다
                (screen_view + page_view 이벤트).
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  right: "1px",
                  cursor: "pointer",
                }}
              >
                x
              </div>
            </Tooltip>
          )}
        </Badge>
      </Title>
      <DateViewGraph data={totalViewData} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  height: 10%;
`;

const Badge = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
`;

const Tooltip = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  width: 180px;
  height: 100px;
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

export default DateView;
