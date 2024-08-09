import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import BookScroll from "./BookScroll";
import WordCloudComponent from "./WordCloudComponent";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { postBookClick, getWordCloudData } from "../../../apis/anonymous";
import React from "react";
import ScrollIcon from "../../common/scroll/ScrollIcon";
import { BookType } from "../../../constants/Type/Type";

interface keywordsProps {
  name: string;
  freq: number;
}

interface DataProps {
  name: string;
  keywords: keywordsProps[];
  books: BookType[];
}

interface categoryType {
  categoryId: number;
  categoryEngName: string;
  categoryKorName: string;
}

const GeneralRecommendBook = () => {
  const location = useLocation();
  const [bookData, setBookData] = useState<DataProps[]>([]);
  const [category, setCategory] = useState<categoryType>();
  const bookContainerRef = useRef<HTMLDivElement>(null);
  const bookImgRef = useRef<(HTMLDivElement | null)[]>([]);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const [showScrollBook, setShowScrollBook] = useState<boolean>(false);
  const [selectedBookInfo, setSelectedBookInfo] = useState<BookType | null>(
    null
  );

  // BR-03 카테고리별 키워드 및 도서 목록(워드클라우드)
  const getwordCloud = async () => {
    try {
      if (category) return await getWordCloudData(category.categoryId, null);
    } catch (error) {
      console.log(error);
    }
  };

  // BR-01 도서 및 키워드 클릭 수 올리기
  const postClick = async (bookId: number, keyword:string) => {
    try {
      if (category) return await postBookClick(bookId, category.categoryId, keyword);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // gsap과 ScrollTrigger 플러그인이 로드되었는지 확인
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bookImgRef.current, // 트리거가 될 요소
        start: "top center", // 애니메이션이 시작되는 스크롤 위치
        end: "bottom center", // 애니메이션이 끝나는 스크롤 위치
        scrub: 1, // 스크롤에 따라 애니메이션 지연 없이 바로 반응하도록 설정
      },
    });

    // 'keyframes' 대신 직접적인 속성 변화를 사용하여 애니메이션 정의
    tl.to(bookImgRef.current, {
      // scale: 2, // 최종적으로 도달할 스케일 값
      duration: 1, // 애니메이션 지속 시간
      ease: "linear", // 애니메이션 속도 곡선
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      //       스크롤은 viewheight의 2배만큼 움직임
      // 1080의 경우 2160

      // 결국 가로로 움직임은 0부터 100사이
      // 이걸 가지고 나눠줄 수를 구해줘야 함.

      // viewHeight * 2 / 100 -> 스크롤 움직임 가능 횟수

      // (-1 * verticalScrollPosition) / 18
      // -> 18에 해당 하는 값이
      // viewHeight * 2 / 100
      // 이 값보다 작아야 함.

      // floor 해주면 될듯
      const verticalScrollPosition = window.scrollY; // 수직 스크롤 위치를 가져옵니다.
      const viewHeight = window.innerHeight; // 브라우저 화면의 높이를 가져옵니다.
      const horizontalScrollPosition =
        (-1 * verticalScrollPosition) / Math.floor((viewHeight * 2) / 100);
      if (bookContainerRef.current !== null) {
        if (horizontalScrollPosition < -100) {
          // 가로 스크롤 위치가 -100vw 미만이면, -100vw로 고정합니다.
          bookContainerRef.current.style.transform = `translateX(-100vw)`;
        } else if (horizontalScrollPosition < 0) {
          // 가로 스크롤 위치가 0vw 미만이면, 0vw로 고정합니다.
          bookContainerRef.current.style.transform = `translateX(${horizontalScrollPosition}vw)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll); // 스크롤 이벤트를 등록합니다.

    return () => {
      window.removeEventListener("scroll", handleScroll); // 컴포넌트가 언마운트될 때, 스크롤 이벤트를 제거합니다.
    };
  }, []);

  useEffect(() => {
    try {
      getwordCloud().then((res) => {
        const filterData = res.filter(
          (element: DataProps) => element.name === category!.categoryEngName
        );
        setBookData(filterData);
        console.log(filterData);
      });
    } catch (error) {
      console.log(error);
    }
  }, [category]);

  useEffect(() => {
    const Category = location.state.title;
    if (Category === "NEWS") {
      setCategory({
        categoryId: 1,
        categoryEngName: "NEWS",
        categoryKorName: "뉴스",
      });
    } else if (Category === "IT") {
      setCategory({
        categoryId: 2,
        categoryEngName: "IT",
        categoryKorName: "IT",
      });
    } else if (Category === "ANIMAL") {
      setCategory({
        categoryId: 3,
        categoryEngName: "ANIMAL",
        categoryKorName: "동물",
      });
    } else if (Category === "ENTERTAINMENT") {
      setCategory({
        categoryId: 5,
        categoryEngName: "ENTERTAINMENT",
        categoryKorName: "엔터테인먼트",
      });
    } else if (Category === "NEWMEDIA") {
      setCategory({
        categoryId: 6,
        categoryEngName: "NEWMEDIA",
        categoryKorName: "뉴미디어",
      });
    }
  }, []);

  useEffect(() => {
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    setWidth((innerWidth / 16) * 6);
    setHeight((innerHeight / 9) * 6);
  }, []);

  const showBook = (book: BookType) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setSelectedBookInfo(book); // 선택된 책의 정보를 저장
    setShowScrollBook(true);
  };

  const toggleBack = () => {
    setShowScrollBook(false);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const bookClick = (bookId:number, keyword:string[]) => {
    const keywordStr = keyword.join(',');
    postClick(bookId, keywordStr).then((res) => console.log(res));
  };

  return (
    <Con>
      <Container>
        <ScrollWrapper>
          <ScrollIcon />
        </ScrollWrapper>
        <WordContainer>
          <TitleText> {category?.categoryKorName}</TitleText>
          <WordCloudComponent
            width={width}
            height={height}
            showControls={false}
            wordList={bookData.length == 1 ? bookData[0].keywords : []}
          />
        </WordContainer>
        {showScrollBook ? (
          <BookScroll back={toggleBack} bookInfo={selectedBookInfo} /> // 선택된 책의 정보를 prop으로 전달
        ) : (
          <Section>
            <StyledBookContainer ref={bookContainerRef}>
              {bookData.map((element) => (
                <React.Fragment key={element.name}>
                  {element.books.map((book, index) => (
                    <Book key={book.bookId} >
                      <BookImg ref={(el) => (bookImgRef.current[index] = el)}>
                        <img
                          src={`https://image.yes24.com/goods/${book.productId}/XL`}
                          alt="Book Cover"
                        />
                      </BookImg>
                      <TextArea>
                        <div className="title">{book.productName}</div>
                        {book.keywords.map((keyword, index) => (
                          <div key={index}># {keyword}</div>
                        ))}
                        <div className="button" onClick={() => {
                          bookClick(book.bookId, book.keywords);
                          showBook(book)}}>
                          책 소개
                        </div>
                      </TextArea>
                    </Book>
                  ))}
                </React.Fragment>
              ))}
            </StyledBookContainer>
          </Section>
        )}
      </Container>
    </Con>
  );
};
const Con = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300vh;
  contain: paint;
  box-sizing: border-box;
`;

const Container = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-image: url("/Image/EventPage/GeneralRecommend/generalbackground.png");
  background-size: cover;
  background-repeat: no-repeat;
  box-sizing: border-box;
  contain: paint;
`;

const TitleText = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  font-weight: 700;
  color: #ffffff;
  box-sizing: border-box;
`;

const WordContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
  box-sizing: border-box;
`;

const Section = styled.div`
  contain: paint;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
`;

// forwardRef를 사용하여 ref를 전달
// const BookContainer = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
//   ({ children }, ref) => (
//     <StyledBookContainer ref={ref}>{children}</StyledBookContainer>
//   )
// );

const StyledBookContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-auto-flow: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 120vw;
  box-sizing: border-box;
`;

const Book = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25vw;
  height: 50vh;
  padding: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff40;
  margin: 5px;
  box-sizing: border-box;
  text-align: center;
`;

const BookImg = styled.div`
  width: 50%;
  height: 100%;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const TextArea = styled.div`
  width: 50%;
  height: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin: 5px;

  .title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .button {
    margin-top: 10px;
    background-color: #ffffffaf;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
`;

const ScrollWrapper = styled.div`
  position: fixed;
  top: 5%;
  right: 0;
  transform: translate(-50%, 0%);
  font-size: 2rem;
  color: #ffffff79;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default GeneralRecommendBook;
