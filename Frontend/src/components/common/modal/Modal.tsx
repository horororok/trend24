import styled, { keyframes } from "styled-components";
import Colors from "../../../constants/Color";
import { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const [modalVisible, setModalVisible] = useState(isOpen);

  useEffect(() => {
    setModalVisible(isOpen);
  }, [isOpen]);

  const closeHandler = () => {
    setModalVisible(false);
    setTimeout(onClose, 400); // 애니메이션 시간이 0.4초이므로 모달이 사라지는 시간을 고려하여 적절한 시간 후에 onClose를 호출합니다.
  };

  return (
    <ModalWrapper $isOpen={modalVisible}>
      <Popup $isOpen={isOpen}>
        <PopupHead>
          <div className="title">Trend24</div>
          <button className="closeBtn" onClick={closeHandler}>
            X
          </button>
        </PopupHead>
        {children}
      </Popup>
    </ModalWrapper>
  );
};

const slideUp = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const ModalWrapper = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.189);
  z-index: 999;
  justify-content: center;
  align-items: center;
  animation: ${slideUp} 0.4s ease;
`;

const Popup = styled.div<{ $isOpen: boolean }>`
  background-color: white;
  width: 100%;
  max-width: 400px;
  height: 300px;
  margin: 10% auto;
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 5px 10px 10px 1px rgba(0, 0, 0, 0.3);
  animation: ${(props) => (props.$isOpen ? slideUp : slideDown)} 0.4s ease;
`;

const PopupHead = styled.div`
  border-radius: 8px 8px 0px 0px;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${Colors.sub1};
  padding: 10px 20px;
  box-sizing: border-box;

  .title {
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
  }
  .closeBtn {
    background: none;
    border: none;
    color: #ffffff;
    font-size: 24px;
    cursor: pointer;
  }
`;

export default Modal;
