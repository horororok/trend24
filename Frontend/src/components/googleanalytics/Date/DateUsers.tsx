import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { FaRegQuestionCircle } from "react-icons/fa";

import DateUsersGraph from "./DateUsersGraph";

interface DateReportProps {
  date: string;
  activeUsers: string;
  totalUsers: string;
  newUsers: string;
}

const DateUsers = () => {
  const dateReport = useSelector((state: RootState) => state.ga.dateReport);
  const [Users, setUsers] = useState<DateReportProps[]>([]);
  const [badgeClicked, setBadgeClicked] = useState<boolean>(false);

  useEffect(() => {
    setUsers(
      dateReport.map((data) => ({
        date: data.dimensionValues[0].value,
        activeUsers: data.metricValues[0].value,
        totalUsers: data.metricValues[1].value,
        newUsers: data.metricValues[2].value,
      }))
    );
  }, [dateReport]);

  const handleBadgeShow = () => {
    setBadgeClicked(!badgeClicked);
  };

  return (
    <Container>
      <Title>
        <div>날짜별 사용자 수</div>

        <Badge onClick={handleBadgeShow}>
          <FaRegQuestionCircle />
          {badgeClicked && (
            <Tooltip>
              <div>
                활성 사용자 (activeUsers) 귀하의 사이트나 앱을 방문한 고유
                사용자 수.
              </div>
              <div>
                신규 사용자 (newUsers) 귀하의 사이트와 처음 상호작용했거나 앱을
                처음 실행한 사용자 수 (트리거된 이벤트: first_open 또는
                first_visit).
              </div>
              <div>
                총 사용자 (totalUsers) 사이트나 앱이 사용 중이었는지 여부와
                상관없이 최소 하나의 이벤트를 기록한 고유 사용자 수.
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
      <DateUsersGraph data={Users} />
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
  height: 200px;
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

export default DateUsers;
