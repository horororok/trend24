import styled from "styled-components";
import { useEffect, useState } from "react";
import { RootState } from "../store/store";
import { questionType } from "../store/slices/recommendSlice";
import { useSelector } from "react-redux";
import { BookType } from "../constants/Type/Type";
import { postBookSelect } from "../apis/anonymous";

const PersonalResult = () => {
  const [bookList, setBookList] = useState<BookType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const selectedQuestion: questionType = useSelector(
    (state: RootState) => state.recommend.selectedQuestion
  );

  const selectedBook: BookType = useSelector(
    (state: RootState) => state.recommend.selectedBook
  );

  useEffect(() => {
    if (bookList.length == 0){
      postUserSelect()
        ?.then((res) => {
          console.log(res);
          setBookList(res);
        })
        .then(() => setLoading(false));
    }
  }, []);

  const postUserSelect = () => {
    try {
      return postBookSelect(selectedQuestion.id, selectedBook.bookId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Title>Q. {selectedQuestion.questionText}</Title>
      <UserBook>
        <img
          className="bookImg"
          src={`https://image.yes24.com/goods/${selectedBook.productId}/XL`}
          alt="Book Cover"
        />
        <div className="bookInfo">
          <div className="bookName">{selectedBook.productName}</div>
          <div className="bookContent">{selectedBook.contents}</div>
        </div>
      </UserBook>
      <RecommendBook>
        {loading && (
          <Loading>
            <img src="/Image/Logo/gifLogo3.gif" />
            <div>
              당신이 선택한 책과 비슷한 취향의 <br />
              다른 이용자들이 선호하는 책들을 분석하고 있습니다.
            </div>
          </Loading>
        )}
        {bookList &&
          bookList.map((li, idx) => (
            <BookImage
              key={idx}
              src={`https://image.yes24.com/goods/${li.productId}/XL`}
              alt="Book Cover"
            />
          ))}
      </RecommendBook>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  color: white;
  background-image: url("/Image/EventPage/bg.jpg");
`;

const Title = styled.div`
  font-size: 5vh;
  margin-top: 150px;
  font-weight: bold;
  padding: 20px 50px;
  width: 50%;
`;

const UserBook = styled.div`
  padding: 50px;
  width: 50%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-areas: "img info";
  grid-gap: 50px;

  .bookImg {
    grid-area: img;
    width: 100%;
    height: auto;
    box-shadow: 0px 0px 4px 7px rgba(255, 255, 255, 0.4);
  }

  .bookInfo {
    grid-area: info;
    display: flex;
    flex-direction: column;
    .bookName {
      font-size: 4rem;
      font-weight: bold;
      margin-bottom: 30px;
    }

    .bookContent {
      grid-area: content;
      padding-right: 30%;
      font-size: 2rem;
    }
  }
`;

const RecommendBook = styled.div`
  position: fixed;
  /* border: solid 1px white; */
  padding-left: 150px;
  height: 200%;
  width: 50%;
  right: 0%;
  top: -20%;
  overflow-y: scroll;
  overflow-x: hidden;
  transform: rotate(-315deg);

  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: baseline;
  flex-wrap: wrap;

  background: linear-gradient(
    to right,
    transparent,
    #e3e3e3f3,
    #e3e3e3f3,
    #e3e3e3f3,
    #e3e3e3f3,
    #e3e3e3,
    #ffffff,
    #ffffff
  );
`;
const BookImage = styled.img`
  width: 200px;
  height: auto;
  margin: 10px 15px;
  box-sizing: border-box;
  box-shadow: 1px 0px 5px 1px #67676755;

  &:hover {
    opacity: 0.8;
  }
`;

const Loading = styled.div`
  color: black;
  font-size: 2rem;
  position: fixed;
  top: 20%;
  left: 15%;
  transform: rotate(-45deg);
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 60%;
    margin-bottom: 30px;
  }
  div{
    text-align: center;
  }
`;
export default PersonalResult;
