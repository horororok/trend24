import styled from "styled-components";
import PersonalSearchBox from "../components/pages/PersonalRecommend/PersonalSearchBox";
import PersonalSearchList from "../components/pages/PersonalRecommend/PersonalSearchList";
import { useState, useRef } from "react";
import { BookType } from "../constants/Type/Type";
import { gsap } from "gsap";
import { getSearchBook } from "../apis/anonymous";

const PersonalSearch = () => {
  const [bookList, setBookList] = useState<BookType[]>([]);
  const [isSearchBoxMoved, setIsSearchBoxMoved] = useState<boolean>(false);
  const searchBoxRef = useRef(null);
  const searchListRef = useRef(null);
  const circleRef = useRef(null);

  const getBookList = async (bookName: string) => {
    try {
      return await getSearchBook(bookName);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchClick = (searchBookText: string) => {
    if (searchBookText !== "") {
      getBookList(searchBookText).then((res) => setBookList(res));
    }

    setIsSearchBoxMoved(true);
    gsap.to(searchBoxRef.current, { x: "-3%", duration: 0.5 });
    gsap.from(searchListRef.current, {
      x: "100%",
      duration: 1.2,
      ease: "back.out(1)",
    });
    gsap.from(circleRef.current, {
      x: "50%",
      duration: 1.2,
      ease: "back.out(1)",
    });
  };

  return (
    <Container>
      <SearchWrapper ref={searchBoxRef}>
        <PersonalSearchBox onSearchClick={handleSearchClick} />
      </SearchWrapper>
      <BookListWrapper ref={searchListRef} $isVisible={isSearchBoxMoved}>
        <Description>도서를 클릭해주세요.</Description>
        <PersonalSearchList bookList={bookList} />
      </BookListWrapper>
      <Background ref={circleRef} $isVisible={isSearchBoxMoved}></Background>
    </Container>
  );
};

const Container = styled.div`
  @font-face {
    font-family: "Chosunilbo_myungjo";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/Chosunilbo_myungjo.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  font-family: Chosunilbo_myungjo;

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  box-sizing: border-box;
  /* transform: rotate(10deg); */
  background-image: url("/Image/EventPage/bg.jpg");
  background-repeat: repeat;
  align-items: center;
  color: white;
  overflow: hidden;
  position: relative;
`;

const SearchWrapper = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  z-index: 1;
`;

const Description = styled.div`
  position: absolute;
  top: 5%;
  font-size: 3rem;
  opacity: 0.6;
`;

const BookListWrapper = styled.div<{ $isVisible: boolean }>`
  width: 30%;
  /* position: relative; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  display: ${(props) => (props.$isVisible ? "visible" : "hidden")};
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.5s ease;
  z-index: 3;
`;

const Background = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  right: -22%;
  width: 60%;
  height: 130%;
  border-radius: 100% 0 0 100%;
  background: linear-gradient(to left, #4e4e4ec0, #e3e3e3c0, #ffffffc0);
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.5s ease;
  /* z-index: 1; */
  overflow: hidden;
`;

export default PersonalSearch;
