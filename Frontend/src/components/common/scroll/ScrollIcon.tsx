import styled from "styled-components";

const ScrollIcon = () => {
  return (
    <>
      <Scroll />
      Scroll
    </>
  );
};
export default ScrollIcon;

const Scroll = styled.div`
  width: 50px;
  height: 90px;
  border: 3px solid #ffffff79;
  border-radius: 60px;
  margin-bottom: 10px;
  &::before {
    content: "";
    width: 15px;
    height: 15px;
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #cacaca;
    border-radius: 50%;
    opacity: 1;
    animation: wheel 2s infinite;
    -webkit-animation: wheel 2s infinite;
  }
  @keyframes wheel {
    to {
      opacity: 0;
      top: 70%;
    }
  }

  @-webkit-keyframes wheel {
    to {
      opacity: 0;
      top: 70%;
    }
  }
`;
