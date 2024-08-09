import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import PersonalMain from "./PersonalMain";

const Main = () => {
  const [isGeneralRecommend, setIsGeneralRecommend] = useState<boolean>(true);
  const Sample1Ref = useRef(null);
  const Sample2Ref = useRef(null);
  const ContentContainerRef = useRef(null);
  const PresentBarRef = useRef(null);
  const RemainBarRef = useRef(null);
  const GeneralRecBarRef = useRef(null);
  const PersonalRecBarRef = useRef(null);
  const CloudImgRef = useRef(null);
  const CloudImg2Ref = useRef(null);
  const CloudImg3Ref = useRef(null);
  const CloudImg4Ref = useRef(null);
  const CloudImg5Ref = useRef(null);

  useEffect(() => {
    // 샘플 애니메이션
    if (isGeneralRecommend) {
      gsap.to(Sample1Ref.current, {
        keyframes: {
          "0%": { scale: 1, opacity: 0 },
          "10%": { scale: 0.5, opacity: 0.1, y: 300 },
          "20%": { scale: 1.2, opacity: 0.2, y: 100 },
          "100%": { scale: 1, opacity: 1, y: 0 },
        },
        duration: 1.5,
      });
      gsap.to(CloudImgRef.current, {
        keyframes: {
          "0%": { x: "-5%" },
          "50%": { x: "0%" },
          "100%": { x: "-5%" },
        },
        duration: 10,
        repeat: -1,
        ease: "power4.inOut",
      });
      gsap.to(CloudImg2Ref.current, {
        keyframes: {
          "0%": { x: "-5%" },
          "50%": { x: "0%", y: "5%" },
          "100%": { x: "-5%", y: "0%" },
        },
        duration: 15,
        repeat: -1,
        ease: "power4.inOut",
      });
      gsap.to(CloudImg3Ref.current, {
        keyframes: {
          "0%": { x: "-5%" },
          "50%": { x: "0%", y: "-5%" },
          "100%": { x: "-5%", y: "0%" },
        },
        duration: 12,
        repeat: -1,
        ease: "power4.inOut",
      });
      gsap.to(CloudImg4Ref.current, {
        keyframes: {
          "0%": { x: "5%" },
          "50%": { x: "0%", y: "5%" },
          "100%": { x: "5%", y: "0%" },
        },
        duration: 14,
        repeat: -1,
        ease: "power4.inOut",
      });
      gsap.to(CloudImg5Ref.current, {
        keyframes: {
          "0%": { x: "-5%" },
          "50%": { x: "0%", y: "5%" },
          "100%": { x: "-5%", y: "0%" },
        },
        duration: 13,
        repeat: -1,
        ease: "power4.inOut",
      });
    } else {
      gsap.to(Sample2Ref.current, {
        keyframes: {
          "0%": { scale: 1, opacity: 0 },
          "10%": { scale: 0.5, opacity: 0.5 },
          "20%": { scale: 1.2, opacity: 0.8 },
          "100%": { scale: 1, opacity: 1 },
        },
        duration: 1.5,
      });
    }

    // 배경색 변경 애니메이션
    // if (ContentContainerRef.current) {
    //   gsap.to(ContentContainerRef.current, {
    //     backgroundColor: isGeneralRecommend ? "#7A8FA3" : "#ebf4fc",
    //     duration: 1.5,
    //   });
    // }

    // RecommendBarArea의 자식들의 위치를 바꾸는 애니메이션
    if (isGeneralRecommend) {
      gsap.to(PersonalRecBarRef.current, {
        keyframes: {
          "0%": { x: "100%", opacity: 0 },
          "100%": { x: 0, opacity: 1 },
        },
      });
    } else {
      gsap.to(GeneralRecBarRef.current, {
        keyframes: {
          "0%": { x: "100%" },
          "100%": { x: 0 },
        },
      });
    }
  }, [isGeneralRecommend]);

  const navigate = useNavigate();

  const handleGeneralRecommend = () => {
    setIsGeneralRecommend(true);
  };

  const handlePersonalRecommend = () => {
    setIsGeneralRecommend(false);
  };

  const gotoGeneral = () => {
    gsap.to(Sample1Ref.current, {
      x: "100vw",
      y: "-100vh",
      opacity: 0.5,
      scale: 0,
      duration: 3,
      rotate: 60,
      ease: "power4.inOut",
    });

    gsap.to(CloudImgRef.current, {
      keyframes: {
        "0%": { opacity: 1 },
        "50%": { x: "-10%", y: "-10%", opacity: 0.5 },
        "100%": { x: "-100%", y: "-100%", opacity: 0 },
      },
      duration: 3,
      ease: "power2.inOut",
    });

    gsap.to(CloudImg2Ref.current, {
      keyframes: {
        "0%": { opacity: 1 },
        "50%": { x: "10%", y: "-10%", opacity: 0.5 },
        "100%": { x: "100%", y: "-100%", opacity: 0 },
      },
      duration: 3,
      ease: "power2.inOut",
    });

    gsap.to(CloudImg3Ref.current, {
      keyframes: {
        "0%": { opacity: 1 },
        "50%": { x: "-10%", y: "10%", opacity: 0.5 },
        "100%": { x: "-100%", y: "100%", opacity: 0 },
      },
      duration: 3,
      ease: "power2.inOut",
    });

    gsap.to(CloudImg4Ref.current, {
      keyframes: {
        "0%": { opacity: 1 },
        "50%": { x: "10%", y: "10%", opacity: 0.5 },
        "100%": { x: "100%", y: "100%", opacity: 0 },
      },
      duration: 3,
      ease: "power1.inOut",
    });

    gsap.to(CloudImg5Ref.current, {
      keyframes: {
        "0%": { opacity: 1 },
        "50%": { x: "10%", opacity: 0.5 },
        "100%": { x: "100%", opacity: 0 },
      },
      duration: 3,
      ease: "power1.inOut",
      onComplete: () => {
        // navigate 함수는 여러분의 라우팅 라이브러리에 따라 다를 수 있습니다.
        // 예를 들어 react-router-dom을 사용하는 경우:
        navigate("/event/general");
      },
    });
  };

  const gotoPersonal = () => {
    navigate("/event/personal");
  };

  return (
    <Container>
      <ContentContainer
        ref={ContentContainerRef}
        $isGeneralRecommend={isGeneralRecommend}
      >
        {isGeneralRecommend ? (
          <GeneralContent>
            <TitleContainer>
              <Title>트렌드별 추천</Title>
              <Title2>Click the Rocket!!</Title2>
            </TitleContainer>
            <BackGround>
              <CloudImg1 ref={CloudImgRef}>
                <img
                  src="\Image\EventPage\GeneralRecommend\cloud1.png"
                  alt="cloud1"
                />
              </CloudImg1>
              <CloudImg2 ref={CloudImg2Ref}>
                <img
                  src="\Image\EventPage\GeneralRecommend\cloud2.png"
                  alt="cloud2"
                />
              </CloudImg2>
              <CloudImg3 ref={CloudImg3Ref}>
                <img
                  src="\Image\EventPage\GeneralRecommend\cloud1.png"
                  alt="cloud3"
                />
              </CloudImg3>
              <CloudImg4 ref={CloudImg4Ref}>
                <img
                  src="\Image\EventPage\GeneralRecommend\cloud3.png"
                  alt="cloud4"
                />
              </CloudImg4>
              <CloudImg5 ref={CloudImg5Ref}>
                <img
                  src="\Image\EventPage\GeneralRecommend\cloud4.png"
                  alt="cloud5"
                />
              </CloudImg5>
            </BackGround>
            <RocketImg>
              <SampleImg1 ref={Sample1Ref} onClick={gotoGeneral} />
            </RocketImg>
          </GeneralContent>
        ) : (
          <PersonalContent>
            <PersonalMain pageChangeClick={gotoPersonal} />
            {/* <Text>
              <h1>Personal Recommend!!</h1>
              <button onClick={gotoPersonal}>+</button>
            </Text>
            <Img>
              <SampleImg2 ref={Sample2Ref} />
            </Img> */}
          </PersonalContent>
        )}
      </ContentContainer>
      <RecommendBarArea>
        <PresentRecommendBar
          $isGeneralRecommend={isGeneralRecommend}
          ref={PresentBarRef}
        >
          {isGeneralRecommend ? (
            <GeneralRecBar
              ref={GeneralRecBarRef}
              onClick={handleGeneralRecommend}
              $isGeneralRecommend={isGeneralRecommend}
            >
              Book Recommend
            </GeneralRecBar>
          ) : (
            <PersonalRecBar
              ref={PersonalRecBarRef}
              onClick={handlePersonalRecommend}
              $isGeneralRecommend={isGeneralRecommend}
            >
              Personal Recommend
            </PersonalRecBar>
          )}
        </PresentRecommendBar>
        <RemainRecommendBar
          $isGeneralRecommend={isGeneralRecommend}
          ref={RemainBarRef}
        >
          {isGeneralRecommend ? (
            <PersonalRecBar
              ref={PersonalRecBarRef}
              onClick={handlePersonalRecommend}
              $isGeneralRecommend={isGeneralRecommend}
            >
              Personal Recommend
            </PersonalRecBar>
          ) : (
            <GeneralRecBar
              ref={GeneralRecBarRef}
              onClick={handleGeneralRecommend}
              $isGeneralRecommend={isGeneralRecommend}
            >
              Book Recommend
            </GeneralRecBar>
          )}
        </RemainRecommendBar>
      </RecommendBarArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

interface IsGeneralRecommendProps {
  $isGeneralRecommend: boolean;
}

const ContentContainer = styled.div<IsGeneralRecommendProps>`
  display: flex;
  justify-items: center;
  align-items: center;
  width: 84%;
  height: 100%;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.$isGeneralRecommend ? "#e5c2fe" : "#333333"};
  transition: background-color 1.5s ease; // 배경색 전환에 대한 CSS 트랜지션 추가
`;

const GeneralContent = styled.div`
  background-image: url("/Image/EventPage/GeneralRecommend/generalbackground.png");
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const TitleContainer = styled.div`
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 5rem;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Title2 = styled.div`
  font-size: 3rem;
  font-weight: bold;
`;

const BackGround = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const RocketImg = styled.div`
  position: absolute;
  left: 0%;
  bottom: 0%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 225px;
  height: 250px;
  box-sizing: border-box;
`;

const CloudImg1 = styled.div`
  position: absolute;
  top: 30%;
  left: -20%;
  width: 50vw;
  height: 30vh;

  img {
    width: 100%;
    height: 100%;
  }
`;

const CloudImg2 = styled.div`
  position: absolute;
  top: -5%;
  right: -15%;
  width: 80vw;
  height: 40vh;

  img {
    width: 100%;
    height: 100%;
  }
`;

const CloudImg3 = styled.div`
  position: absolute;
  bottom: -5%;
  left: -5%;
  width: 30vw;
  height: 25vh;

  img {
    width: 100%;
    height: 100%;
  }
`;

const CloudImg4 = styled.div`
  position: absolute;
  bottom: -10%;
  right: -5%;
  width: 60vw;
  height: 40vh;

  img {
    width: 100%;
    height: 100%;
  }
`;

const CloudImg5 = styled.div`
  position: absolute;
  top: 40%;
  right: -15%;
  width: 40vw;
  height: 25vh;

  img {
    width: 100%;
    height: 100%;
  }
`;

const PersonalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const SampleImg1 = styled.div`
  width: 100%;
  height: 100%;
  background: url("/Image/EventPage/techny-rocket.gif") no-repeat center center;
  background-size: cover;
  cursor: pointer;
`;

const RecommendBarArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16%;
  height: 100%;
  box-sizing: border-box;
`;

const PresentRecommendBar = styled.div<IsGeneralRecommendProps>`
  display: flex;
  align-items: end;
  justify-content: flex-start;
  width: 80%;
  height: 100%;
  box-sizing: border-box;
  color: #ffffffc3;
  background-image: radial-gradient(
    circle at 0% 100%,
    ${(props) =>
      props.$isGeneralRecommend
        ? "#4f1879 0%, #ab8fc4 70%, #ab8fc4 70%"
        : "#001638 0%, #637ca1 70%, #637ca1 70%"}
  );
  transition: background-color 1.5s ease;
  z-index: 10;
`;

const RemainRecommendBar = styled.div<IsGeneralRecommendProps>`
  display: flex;
  align-items: end;
  justify-content: flex-start;
  width: 20%;
  height: 100%;
  box-sizing: border-box;
  color: white;

  background-image: radial-gradient(
    circle at 900% 0%,
    ${(props) =>
      props.$isGeneralRecommend
        ? "#001638 0%, #637ca1 70%, #637ca1d0 70%"
        : "#300038 0%, #ab99ca 70%, #ab8fc4d0 70%"}
  );
  transition: background-color 1.5s ease;
  z-index: 8;
  &:hover {
    opacity: 0.9;
    transition: opacity 0.3s ease;
  }
`;

const GeneralRecBar = styled.div<{ $isGeneralRecommend: boolean }>`
  display: flex;
  padding: 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  align-items: flex-end;
  justify-content: flex-end;
  cursor: ${(props) => (props.$isGeneralRecommend ? "default" : "pointer")};
  writing-mode: vertical-rl;
  font-size: ${(props) => (props.$isGeneralRecommend ? "8vh" : "2vh")};
`;

const PersonalRecBar = styled.div<{ $isGeneralRecommend: boolean }>`
  display: flex;
  padding: 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  align-items: flex-end;
  justify-content: flex-end;
  cursor: ${(props) => (props.$isGeneralRecommend ? "pointer" : "default")};
  writing-mode: vertical-rl;
  font-size: ${(props) => (props.$isGeneralRecommend ? "2vh" : "8vh")};
`;

export default Main;
