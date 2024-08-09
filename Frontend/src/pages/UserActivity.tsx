import styled from "styled-components";
import { useState } from "react";

import GADateReport from "../components/googleanalytics/GADateReport";
import GACityReport from "../components/googleanalytics/GACityReport";
import GADeviceReport from "../components/googleanalytics/GADeviceReport";

import {
  useCityReportAPI,
  useDateReportAPI,
  useDeviceReportAPI,
} from "../components/googleanalytics/ReportDataAPI";
import BookClicks from "../components/pages/useractivity/user/BookClicks";
import KeywordViews from "../components/pages/useractivity/user/KeywordViews";

const UserActivity = () => {
  const [selectedReport, setSelectedReport] = useState<string>("날짜별");
  const [selectedLabel, setSelectedLabel] = useState<string>("날짜별");

  useDateReportAPI();
  useCityReportAPI();
  useDeviceReportAPI();

  const handleSelectLabel = (label: string) => {
    setSelectedReport(label);
    setSelectedLabel(label);
  };

  return (
    <PageContainer>
      <GAContentContainer>
        <SelectContainer>
          <DateLabel
            onClick={() => handleSelectLabel("날짜별")}
            $isSelected={selectedLabel === "날짜별"}
          >
            날짜별
          </DateLabel>
          <CityLabel
            onClick={() => handleSelectLabel("도시별")}
            $isSelected={selectedLabel === "도시별"}
          >
            도시별
          </CityLabel>
          <DeviceLabel
            onClick={() => handleSelectLabel("기기별")}
            $isSelected={selectedLabel === "기기별"}
          >
            기기별
          </DeviceLabel>
        </SelectContainer>

        {selectedReport === "날짜별" && <GADateReport />}
        {selectedReport === "도시별" && <GACityReport />}
        {selectedReport === "기기별" && <GADeviceReport />}
      </GAContentContainer>
      <EventContentContainer>
        <BookClicks />
        <KeywordViews />
      </EventContentContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const GAContentContainer = styled.div`
  position: relative;
  padding: 10px;
  flex: 1 0 0;
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const SelectContainer = styled.div`
  position: absolute;
  top: 5%;
  left: -1%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 3%;
  height: 30%;
`;

const DateLabel = styled.div<{ $isSelected: boolean }>`
  width: 100%;
  height: 33%;
  background-color: ${({ $isSelected }) => ($isSelected ? "#5f996d" : "#fff")};
  z-index: ${({ $isSelected }) => ($isSelected ? 2 : 0)};
  display: flex;
  align-items: center;

  cursor: pointer;
`;

const CityLabel = styled.div<{ $isSelected: boolean }>`
  width: 100%;
  height: 33%;
  background-color: ${({ $isSelected }) => ($isSelected ? "#5f996d" : "#fff")};
  z-index: ${({ $isSelected }) => ($isSelected ? 2 : 0)};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const DeviceLabel = styled.div<{ $isSelected: boolean }>`
  width: 100%;
  height: 33%;
  background-color: ${({ $isSelected }) => ($isSelected ? "#5f996d" : "#fff")};
  z-index: ${({ $isSelected }) => ($isSelected ? 2 : 0)};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const EventContentContainer = styled.div`
  padding: 10px;
  width: 100%;
  flex: 1 0 0;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  box-sizing: border-box;
`;

export default UserActivity;
