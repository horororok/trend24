import styled from "styled-components";
import { useCityReportAPI } from "./ReportDataAPI";

import CityUsers from "./City/CityUsers";
import CityTotalReport from "./City/CityTotalReport";

const GACityReport = () => {
  useCityReportAPI();

  return (
    <Container>
      <CityTotalReport />
      <CityUsers />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  z-index: 1;
`;

export default GACityReport;
