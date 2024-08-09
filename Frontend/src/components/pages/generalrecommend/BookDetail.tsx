// BookDetail.js
import { useState, useRef } from "react";
import { gsap } from "gsap";
import styled from "styled-components";

import { GeneralDummyBookList } from "../../../constants/DummyData/GeneralRecommendDummy";

const BookDetail = ({ bookinfo }: { bookinfo: GeneralDummyBookList }) => {
  const [flipped, setFlipped] = useState(false);
  const bookInnerRef = useRef(null);

  const handleBookClick = () => {
    gsap.to(bookInnerRef.current, {
      duration: 0.8,
      rotateY: flipped ? "0" : "-180",
    });
    setFlipped(!flipped);
  };

  return (
    <BookContainer onClick={handleBookClick}>
      <BookInner
        style={{ transform: flipped ? "rotateY(-180deg)" : "rotateY(0)" }}
        ref={bookInnerRef}
      >
        <FrontPage>{bookinfo.title}</FrontPage>
        <BackPage>Back Page</BackPage>
      </BookInner>
    </BookContainer>
  );
};

const BookContainer = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  perspective: 1000px;
`;

const BookInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.8s;
`;

const BookPage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;

const FrontPage = styled(BookPage)`
  background-color: #f1f1f1;
`;

const BackPage = styled(BookPage)`
  background-color: #ddd;
  transform: rotateY(180deg);
`;


export default BookDetail;
