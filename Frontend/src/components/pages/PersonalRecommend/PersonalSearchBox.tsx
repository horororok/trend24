import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import QuestionCard from "./QuestionCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { BookType } from "../../../constants/Type/Type";
import { getQuestionBooks } from "../../../apis/anonymous";
import { questionType } from "../../../store/slices/recommendSlice";

interface PersonalSearchBoxProps {
  onSearchClick: (text: string) => void;
}

const PersonalSearchBox = ({ onSearchClick }: PersonalSearchBoxProps) => {
  const [searchBookText, setSearchBookText] = useState<string>("");
  const [hashTagList, setHashTagList] = useState<BookType[]>([]);

  const cardData: questionType = useSelector(
    (state: RootState) => state.recommend.selectedQuestion
  );

  const getHashTagList = async (questionId: number) => {
    try {
      return await getQuestionBooks(questionId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHashTagList(cardData.id).then((res) => {
      if (res.length !== 0) {
        setHashTagList(res);
      }
    });
  }, []);

  // 도서 입력창 변경 이벤트
  const changeText = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setSearchBookText(value);
  };

  // 도서 검색 클릭 이벤트
  const searchClick = () => {
    if (searchBookText == "") {
      alert("검색어를 입력해주세요");
    } else {
      onSearchClick(searchBookText);
    }
  };

  // 해시태그 클릭 이벤트
  const hashTagClick = (bookName: string) => {
    setSearchBookText(bookName);
    onSearchClick(bookName);
  };

  return (
    <Container>
      <Wrapper>
        <QuestionCard cardClick={() => {}} cardData={cardData} />
        <SearchContainer>
          <Title>
            당신의 기억 속에 있는
            <br />
            책을 열어보세요.
          </Title>
          <InputBoxContainer>
            <input
              onChange={changeText}
              value={searchBookText}
              placeholder="도서 검색"
            />
            <FaSearch className="searchBtn" onClick={searchClick} />
          </InputBoxContainer>
        </SearchContainer>
      </Wrapper>

      <HashTagTitle>다른 사람들이 많이 클릭한 도서 목록</HashTagTitle>
      <HashTagWrapper>
        {hashTagList.length !== 0 &&
          hashTagList.slice(0, 10).map((li, idx) => (
            <HashTag key={idx} onClick={() => hashTagClick(li.productName)}>
              <div># {li.productName}</div>
              <div className="bookHover">
                <img
                  src={`https://image.yes24.com/goods/${li.productId}/XL`}
                  alt="Book Cover"
                />
              </div>
            </HashTag>
          ))}
      </HashTagWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: black;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  margin-top: 15%;
  color: white;
`;

const Title = styled.div`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 20px;
  flex: 1;
`;

const InputBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 6rem;
  align-items: center;

  input {
    font-size: 2rem;
    height: 80px;
    width: 100%;
    min-width: 350px;
    margin-right: 10px;
    border-radius: 10px;
    border: 3px solid #e1e1e1e1;
    background-color: #ffffffa2;
    padding: 10px;
    box-sizing: border-box;
  }

  .searchBtn {
    border: 3px solid #e1e1e1e1;
    background-color: #ffffffa2;
    padding: 7px 15px;
    border-radius: 10px;
  }
`;

const HashTagTitle = styled.div`
  justify-self: flex-start;
  font-size: 3rem;
  font-weight: bold;
  height: 100%;
  width: 70%;
  margin: 10px 10px;
`;

const HashTagWrapper = styled.div`
  height: 100%;
  width: 70%;
  flex-wrap: wrap;
  font-size: 2.5rem;
  line-height: 5rem;
  display: flex;
  flex-direction: row;
`;

const HashTag = styled.div`
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: #ffffff6c;
    border-radius: 20px;
    transition: background-color 0.5s ease;
  }
  div {
    margin: 0px 10px;
  }
  .bookHover {
    opacity: 0;
    position: absolute;
    top: -220px;
    height: 200px;
    background-color: #ffffff5d;
    visibility: hidden;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    img {
      height: 100%;
      box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 0.516);
    }
  }
  &:hover .bookHover {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.5s ease;
  }
`;

export default PersonalSearchBox;
