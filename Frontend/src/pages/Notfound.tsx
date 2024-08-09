import styled from "styled-components";

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title>404 Not Found</Title>
      <Description>
        Sorry, the page you are looking for could not be found.
      </Description>
    </NotFoundContainer>
  );
};

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  text-align: center;
`;

export default NotFound;
