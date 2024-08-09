import styled from "styled-components";
import { useDateReportAPI } from "./ReportDataAPI";
import { useState } from "react";

import DateTotalReport from "./Date/DateTotalReport";
import DateAU from "./Date/DateAU";
import DateBounceRate from "./Date/DateBounceRate";
import DateView from "./Date/DateView";
import DateUsers from "./Date/DateUsers";

const GADateReport = () => {
  const [selectedVB, setSelectedVB] = useState<string>("조회수");
  const [selectedAU, setSelectedAU] = useState<string>("사용자수");
  useDateReportAPI();

  return (
    <ContentContainer>
      <DateTotalReport />
      <First>
        <SelectBox>
          <SelectComponent
            onClick={() => setSelectedVB("조회수")}
            $isSelected={selectedVB === "조회수"}
          >
            조회수
          </SelectComponent>
          <SelectComponent
            onClick={() => setSelectedVB("이탈률")}
            $isSelected={selectedVB === "이탈률"}
          >
            이탈률
          </SelectComponent>
        </SelectBox>
        <ContentBox>
          {selectedVB === "조회수" && <DateView />}
          {selectedVB === "이탈률" && <DateBounceRate />}
        </ContentBox>
      </First>
      <Second>
        <SelectBox>
          <SelectComponent2
            onClick={() => setSelectedAU("사용자수")}
            $isSelected2={selectedAU === "사용자수"}
          >
            사용자수
          </SelectComponent2>
          <SelectComponent2
            onClick={() => setSelectedAU("사용자수 비율")}
            $isSelected2={selectedAU === "사용자수 비율"}
          >
            사용자수 비율
          </SelectComponent2>
        </SelectBox>
        <ContentBox>
          {selectedAU === "사용자수" && <DateUsers />}
          {selectedAU === "사용자수 비율" && <DateAU />}
        </ContentBox>
      </Second>
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr 3fr;
  gap: 10px;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const SelectBox = styled.div`
  width: 100%; // 넓이 설정
  height: 10%; // 높이 설정
  background-color: #c2cec5; // 배경색
  border-radius: 5px; // 테두리 둥글게
  border: 1px solid #c2cec575; // 테두리 색상
  display: flex; // 플렉스로 설정

  box-sizing: border-box; // 내부 여백 포함 크기 계산
  cursor: pointer; // 커서 모양 변경

  // SelectBox 호버 시 테두리 색상 변경
  &:hover {
    border-color: #8da392;
  }
`;

const ContentBox = styled.div`
  width: 100%; // 넓이 설정
  height: 90%; // 높이 설정
  background-color: #ffffff; // 배경색
  border-radius: 5px; // 테두리 둥글게
  border: 1px solid #5f996d; // 테두리 색상
  display: flex; // 플렉스로 설정
  flex-direction: column; // 컬럼으로 설정
  justify-content: center; // 중앙 정렬
  align-items: center; // 중앙 정렬

  box-sizing: border-box; // 내부 여백 포함 크기 계산
`;

const SelectComponent = styled.div<{ $isSelected: boolean }>`
  width: 50%;
  height: 100%;
  background-color: ${({ $isSelected }) => ($isSelected ? "#5f996d" : "#fff")};
  display: flex;
  font-size: 1.5rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SelectComponent2 = styled.div<{ $isSelected2: boolean }>`
  width: 50%;
  height: 100%;
  background-color: ${({ $isSelected2 }) =>
    $isSelected2 ? "#5f996d" : "#fff"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
`;

const First = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
`;

const Second = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
`;

export default GADateReport;
