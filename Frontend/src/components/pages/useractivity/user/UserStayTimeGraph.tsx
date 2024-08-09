import { useEffect } from "react";
import styled from "styled-components";

const UserStayTimeGraph = () => {
  useEffect(() => {
    console.log("UserStayTimeGraph");
  }, []);
  return (
    <UserStayTimeGraphContainer>
      <div>UserStayTimeGraph</div>
    </UserStayTimeGraphContainer>
  );
};

const UserStayTimeGraphContainer = styled.div`
  width: 100%;
  height: 100%;
  grid-column: 1 / 7;
  grid-row: 4 / 7;
  border: 1px solid #000;
`;

export default UserStayTimeGraph;
