import moment from "moment";
import { useEffect } from "react";
import styled from "styled-components";
import Colors from "../../../constants/Color";

interface KeywordCalendarProps {
  rankingData: KeywordCalendarType[];
}

interface KeywordCalendarType {
  date: string;
  ranking: number;
}

const KeywordCalendar = ({ rankingData }: KeywordCalendarProps) => {
    if (rankingData.length > 0) {
    
  return (
    <Container>
      <Title>
        <div className="title">키워드</div>
        {/* <div className="description">설명</div> */}
      </Title>
      <Description className="description">
        선택한 날짜 이전 7일 동안 해당 키워드가<br/>
        인기 트렌드 차트에 나타났는지를 확인합니다.
      </Description>
      {/* <DateRange>
        {moment(rankingData[0].date).format("Y/MM/DD")} -
        {moment(rankingData[6].date).format("Y/MM/DD")}
      </DateRange> */}
      <CalendarContainer>
        {rankingData.map((day) => (
          <DayWrapper>
            <DayText>{moment(day.date).format("ddd")}</DayText>
            <Day
              key={moment(day.date).format("D")}
              isCurrentDay={day.ranking != 0}
            >
              {moment(day.date).format("D")}
            </Day>
          </DayWrapper>
        ))}
      </CalendarContainer>
    </Container>
  );}
  else{
    return null;
  }
};

const Container = styled.div`
  height: 100%;
  padding: 10px;
  margin: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-right: 10px;
  }
  .description {
    font-size: 1.5rem;
    color: gray;
  }
`;
const Description = styled.div`
  font-size: 1.5rem;
  color: gray;
  margin-bottom: 10px;
`;

const DateRange = styled.p`
  font-size: 1.6rem;
  color: #666;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  flex-direction: row;
`;

const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DayText = styled.div`
  font-size: 1.5rem;

`;

const Day = styled.div<{ isCurrentDay: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 5px;
  background-color: ${({ isCurrentDay }) =>
    isCurrentDay ? Colors.main : "#ccc"};
  color: ${({ isCurrentDay }) => (isCurrentDay ? "#fff" : "#333")};
  font-weight: bold;
  font-size: 1.5rem;
`;

export default KeywordCalendar;
