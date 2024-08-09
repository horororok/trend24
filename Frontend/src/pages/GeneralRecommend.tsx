import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { gsap } from "gsap";
import { getWordCloudData } from "../apis/anonymous";

// const data = {
//   status: 200,
//   message: "성공",
//   result: {
//     list: [
//       {
//         name: "ANIMAL",
//         keywords: [
//           {
//             name: "푸바오",
//             freq: 3,
//           },
//         ],
//         books: [
//           {
//             bookId: 1,
//             product_id: 101,
//             search_keyword: "리액트",
//             total_click_count: 500,
//             total_order_count: 100,
//             total_order_amount: 5000,
//             contents: "리액트에 관한 책이다.",
//             product_name: "리액트 훅 인 액션",
//             sale_price: 20,
//             category_name: "IT",
//             total_purchase_count: 50,
//             keywords: ["AI", "블록체인"],
//           },
//           {
//             bookId: 2,
//             product_id: 102,
//             search_keyword: "역사",
//             total_click_count: 300,
//             total_order_count: 80,
//             total_order_amount: 4000,
//             contents: "역사는 중요하다",
//             product_name: "역사는 흐른다",
//             sale_price: 25,
//             category_name: "역사",
//             total_purchase_count: 40,
//             keywords: ["AI", "블록체인"],
//           },
//         ],
//       },
//       {
//         name: "IT",
//         keywords: [
//           {
//             name: "푸바오",
//             freq: 3,
//           },
//         ],
//         books: [
//           {
//             bookId: 1,
//             product_id: 101,
//             search_keyword: "리액트",
//             total_click_count: 500,
//             total_order_count: 100,
//             total_order_amount: 5000,
//             contents: "리액트에 관한 책이다.",
//             product_name: "리액트 훅 인 액션",
//             sale_price: 20,
//             category_name: "IT",
//             total_purchase_count: 50,
//             keywords: ["AI", "블록체인"],
//           },
//           {
//             bookId: 2,
//             product_id: 102,
//             search_keyword: "역사",
//             total_click_count: 300,
//             total_order_count: 80,
//             total_order_amount: 4000,
//             contents: "역사는 중요하다",
//             product_name: "역사는 흐른다",
//             sale_price: 25,
//             category_name: "역사",
//             total_purchase_count: 40,
//             keywords: ["AI", "블록체인"],
//           },
//         ],
//       },
//       {
//         name: "NEWS",
//         keywords: [
//           {
//             name: "푸바오",
//             freq: 3,
//           },
//         ],
//         books: [
//           {
//             bookId: 1,
//             product_id: 101,
//             search_keyword: "리액트",
//             total_click_count: 500,
//             total_order_count: 100,
//             total_order_amount: 5000,
//             contents: "리액트에 관한 책이다.",
//             product_name: "리액트 훅 인 액션",
//             sale_price: 20,
//             category_name: "IT",
//             total_purchase_count: 50,
//             keywords: ["AI", "블록체인"],
//           },
//           {
//             bookId: 2,
//             product_id: 102,
//             search_keyword: "역사",
//             total_click_count: 300,
//             total_order_count: 80,
//             total_order_amount: 4000,
//             contents: "역사는 중요하다",
//             product_name: "역사는 흐른다",
//             sale_price: 25,
//             category_name: "역사",
//             total_purchase_count: 40,
//             keywords: ["AI", "블록체인"],
//           },
//         ],
//       },
//       {
//         name: "ENTERTAINMENT",
//         keywords: [
//           {
//             name: "푸바오",
//             freq: 3,
//           },
//         ],
//         books: [
//           {
//             bookId: 1,
//             product_id: 101,
//             search_keyword: "리액트",
//             total_click_count: 500,
//             total_order_count: 100,
//             total_order_amount: 5000,
//             contents: "리액트에 관한 책이다.",
//             product_name: "리액트 훅 인 액션",
//             sale_price: 20,
//             category_name: "IT",
//             total_purchase_count: 50,
//             keywords: ["AI", "블록체인"],
//           },
//           {
//             bookId: 2,
//             product_id: 102,
//             search_keyword: "역사",
//             total_click_count: 300,
//             total_order_count: 80,
//             total_order_amount: 4000,
//             contents: "역사는 중요하다",
//             product_name: "역사는 흐른다",
//             sale_price: 25,
//             category_name: "역사",
//             total_purchase_count: 40,
//             keywords: ["AI", "블록체인"],
//           },
//         ],
//       },
//       {
//         name: "NEWMEDIA",
//         keywords: [
//           {
//             name: "푸바오",
//             freq: 3,
//           },
//         ],
//         books: [
//           {
//             bookId: 1,
//             product_id: 101,
//             search_keyword: "리액트",
//             total_click_count: 500,
//             total_order_count: 100,
//             total_order_amount: 5000,
//             contents: "리액트에 관한 책이다.",
//             product_name: "리액트 훅 인 액션",
//             sale_price: 20,
//             category_name: "IT",
//             total_purchase_count: 50,
//             keywords: ["AI", "블록체인"],
//           },
//           {
//             bookId: 2,
//             product_id: 102,
//             search_keyword: "역사",
//             total_click_count: 300,
//             total_order_count: 80,
//             total_order_amount: 4000,
//             contents: "역사는 중요하다",
//             product_name: "역사는 흐른다",
//             sale_price: 25,
//             category_name: "역사",
//             total_purchase_count: 40,
//             keywords: ["AI", "블록체인"],
//           },
//         ],
//       },
//     ],
//   },
// };

interface TrendDataProps {
  name: string;
  keywords: { name: string; freq: number }[];
  books: {
    bookId: number;
    product_id: number;
    search_keyword: string;
    total_click_count: number;
    total_order_count: number;
    total_order_amount: number;
    contents: string;
    product_name: string;
    sale_price: number;
    category_name: string;
    total_purchase_count: number;
    keywords: string[];
  }[];
}

const GeneralRecommend = () => {
  const [trendList, setTrendList] = useState<TrendDataProps[]>([]);
  const ballsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoverTimeline, setHoverTimeline] = useState<GSAPTimeline | null>(null);
  const [makeTl, setMakeTl] = useState(true);
  const [goToRecommend, setGoToRecommend] = useState(false);
  const navigate = useNavigate();

  const getTrendList = async () => {
    try {
      return await getWordCloudData(1, null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrendList().then((res) => setTrendList(res));
  }, []);

  useEffect(() => {
    if (makeTl) {
      const tl = gsap.timeline();
      tl.to(ballsRef.current, {
        keyframes: {
          "0%": { scale: 1 },
          "50%": { scale: 1.1 },
          "100%": { scale: 1 },
        },
        ease: "linear",
        duration: 1,
        repeat: -1,
      });
      setHoverTimeline(tl);
    }
    return () => {
      hoverTimeline?.kill();
    };
  }, [makeTl]);

  const handleMouseOver = (index: number) => {
    hoverTimeline?.pause();
    setMakeTl(false);

    const ball = ballsRef.current[index];
    const textElement = ball?.querySelector(Text);
    if (ball && textElement) {
      const tl = gsap.timeline();
      tl.to(ball, {
        scale: 3.5,
        duration: 0.5,
      }).to(textElement, {
        opacity: 1,
        duration: 0.5,
      });
    }
  };

  const handleMouseOut = (index: number) => {
    hoverTimeline?.resume();
    if (goToRecommend) return;
    setMakeTl(true);

    const ball = ballsRef.current[index];
    if (ball) {
      const textElement = ball.querySelector(Text);
      const tl = gsap.timeline();
      tl.to(ball, { scale: 1, duration: 0.5 });
      if (textElement) {
        tl.to(textElement, { opacity: 0, duration: 0.5 });
      }
    }
  };

  const gotoRecommendPage = (title: string, index: number) => {
    setGoToRecommend(true);
    const tl = gsap.timeline();
    const element = ballsRef.current[index];
    if (element) {
      const currentX = element.offsetLeft + element.offsetWidth / 2;
      const currentY = element.offsetTop + element.offsetHeight / 2;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      tl.to(ballsRef.current, { scale: 0.1, duration: 0.5 }).to(element, {
        keyframes: {
          "0%": { scale: 1, x: 0, y: 0 },
          "100%": { scale: 20, x: centerX - currentX, y: centerY - currentY },
        },
        duration: 1,
        ease: "linear",
        onComplete: () => {
          navigate(`/event/general/recommend`, { state: { title } });
        },
      });
    }
  };

  return (
    <Container>
      <Title>별들에 마우스를 올려보세요</Title>
      {trendList.map((trend, index) => (
        <Ball
          ref={(ref) => (ballsRef.current[index] = ref)}
          $title={trend.name}
          key={trend.name}
          onClick={() => gotoRecommendPage(trend.name, index)}
          onMouseOver={() => handleMouseOver(index)}
          onMouseOut={() => handleMouseOut(index)}
        >
          {trend.name === "ANIMAL" && <Text>동물</Text>}
          {trend.name === "IT" && <Text>IT</Text>}
          {trend.name === "NEWS" && <Text>뉴스 </Text>}
          {trend.name === "ENTERTAINMENT" && <Text>엔터테인먼트</Text>}
          {trend.name === "NEWMEDIA" && <Text>뉴미디어</Text>}
        </Ball>
      ))}
    </Container>
  );
};

interface BallProps {
  $title: string;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-template-areas:
    ". . ANIMAL . . "
    ". . . . NEWMEDIA "
    "IT . . . ."
    ". . . ENTERTAINMENT ."
    ". NEWS . . .";
  height: 100%;
  width: 100%;
  background-image: url("/Image/EventPage/GeneralRecommend/generalbackground.png");
  background-size: cover;
  background-repeat: no-repeat;
`;

const Title = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 6rem;
  color: white;
  font-weight: bold;
`;

const Text = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const Ball = styled.div<BallProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 50%;
  background-color: #f8f8f8;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  width: 5vh;
  height: 5vh;
  aspect-ratio: 1/1;
  grid-area: ${({ $title }) => $title};
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default GeneralRecommend;
