import styled from "styled-components";
import { useDeviceReportAPI } from "./ReportDataAPI";
import DeviceUsers from "./Device/DeviceUsers";
import DeviceAU from "./Device/DeviceAU";

import DeviceTotalReport from "./Device/DeviceTotalReport";

const GADateReport = () => {
  useDeviceReportAPI();

  return (
    <ContentContainer>
      <DeviceTotalReport />
      <DeviceUsers />
      <DeviceAU />
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr 3fr;
  gap: 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  z-index: 1;
`;

export default GADateReport;
