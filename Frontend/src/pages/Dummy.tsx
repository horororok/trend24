import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styled from "styled-components";

const RotatingText = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (text) {
      const characters = text.querySelectorAll(".char");
      gsap.set(characters, {
        transformOrigin: "center center 50",
      });
      gsap.to(characters, {
        rotationY: "+=360",
        duration: 10,
        repeat: -1,
        ease: "linear",
        stagger: {
          each: 0.1,
        },
      });
    }
  }, []);

  const text = "회전하는 텍스트 예제";
  return (
    <Container>
      <CenterComponent />
      <TextContainer ref={textRef}>
        {text.split("").map((char, index) => (
          <Character key={index} className="char">
            {char}
          </Character>
        ))}
      </TextContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterComponent = styled.div`
  width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
`;

const TextContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
`;

const Character = styled.span`
  font-size: 20px;
  position: absolute;
`;

export default RotatingText;
