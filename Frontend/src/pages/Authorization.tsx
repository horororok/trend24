import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaKey } from "react-icons/fa";
import { signIn } from "../apis/authApi";
import { useNavigate } from "react-router-dom";
import { PiArrowFatLeft } from "react-icons/pi";

import {
  LoginSuccessModal,
  LoginFailModal,
} from "../components/common/modal/LoginModal";

const Login = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState(""); // ID 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태

  const [loginSuccessModalOpen, setLoginSuccessModalOpen] = useState(false);
  const [loginFailModalOpen, setLoginFailModalOpen] = useState(false);

  // ID 입력 상자 변경 이벤트 핸들러
  const handleUserIdChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setUserId(value); // ID 상태 업데이트
  };

  // 비밀번호 입력 상자 변경 이벤트 핸들러
  const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setPassword(value); // ID 상태 업데이트
  };

  const onClose = () => {
    setLoginSuccessModalOpen(false);
    setLoginFailModalOpen(false);
  };

  // 로그인 버튼 클릭 이벤트 핸들러
  const handleLogin = async () => {
    try {
      const res = await signIn(userId, password); // signIn 함수의 처리를 기다림
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("userName", res.name);
      setLoginSuccessModalOpen(true);
    } catch (error) {
      setLoginFailModalOpen(true);
      console.log(error);
    }
  };

  const gotoEvent = () => {
    navigate("/event");
  };

  return (
    <Container>
      {loginSuccessModalOpen && (
        <LoginSuccessModal isOpen={loginSuccessModalOpen} onClose={onClose} />
      )}
      {loginFailModalOpen && (
        <LoginFailModal isOpen={loginFailModalOpen} onClose={onClose} />
      )}
      <GotoEventPage>
        <EventLogo onClick={gotoEvent}>
          <img src="/Image/Logo/gifLogo3.gif" />
        </EventLogo>
        <EventText>
          <PiArrowFatLeft className="icon" />
          클릭시
          <br /> 추천 페이지로 이동
        </EventText>
      </GotoEventPage>
      <LoginFormContainer>
        <LoginFormRightSide>
          <div className="title">
            <img className="logo" src="/Image/Logo/logo2.png" />
          </div>
          <div className="description">
            환영합니다!
            <br />
            트렌드 기반 도서 추천 플랫폼입니다. <br />
            <br />
            각종 카테고리의 트렌드 키워드와 <br />
            관련 도서 리스트를 제공하여 <br />
            도서 트렌드를 놓치지 않도록 도와드립니다.
          </div>
        </LoginFormRightSide>

        <LoginFormLeftSide>
          <LoginInputContainer>
            <LoginInputWrap>
              <FaRegEnvelope className="icon" />
              <input
                placeholder="ID"
                type="text"
                value={userId} // ID 입력 상자에 상태 값 연결
                onChange={handleUserIdChange} // ID 입력 변경 이벤트 핸들러
              />
            </LoginInputWrap>
            <LoginInputWrap>
              <FaKey className="icon" />
              <input
                placeholder="Password"
                type="password"
                value={password} // 비밀번호 입력 상자에 상태 값 연결
                onChange={handlePasswordChange} // 비밀번호 입력 변경 이벤트 핸들러
              />
            </LoginInputWrap>
          </LoginInputContainer>
          <LoginButtonWrap>
            <button onClick={handleLogin}>Login</button>
            <div>Forgot password?</div>
          </LoginButtonWrap>
        </LoginFormLeftSide>
      </LoginFormContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #eff0f2;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

const GotoEventPage = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  display: flex;
  width: 20%;
  height: 10%;
`;

const EventLogo = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  /* transform: skew(20);
   */
  transform: rotate(-20deg);

  cursor: pointer;

  img {
    height: 100%;
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(10px);
  }
`;

const EventText = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3rem;
  color: #001638;

  .icon {
    font-size: 4rem;
    animation: ${bounce} 2s infinite;
  }
`;

const LoginFormContainer = styled.div`
  background: #f5f5f5;
  width: 50%;
  height: 70%;
  min-height: 600px;
  min-width: 1000px;
  display: flex;
  flex-direction: row;
  box-shadow: 10px black;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.228);
`;

const LoginFormRightSide = styled.div`
  width: 50%;
  border-radius: 10px 0px 0px 10px;
  padding: 75px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-image: radial-gradient(
    ellipse farthest-corner at 0 140%,
    #001638 0%,
    #637ca1 70%,
    #637ca1d0 70%
  );

  .title {
    color: white;
    width: 100%;
    text-align: right;
    opacity: 0.9;
    .logo {
      width: 100%;
    }
  }
  .description {
    padding: 15px 10px;
    font-size: 1.8rem;
    opacity: 0.5;
  }
`;

const LoginFormLeftSide = styled.div`
  width: 50%;
  border-radius: 0px 10px 10px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    287deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(243, 244, 244, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
`;

const LoginInputContainer = styled.div`
  width: 300px;

  .icon {
    color: #001638;
    line-height: 45px;
  }

  input {
    background: none;
    border: none;
    line-height: 45px;
    padding-left: 10px;
    width: 267px;

    &:focus {
      outline: none;
    }
  }
`;

const LoginInputWrap = styled.div`
  width: 300px;
  height: 45px;
  margin-top: 20px;
  border-radius: 2px;
  border-bottom: solid 2px #001638;
`;

const LoginButtonWrap = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    cursor: pointer;
    width: 120px;
    height: 50px;
    color: white;
    border: 0;
    border-radius: 4px;
    font-size: 2rem;
    background: rgb(105, 163, 255);
    background: linear-gradient(162deg, #001638 0%, #637ca1 70%, #637ca1d0 70%);

    &:hover {
      opacity: 0.7;
      transition: opacity 0.3s ease;
    }
  }
  div {
    margin-top: 10px;
    text-decoration: none;
    font-size: 11px;
    color: gray;
  }
`;

export default Login;
