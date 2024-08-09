import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/sidebar/Sidebar";
import styled from "styled-components";
import Colors from "../constants/Color";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Container>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Main $sidebarOpen={sidebarOpen}>
        <Outlet />
      </Main>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${Colors.screenBackground};
`;

const Main = styled.main<{ $sidebarOpen: boolean }>`
  padding: 10px 20px 10px 10px;
  height: 100%;
  flex: 1;
  box-sizing: border-box;

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* 스크롤바 막대 설정*/
  ::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 30px;
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
`;

export default Dashboard;
