import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../store/store";
import { MdDashboardCustomize } from "react-icons/md";
import { RiDragDropLine } from "react-icons/ri";
import { useEffect, useState } from "react";

import { useInitialPageAPI, useGetCustomizeTitle } from "./CustomizePageAPI";

import { Rnd } from "react-rnd";

import CityTotalReport from "../../../googleanalytics/City/CityTotalReport";
import CityUsers from "../../../googleanalytics/City/CityUsers";
import DateAU from "../../../googleanalytics/Date/DateAU";
import DateBounceRate from "../../../googleanalytics/Date/DateBounceRate";
import DateTotalReport from "../../../googleanalytics/Date/DateTotalReport";
import DateUsers from "../../../googleanalytics/Date/DateUsers";
import DateView from "../../../googleanalytics/Date/DateView";
import DeviceAU from "../../../googleanalytics/Device/DeviceAU";
import DeviceTotalReport from "../../../googleanalytics/Device/DeviceTotalReport";
import DeviceUsers from "../../../googleanalytics/Device/DeviceUsers";
import Memo from "./Memo";
import { useDispatch, useSelector } from "react-redux";
import EmptyFile from "../../../common/EmptyFile";

import { getCustomComponents, getCustomPage } from "../../../../apis/customApi";

interface ComponentProps {
  componentName: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const UserCustomizePage: React.FC = () => {
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState<string>("");
  const [initialComponentList, setInitialComponentList] = useState<
    ComponentProps[]
  >([]);

  // useEffect(() => {
  //   getCustomPage().then((res) => {
  //     setPageTitle(res.name);
  //   });
  //   getCustomComponents().then((res) => {
  //     if (Array.isArray(res)) {
  //       setInitialComponentList(res);
  //     } else {
  //       console.error("Invalid response format:", res);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [PageTitle, InitialComponentList] = await Promise.all([
          getCustomPage(),
          getCustomComponents(),
        ]);
        if (Array.isArray(InitialComponentList)) {
          setPageTitle(PageTitle.name);
          setInitialComponentList(InitialComponentList);
        } else {
          console.error("Invalid response format:", InitialComponentList);
        }
        setPageTitle(PageTitle.name);
      } catch (error) {
        console.error("Error fetching custom components:", error);
      }
    };
    fetchData();
  }, []);

  const showEditPage = () => {
    navigate("/main/custom");
  };

  const componentMap: { [key: string]: JSX.Element } = {
    CityTotalReport: <CityTotalReport />,
    CityUsers: <CityUsers />,
    DateAU: <DateAU />,
    DateBounceRate: <DateBounceRate />,
    DateTotalReport: <DateTotalReport />,
    DateUsers: <DateUsers />,
    DateView: <DateView />,
    DeviceAU: <DeviceAU />,
    DeviceTotalReport: <DeviceTotalReport />,
    DeviceUsers: <DeviceUsers />,
    Memo: <Memo />,
  };

  return (
    <Container>
      <TitleContainer>
        <Title>
          <MdDashboardCustomize className="icon" /> {pageTitle}
        </Title>

        {initialComponentList.length > 0 && (
          <BtnBox>
            <EditBtn onClick={showEditPage}>
              <RiDragDropLine className="icon" />
              편집
            </EditBtn>
          </BtnBox>
        )}
      </TitleContainer>
      <ContentContainer>
        {initialComponentList.length === 0 ? (
          <EmptyFile showEditPage={showEditPage} />
        ) : (
          initialComponentList.map((item) => (
            <Rnd
              key={item.componentName}
              size={{ width: item.size.width, height: item.size.height }}
              position={{ x: item.position.x, y: item.position.y }}
              disableDragging={true}
              enableResizing={{
                bottom: false,
                bottomLeft: false,
                bottomRight: false,
                left: false,
                right: false,
                top: false,
                topLeft: false,
                topRight: false,
              }}
            >
              <Box>{componentMap[item.componentName]}</Box>
            </Rnd>
          ))
        )}
      </ContentContainer>
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
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
`;

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #000;
  text-align: start;
  flex: 2;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 20px 10px;
  .icon {
    font-size: 3rem;
    color: #313131;
    margin-right: 10px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;

const EditBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 2rem;

  .icon {
    font-size: 4rem;
    margin-right: 10px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
`;

const Box = styled.div`
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
`;

export default UserCustomizePage;
