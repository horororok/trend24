import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // ScrollTrigger를 따로 가져옵니다.
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BookType } from "../../../constants/Type/Type";
import { BiSolidCategory } from "react-icons/bi";
import { FaBookBookmark } from "react-icons/fa6";
import { PiArrowUUpLeftBold } from "react-icons/pi";
import { HiTrendingUp } from "react-icons/hi";

interface BookScrollProps {
  back: () => void;
  bookInfo: BookType | null;
}

const Book: React.FC<BookScrollProps> = ({ back, bookInfo }) => {
  const bookPageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  const toggleBack = () => {
    back();
  };

  const gotoPersonal = () => {
    navigate("/event/personal");
  };

  const gotoGeneral = () => {
    navigate("/event/general");
  };
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Book 컴포넌트가 마운트되면 GSAP 및 ScrollTrigger 플러그인을 등록합니다.
    bookPageRefs.current.forEach((page, index) => {
      if (!page) {
        console.log("page is null");
        return; // page가 null이면 다음으로 넘어갑니다.
      }
      gsap.set(page, { z: index === 0 ? 13 : -index * 1 }); // 페이지의 초기 z축 위치를 설정합니다.
      if (index === 11) return false; // 12페이지까지만 렌더링합니다.

      gsap.to(page, {
        // 페이지를 회전시키는 애니메이션을 추가합니다.
        rotateY: `-=${180 - index / 2}`, // 페이지를 회전시키는 애니메이션을 추가합니다.
        scrollTrigger: {
          // ScrollTrigger를 사용하여 스크롤 위치에 따라 애니메이션을 제어합니다.
          scrub: 1, // 스크롤 속도에 따라 애니메이션 속도를 조절합니다.
          start: () => (index + 1) * (window.innerHeight / 6), // 애니메이션이 시작되는 스크롤 위치를 설정합니다.
          end: () => (index + 2) * (window.innerHeight / 6), // 애니메이션이 끝나는 스크롤 위치를 설정합니다.
        },
      });

      gsap.to(page, {
        z: index === 0 ? -13 : index, // 페이지의 z축 위치를 변경합니다.
        scrollTrigger: {
          // ScrollTrigger를 사용하여 스크롤 위치에 따라 애니메이션을 제어합니다.
          scrub: 1, // 스크롤 속도에 따라 애니메이션 속도를 조절합니다.
          start: () => (index + 1) * (window.innerHeight / 6), // 애니메이션이 시작되는 스크롤 위치를 설정합니다.
          end: () => (index + 1.5) * (window.innerHeight / 6), // 애니메이션이 끝나는 스크롤 위치를 설정합니다.
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // 컴포넌트가 언마운트될 때 ScrollTrigger를 제거합니다.
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 이 효과가 발생하도록 합니다.

  return (
    <BookContainer>
      {/* 페이지들을 여기에 렌더링합니다. */}
      <BookPageFrontCover
        ref={(el) => (bookPageRefs.current[0] = el)}
        style={{
          backgroundImage: `url("https://image.yes24.com/goods/${bookInfo?.productId}/XL")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></BookPageFrontCover>
      <BookPage ref={(el) => (bookPageRefs.current[1] = el)}>
        <BookPageFront style={{ backgroundColor: "white" }}>
          <PageContent
            style={{ backgroundImage: "url('/Image/Book/title.png')" }}
          >
            <h1>{bookInfo?.productName}</h1>
            <p>
              <BiSolidCategory className="icon" /> 카테고리:{" "}
              {bookInfo?.categoryName}
            </p>
            <p className="page">1페이지</p>
          </PageContent>
        </BookPageFront>
        <BookPageBack style={{ backgroundColor: "white" }}>
          <PageContent
            style={{ backgroundImage: "url('/Image/Book/price.png')" }}
          >
            <h1>가격</h1>
            <p>{bookInfo?.salePrice}원</p>
            <p className="page">2페이지</p>
          </PageContent>
        </BookPageBack>
      </BookPage>

      <BookPage ref={(el) => (bookPageRefs.current[2] = el)}>
        <BookPageFront style={{ backgroundColor: "white" }}>
          <PageContent
            style={{ backgroundImage: "url('/Image/Book/summary.png')" }}
          >
            {/* <h1>책 소개</h1> */}
            <p className="story">{bookInfo?.contents}</p>
            <p className="page">3페이지</p>
          </PageContent>
        </BookPageFront>
        <BookPageBack style={{ backgroundColor: "white" }}>
          <PageContent
            style={{ backgroundImage: "url('/Image/Book/keyword.png')" }}
          >
            <h1>검색어</h1>
            <p>{bookInfo?.searchKeyword}</p>
            <p className="page">4페이지</p>
          </PageContent>
        </BookPageBack>
      </BookPage>
      <BookPage ref={(el) => (bookPageRefs.current[3] = el)}>
        <BookPageFront style={{ backgroundColor: "white" }}>
          <PageContent
            style={{ backgroundImage: "url('/Image/Book/click.png')" }}
          >
            <h1>클릭수</h1>
            <p>{bookInfo?.totalClickCount}회</p>
            <p className="page">5페이지</p>
          </PageContent>
        </BookPageFront>
        <BookPageBack style={{ backgroundColor: "white" }}>
          <PageContent
            style={{ backgroundImage: "url('/Image/Book/purchase.png')" }}
          >
            <h1>구매수</h1>
            <p>{bookInfo?.totalOrderCount}회</p>
            <p className="page">6페이지</p>
          </PageContent>
        </BookPageBack>
      </BookPage>
      <BookPage ref={(el) => (bookPageRefs.current[4] = el)}>
        <BookPageFront style={{ backgroundColor: "white" }}>
          <PageContent
            style={{ backgroundImage: "url('/Image/Book/keyword.png')" }}
          >
            <h1>키워드</h1>
            <p>{bookInfo?.keywords.join(", ")}</p>
            <p className="page">7페이지</p>
          </PageContent>
        </BookPageFront>
        <BookPageBack style={{ backgroundColor: "white" }}>
          <PageContent
            style={{ backgroundImage: "url('/Image/Book/trend24.png')" }}
          >
            <p>The End</p>
            <button onClick={toggleBack}>
              <PiArrowUUpLeftBold className="icon" />
              돌아가기
            </button>
            <ButtonWrapper>
              <button className="general" onClick={gotoGeneral}>
                <HiTrendingUp className="icon" />
                트렌드 추천
              </button>
              <button className="personal" onClick={gotoPersonal}>
                <FaBookBookmark className="icon" />
                추억의 도서
              </button>
            </ButtonWrapper>
          </PageContent>
        </BookPageBack>
      </BookPage>
      <BookPageBackCover ref={(el) => (bookPageRefs.current[5] = el)}>
        <img src="/Image/Logo/logo.png" />
      </BookPageBackCover>
    </BookContainer>
  );
};

const BookContainer = styled.div`
  height: 60vmin;
  width: 45vmin;
  min-width: 150px;
  min-height: 200px;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1200px;
`;

const BookPageFrontCover = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 2%;
  transform-origin: 0% 50%;
`;

const BookPageBackCover = styled.div`
  background: linear-gradient(120deg, #ffffff 0%, #a7b2c2 70%, #b6bfcdd0 70%);

  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 2%;
  transform-origin: 100% 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 50%;
  }
`;

const BookPage = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 2%;
  transform-origin: 0% 50%;
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageContent = styled.div`
  height: 90%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #d1d1d152;
  background-size: contain;
  box-sizing: border-box;

  h1 {
    font-size: 4rem;
    text-align: center;
    word-wrap: keep-all;
  }
  p {
    display: flex;
    font-size: 2rem;
    .icon {
      font-size: 3rem;
      margin-right: 5px;
    }
  }

  .page {
    position: absolute;
    bottom: 30px;
    justify-self: flex-end;
    align-self: flex-end;
    margin: 5px;
    box-sizing: border-box;
  }

  .story {
    margin-top: 100px;
    margin-bottom: 10px;
    padding: 20px;
    overflow: auto;
  }

  button {
    font-size: 2rem;
    margin: 5px;
    padding: 15px;
    border-radius: 10px;
    border: none;
    background-color: #c3adc78e;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      opacity: 0.7;
    }
    .icon {
      font-size: 2.8rem;
      margin-right: 10px;
    }
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  display: flex;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  button {
    width: 50%;
    box-sizing: border-box;
    font-size: 2rem;
    margin: 8px;
    .icon {
      font-size: 2.8rem;
      margin-right: 10px;
    }
  }
  .personal {
    background-color: #557ec16f;
    color: #fff;
  }
  .general {
    background-color: #b77ceab6;
    color: #fff;
  }
`;

const BookPageFront = styled.div`
  height: 95%;
  width: 95%;
  position: absolute;
  top: 2.5%;
  left: 2%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BookPageBack = styled.div`
  height: 95%;
  width: 95%;
  position: absolute;
  top: 2.5%;
  left: 2%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Book;
