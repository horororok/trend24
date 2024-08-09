import styled from "styled-components";

const EmptyFile = ({ showEditPage }: { showEditPage: () => void }) => {
  return (
    <EmptyContainer>
      <EmptyImg />
      <AddDataContainer>
        <Text>
          <h1>데이터를</h1>
          <h1>추가해주세요</h1>
        </Text>
        <ButtonContainer>
          <AddComponentButton onClick={showEditPage}>+</AddComponentButton>
        </ButtonContainer>
      </AddDataContainer>
    </EmptyContainer>
  );
};

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const EmptyImg = styled.div`
  width: 50%;
  height: 80%;
  background-image: url("/Image/Logo/logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const AddDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  font-size: 3rem;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
`;

const AddComponentButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  width: 100px;
  height: 100%;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
`;

export default EmptyFile;
