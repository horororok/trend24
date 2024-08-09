import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { FaRegQuestionCircle } from "react-icons/fa";

import DateBounceRateGraph from "./DateBounceRateGraph";

interface BRDataProps {
  date: string;
  bounceRate: string;
}

const DateBounceRate = () => {
  const [totalBounceRateData, setTotalBounceRateData] = useState<BRDataProps[]>(
    []
  );
  const reportData = useSelector((state: RootState) => state.ga.dateReport);
  const [badgeClicked, setBadgeClicked] = useState<boolean>(false);

  useEffect(() => {
    setTotalBounceRateData(
      reportData.map((data) => ({
        date: data.dimensionValues[0].value,
        bounceRate: data.metricValues[7].value,
      }))
    );
  }, [reportData]);

  const handleBadgeShow = () => {
    setBadgeClicked(!badgeClicked);
  };

  return (
    <Container>
      <Title>
        <div>날짜별 이탈률</div>

        <Badge onClick={handleBadgeShow}>
          <FaRegQuestionCircle />
          {badgeClicked && (
            <Tooltip>
              <div>
                이탈률 (bounce rate) 참여하지 않은 세션의 비율 ((세션 수 -
                참여한 세션 수) / 세션 수). 이 지표는 소수로 반환됩니다. 예를
                들어, 0.2761은 세션의 27.61%가 이탈했음을 의미합니다.
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
      <DateBounceRateGraph data={totalBounceRateData} />
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
export default DateBounceRate;
