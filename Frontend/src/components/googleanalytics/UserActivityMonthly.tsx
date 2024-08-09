import styled from "styled-components";

const UserActivityMonthly = () => {
  return (
    <Container>
      <Title>월간 사용자 활동</Title>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
`;

export default UserActivityMonthly;
