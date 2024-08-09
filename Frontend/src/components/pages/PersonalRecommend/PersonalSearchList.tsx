import styled from "styled-components";
import { BookType } from "../../../constants/Type/Type";
import { useNavigate } from "react-router-dom";
import { useDispatch,  } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { setBook } from "../../../store/slices/recommendSlice";

interface BookListProps {
  bookList: BookType[];
}

const PersonalSearchList = ({ bookList }: BookListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const navigate = useNavigate();

  const bookClick = (book:BookType) => {
    dispatch(setBook(book));
    navigate("/event/personal/result");
  };

  return (
    <Container>
      {bookList.map((li) => (
        <BookImage
          src={`https://image.yes24.com/goods/${li.productId}/XL`}
          alt="Book Cover"
          onClick={() => bookClick(li)}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 90%;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow-x: auto;
`;

const BookImage = styled.img`
  min-width: 100px;
  width: 8vw;
  height: auto;
  margin: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

export default PersonalSearchList;
