import styled from "styled-components";

const AddBookModal = ({
  toggleAddBookModal,
}: {
  toggleAddBookModal: () => void;
}) => {
  return (
    <AddBookModalContainer>
      <AddBookModalTitle>책 추가</AddBookModalTitle>
      <AddBookModalContent>
        <AddBookModalInput placeholder="책 제목" />
        <AddBookModalInput placeholder="저자" />
        <AddBookModalInput placeholder="출판사" />
        <AddBookModalInput placeholder="출판일" />
        <AddBookModalInput placeholder="책 이미지" />
        <AddBookModalBtn>추가</AddBookModalBtn>
      </AddBookModalContent>
      <AddBookModalBtn onClick={toggleAddBookModal}>닫기</AddBookModalBtn>
    </AddBookModalContainer>
  );
};

const AddBookModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddBookModalTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const AddBookModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddBookModalInput = styled.input`
  width: 100%;
  height: 30px;
`;

const AddBookModalBtn = styled.button`
  width: 100%;
  height: 30px;
`;

export default AddBookModal;
