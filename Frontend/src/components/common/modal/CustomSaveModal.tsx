import styled from "styled-components";

const CustomSaveModal = ({
  saveList,
  cancelChange,
}: {
  saveList: () => void;
  cancelChange: () => void;
}) => {
  return (
    <Container>
      <Modal>
        <Title>Do you want to save changes?</Title>
        <ButtonContainer>
          <Button onClick={saveList}>Save</Button>
          <Button onClick={cancelChange}>Cancel</Button>
        </ButtonContainer>
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Modal = styled.div`
  background-color: white;
  width: 50%;
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
`;

const Title = styled.div`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #000;
`;

export default CustomSaveModal;
