import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { FaRegQuestionCircle } from "react-icons/fa";

import DeviceAUGraph from "./DeviceAUGraph";
import DesktopAUGraph from "./DesktopAUGraph";
import MobileAUGraph from "./MobileAUGraph";
import TabletAUGraph from "./TabletAUGraph";

interface DeviceAUProps {
  deviceCategory: string;
  dauPerMau: string;
  dauPerWau: string;
  wauPerMau: string;
}

const DeviceAU = () => {
  const [totalDeviceAU, setTotalDeviceAU] = useState<DeviceAUProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const reportData = useSelector((state: RootState) => state.ga.deviceReport);
  const [badgeClicked, setBadgeClicked] = useState<boolean>(false);

  useEffect(() => {
    setTotalDeviceAU(
      reportData.map((data) => ({
        deviceCategory: data.dimensionValues[0].value,
        dauPerMau: data.metricValues[3].value,
        dauPerWau: data.metricValues[4].value,
        wauPerMau: data.metricValues[5].value,
      }))
    );
  }, [reportData]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handleBadgeShow = () => {
    setBadgeClicked(!badgeClicked);
  };

  return (
    <Container>
      <Title>
        <div>기기별 사용자수 비교</div>
        <select onChange={handleCategoryChange}>
          <option value="전체">전체</option>
          <option value="desktop">데스크톱</option>
          <option value="mobile">모바일</option>
          <option value="tablet">태블릿</option>
        </select>
        <Badge onClick={handleBadgeShow}>
          <FaRegQuestionCircle />
          {badgeClicked && (
            <Tooltip>
              <div>
                DAU/MAU 30일 활성 사용자 중 1일 활성 사용자 비율. 이 지표는
                소수로 반환됩니다. 예를 들어, 0.113은 30일 활성 사용자 중
                11.3%가 1일 활성 사용자였음을 의미합니다.
              </div>
              <div>
                DAU/WAU 7일 활성 사용자 중 1일 활성 사용자 비율. 이 지표는
                소수로 반환됩니다. 예를 들어, 0.082는 7일 활성 사용자 중 8.2%가
                1일 활성 사용자였음을 의미합니다.
              </div>
              <div>
                WAU/MAU 30일 활성 사용자 중 7일 활성 사용자 비율. 이 지표는
                소수로 반환됩니다. 예를 들어, 0.234는 30일 활성 사용자 중
                23.4%가 7일 활성 사용자였음을 의미합니다.
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
      <Content>
        {selectedCategory === "전체" && <DeviceAUGraph data={totalDeviceAU} />}
        {selectedCategory === "desktop" && (
          <DesktopAUGraph
            data={totalDeviceAU.filter(
              (data) => data.deviceCategory === "desktop"
            )}
          />
        )}
        {selectedCategory === "mobile" && (
          <MobileAUGraph
            data={totalDeviceAU.filter(
              (data) => data.deviceCategory === "mobile"
            )}
          />
        )}
        {selectedCategory === "tablet" && (
          <TabletAUGraph
            data={totalDeviceAU.filter(
              (data) => data.deviceCategory === "tablet"
            )}
          />
        )}
      </Content>
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
  background-color: white;
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
  width: 130px;
  height: 230px;
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
`;

export default DeviceAU;
