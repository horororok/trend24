import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/pages/PersonalRecommend/QuestionCard";
import { getQuestion } from "../apis/anonymous";
import { useEffect, useState } from "react";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { setQuestion, questionType } from "../store/slices/recommendSlice";
import ScrollIcon from "../components/common/scroll/ScrollIcon";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PersonalRecommend = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [questionList, setQuestionList] = useState<questionType[]>([]);
  const navigate = useNavigate();

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    const cards = gsap.utils.toArray(".card");
    cards.forEach((layer: any) => {
      const startX = gsap.getProperty(layer, "x");
      const startY = gsap.getProperty(layer, "y");
      const randomX = gsap.utils.random(-10, 10);
      const randomY = gsap.utils.random(-10, 10);
      tl.to(
        layer,
        {
          x: Number(startX) + randomX,
          y: Number(startY) + randomY,
          duration: 3,
          ease: "power1.inOut",
        },
        0
      );
    });
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".title",
        start: "top top",
        endTrigger: ".image_container",
        end: "bottom bottom",
        scrub: 4,
      },
    });
    const cards = gsap.utils.toArray(".card");
    cards.forEach((layer: any) => {
      const startY = gsap.getProperty(layer, "y");
      const startX = gsap.getProperty(layer, "x");
      tl.to(
        layer,
        { x: Number(startX) - 20, y: Number(startY) - 200, ease: "none" },
        0
      );
    });
  }, []);

  const cardClick = (card: questionType) => {
    dispatch(setQuestion(card));
    navigate("/event/personal/search");
  };

  const getQuestionList = async () => {
    try {
      return await getQuestion();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestionList().then((res) => setQuestionList(res));
  }, []);

  return (
    <Container>
      <Title className="title">
        당신의 기억 속에 있는
        <br />
        책을 꺼내보세요.
      </Title>
      <CardContainer className="image_container">
        {questionList.map((li, idx) => (
          <QuestionCard key={idx} cardClick={cardClick} cardData={li} />
        ))}
      </CardContainer>
      <ScrollWrapper>
        <ScrollIcon />
      </ScrollWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-size: 80px;
  font-weight: bold;
  text-align: center;
  align-content: center;

  z-index: 1;
  overflow-x: hidden;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  box-sizing: border-box;
  /* transform: rotate(10deg); */
  background-image: url("/Image/EventPage/bg.jpg");
  background-repeat: repeat;
`;
const ScrollWrapper = styled.div`
  position: fixed;
  top: 50%;
  right: 0;
  transform: translate(-50%, 0%);
  font-size: 2rem;
  color: #ffffff79;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default PersonalRecommend;
