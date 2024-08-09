import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SlLogin } from "react-icons/sl";

const ProtectedRoutes = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  // const refreshToken = localStorage.getItem("refreshToken");

  // if (!accessToken && !modalShown) {
  //   setModalShown(true);
  //   alert("로그인이 필요한 서비스입니다.");
  // }

  return accessToken ? (
    <Outlet />
  ) : (
    <Container>
      <Title>로그인이 필요합니다.</Title>
      <Button>
        <SlLogin onClick={() => navigate("/")} className="icon" />
        로그인
      </Button>
    </Container>
  );
  // return accessToken && refreshToken ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.div`
  font-size: 5rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 20px;
  background-color: #5f996d;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .icon {
    font-size: 5rem;
    padding: 10px;
  }
`;
