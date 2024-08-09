import { useState } from "react";
import styled from "styled-components";

const Toggle = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <ToggleContainer onClick={handleToggle}>
      <Bars
        style={{
          transform: isChecked
            ? "translateY(1000%) translateX(80%) rotate(-150deg)"
            : "none",
          transformOrigin: "left",
          // zIndex: isChecked ? 1 : "unset",
        }}
      />
      <Bars
        style={{
          transform: isChecked
            ? "translateY(-500%) translateX(-20%) rotate(-30deg)"
            : "none",
          transformOrigin: "right",
          // zIndex: isChecked ? 2 : "unset",
        }}
      />
      <Bars
        style={{
          transform: isChecked
            ? "translateY(50%) translateX(-15%) rotate(90deg)"
            : "none",
          transformOrigin: "right",
          // zIndex: isChecked ? "unset" : 1,
        }}
      />
    </ToggleContainer>
  );
};

const ToggleContainer = styled.label`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition-duration: 0.3s;
`;

const Bars = styled.div`
  width: 80%;
  height: 3px;
  background-color: rgb(0, 0, 0);
  border-radius: 5px;
  transition-duration: 0.3s;
`;

export default Toggle;
