import styled from "styled-components";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

interface PersonalMainProps {
  pageChangeClick: () => void;
}

const PersonalMain = ({ pageChangeClick }: PersonalMainProps) => {
  const topLeftRef = useRef<HTMLImageElement>(null);
  const topRightRef = useRef<HTMLImageElement>(null);
  const bottomLeftRef = useRef<HTMLImageElement>(null);
  const bottomRightRef = useRef<HTMLImageElement>(null);
  const centerRef = useRef<HTMLImageElement>(null);
  const rocketRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    const list = [
      topLeftRef.current,
      topRightRef.current,
      bottomLeftRef.current,
      bottomRightRef.current,
      centerRef.current,
      rocketRef.current,
    ];
    tl.from(list, {
      opacity: 0, // 요소를 처음에 숨김
      y: -50, // 50px 위로 이동
      duration: 1, // 1초 동안 애니메이션
      stagger: 0.2, // 각 요소마다 0.2초씩 차이를 두고 애니메이션
    });

    tl.to(list, {
      x: () => gsap.utils.random(-10, 10), // x 좌표를 랜덤한 값
      y: () => gsap.utils.random(-10, 10), // y 좌표를 랜덤한 값
      duration: () => gsap.utils.random(1, 3), // 1에서 3 사이의 랜덤한 지속 시간
      repeat: -1, // 무한 반복
      yoyo: true, // 앞뒤 반복
      ease: "power1.inOut",
    }),
      "+=1";
    tl.play();
  }, []);

  const rocketClick = () => {
    const list = [
      topLeftRef.current,
      topRightRef.current,
      bottomLeftRef.current,
      bottomRightRef.current,
      centerRef.current,
    ];
    gsap.to(list, {
      opacity: 0,
      duration: 3,
      ease: "power1.inOut",
    });
    gsap.to(rocketRef.current, {
      duration: 3,
      ease: "power1.inOut",
      motionPath: {
        path: "M0,0 C200,-200 400,-400 600,-200 1000,0 1300,-350 1500,-700",
        autoRotate: 45,
      },
      onComplete: pageChangeClick,
    });
  };

  return (
    <Container>
      <Title>추억 여행</Title>
      <Description>
        로켓을 눌러 우리의 추억 속으로 다시 돌아가 보아요!
      </Description>
      <TopLeftImage
        ref={topLeftRef}
        src="/Image/EventPage/Personal/linePlanet2.png"
      />
      <TopRightImage
        ref={topRightRef}
        src="/Image/EventPage/Personal/linePlanet3.png"
      />
      <BottomLeftImage
        ref={bottomLeftRef}
        src="/Image/EventPage/Personal/lineStar.png"
      />
      <BottomRightImage
        ref={bottomRightRef}
        src="/Image/EventPage/Personal/linePlanet1.png"
      />
      <CenterImage
        ref={centerRef}
        src="/Image/EventPage/Personal/lineStar2.png"
      />
      <Rocket
        onClick={rocketClick}
        ref={rocketRef}
        src="/Image/EventPage/techny-rocket.gif"
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("/Image/EventPage/bg.jpg");
  background-repeat: repeat;
  position: relative; /* 모서리 이미지를 위한 컨테이너에 포지션을 추가합니다. */
`;

const Title = styled.div`
  justify-content: center;
  font-weight: bold;
  font-size: 5rem;
  color: white;
  z-index: 1;
  margin-bottom: 25px;
`;

const Description = styled.div`
  font-size: 3rem;
  color: white;
  z-index: 1;
  text-align: center;
`;

const CenterImage = styled.img`
  position: absolute;
  width: 20%;
  height: auto;
  top: 20%;
  right: 10%;
`;

const TopLeftImage = styled.img`
  position: absolute;
  width: 50%;
  height: auto;
  top: -300px;
  left: -300px;
`;

const TopRightImage = styled.img`
  position: absolute;
  width: 60%;
  height: auto;
  top: -400px;
  right: -400px;
`;

const BottomLeftImage = styled.img`
  position: absolute;
  width: 50%;
  height: auto;
  bottom: 0;
  left: -300px;
`;

const BottomRightImage = styled.img`
  position: absolute;
  width: 40%;
  height: auto;
  bottom: -200px;
  right: -30px;
`;

const Rocket = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 300px;
  cursor: pointer;
`;

export default PersonalMain;
