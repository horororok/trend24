import styled from "styled-components";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";

const Event = () => {
  const navigate = useNavigate();

  const gotoHome = () => {
    navigate("/event");
  };

  return (
    <Container>
      <Logo onClick={gotoHome}>
        <img src="/Image/Logo/gifLogo2.gif" alt="logo" />
      </Logo>
      <Outlet />
    </Container>
  );
};

const Logo = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9%;
  height: auto;
  padding: 10px;
  z-index: 999;
  img {
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
`;

export default Event;
