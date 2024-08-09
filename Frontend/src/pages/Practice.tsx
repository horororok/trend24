import { useEffect, useRef } from "react";
import styled from "styled-components";

const Section = styled.div`
  contain: paint; // 레이아웃을 최적화합니다. (https://developer.mozilla.org/ko/docs/Web/CSS/contain)
  height: 300vh;
`;

const ScrollBox = styled.div`
  width: 200vw;
  height: 100vh;
  background: linear-gradient(90deg, #e9eae2, #e984bf);
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Paragraph = styled.p`
  margin: 0;
  font-size: 60px;
  color: white;
  padding: 300px;
  box-sizing: border-box;
`;

const ScrollableSection = () => {
  const scrollBoxRef = useRef<HTMLDivElement>(null);

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

      if (scrollBoxRef.current !== null) {
        if (horizontalScrollPosition < -100) {
          // 가로 스크롤 위치가 -100vw 미만이면, -100vw로 고정합니다.
          scrollBoxRef.current.style.transform = `translateX(-100vw)`;
        } else if (horizontalScrollPosition < 0) {
          // 가로 스크롤 위치가 0vw 미만이면, 0vw로 고정합니다.
          scrollBoxRef.current.style.transform = `translateX(${horizontalScrollPosition}vw)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll); // 스크롤 이벤트를 등록합니다.

    return () => {
      window.removeEventListener("scroll", handleScroll); // 컴포넌트가 언마운트될 때, 스크롤 이벤트를 제거합니다.
    };
  }, []);

  return (
    <Section>
      <ScrollBox ref={scrollBoxRef}>
        <Paragraph>
          가로 스크롤
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        </Paragraph>
      </ScrollBox>
    </Section>
  );
};

export default ScrollableSection;
