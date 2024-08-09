import styled from "styled-components";

const ViewModal = ({ toggleViewModal }: { toggleViewModal: () => void }) => {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // 이벤트 버블링 방지
  };

  return (
    <Background onClick={toggleViewModal}>
      <ViewModalContainer onClick={handleBackgroundClick}>
        <ViewModalTitle>보기 방식 변경</ViewModalTitle>
        <ViewModalContent>
          <ViewModalBtn>리스트</ViewModalBtn>
          <ViewModalBtn>그리드</ViewModalBtn>
        </ViewModalContent>
        <ViewModalBtn onClick={toggleViewModal}>닫기</ViewModalBtn>
      </ViewModalContainer>
    </Background>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ViewModalContainer = styled.div`
  width: 300px;
  height: 200px;
  background-color: #fff; /* 모달 배경색 */
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ViewModalTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ViewModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ViewModalBtn = styled.button`
  width: 100%;
  height: 30px;
`;

export default ViewModal;
