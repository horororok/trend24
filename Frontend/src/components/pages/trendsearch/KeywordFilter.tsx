import { useEffect, useState } from "react";
import styled from "styled-components";
import Colors from "../../../constants/Color";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import moment from "moment";
import CustomCalendar from "../../common/calendar/CustomCalendar";

interface TrendCategoryDataType {
  trendCategoryId: number;
  name: string;
  keywords: keywords[];
}
interface keywords {
  keywordId: number;
  name: string;
}

interface KeywordFilterProps {
  selectedKeyword: keywords[];
  trendCategoryData: TrendCategoryDataType[];
  onKeywordChange: (keywords: keywords[]) => void;
  onTrendDateChange: (date: string) => void;
}

const KeywordFilter = ({
  selectedKeyword,
  trendCategoryData,
  onKeywordChange,
  onTrendDateChange,
}: KeywordFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [date, setDate] = useState<Date | any>(
    moment(new Date()).subtract(1, "day").format("YYYY-MM-DD")
  );
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const categoryClick = (category: number) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    onTrendDateChange(moment(date).subtract(1, "day").format("YYYY-MM-DD"));
  }, [date]);

  const keywordClick = (keyword: keywords) => {
    if (selectedKeyword.includes(keyword)) {
      onKeywordChange(selectedKeyword.filter((kw) => kw !== keyword));
    } else {
      onKeywordChange([...selectedKeyword, keyword]);
    }
  };

  const selectedKeywordClick = (keyword:keywords) => {
    onKeywordChange(selectedKeyword.filter((kw) => kw !== keyword));
  }

  const resetKeyword = () => {
    onKeywordChange([]);
  };

  const dateChange = (date: Date | any) => {
    setDate(date);
    setShowCalendar(false);
  };



  return (
    <Container>
      <SelectedKeyword>
        <div className="label">선택된 키워드</div>
        <div className="keywordList">
          {selectedKeyword &&
            selectedKeyword.map((li, idx) => <div key={idx} onClick={() => selectedKeywordClick(li)}># {li.name}</div>)}
        </div>
        <div className="calendar">
          <div>{moment(date).format("YYYY년 MM월 DD일")}</div>
          <FaRegCalendarAlt
            className="icon"
            onClick={() => setShowCalendar(!showCalendar)}
          />
          {showCalendar && (
            <CalendarWrapper>
              <CustomCalendar date={date} dateChange={dateChange} />
            </CalendarWrapper>
          )}
        </div>
        <div className="searchBtn" onClick={resetKeyword}>
          <div>초기화</div>
          <FaArrowRotateLeft />
        </div>
      </SelectedKeyword>
      <Category>
        <div className="label">카테고리</div>
        <div className="categoryList">
          {trendCategoryData.map((li, idx) => (
            <div
              key={idx}
              onClick={() => categoryClick(li.trendCategoryId)}
              className={
                selectedCategory === li.trendCategoryId ? "selected" : ""
              }
            >
              {li.name}
            </div>
          ))}
        </div>
      </Category>
      <KeywordList>
        {selectedCategory &&
          trendCategoryData
            .find((data) => data.trendCategoryId === selectedCategory)
            ?.keywords.map((li, idx) => (
              <KeywordItem
                key={idx}
                onClick={() => keywordClick(li)}
                selected={selectedKeyword.includes(li)}
              >
                # {li.name}
              </KeywordItem>
            ))}
      </KeywordList>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column;
  font-size: 1.5rem;
  padding: 5px;
`;

const SelectedKeyword = styled.div`
  width: 100%;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  justify-items: center;
  .label {
    min-width: 200px;
    color: ${Colors.main};
    font-weight: bold;
    font-size: 2rem;
    align-content: center;
    text-align: center;
    border-right: solid 2px #bebebe7e;
    margin: 5px 0px;
  }

  .keywordList {
    flex: 1 0 auto;
    width: 50%;
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    div {
      margin: 0px 5px;
      padding: 10px 15px;
      border-radius: 30px;

      &:hover {
        background-color: #dadada;
      }
    }
  }

  .searchBtn {
    padding: 3px;
    font-size: 2rem;
    margin-right: 20px;
    margin-top: 5px;
    padding: 8px 15px;
    display: flex;
    align-items: center;
    align-self: center;
    cursor: pointer;
    background-color: ${Colors.sub4};
    border-radius: 10px;

    div {
      margin-right: 10px;
    }

    &:hover {
      background-color: #dadada;
    }
  }
  .calendar {
    margin-top: 3px;
    position: relative;
    display: flex;
    align-items: center;
    font-size: 2rem;
    .icon {
      margin: 5px 10px;
      font-size: 2.5rem;
      padding: 8px;
      background-color: ${Colors.sub4};
      border-radius: 10px;
      cursor: pointer;
      &:hover {
        background-color: #dadada;
      }
    }
  }
`;

const Category = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 50px;
  .label {
    min-width: 200px;
    color: ${Colors.main};
    font-weight: bold;
    font-size: 2rem;
    align-content: center;
    text-align: center;
    border-right: solid 2px #bebebe7e;
    margin: 5px 0px;
  }

  .categoryList {
    flex: 1 0 auto;
    align-content: center;
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;

    div {
      height: 70%;
      padding: 0px 30px;
      align-content: center;
      border-right: solid 2px #bebebe7e;

      &:hover {
        background-color: ${Colors.sub4};
      }
    }
    .selected {
      background-color: ${Colors.sub4};
    }
  }
`;

const KeywordList = styled.div`
  min-height: 50px;
  flex-grow: 1;
  padding: 0px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const KeywordItem = styled.div<{ selected: boolean }>`
  margin: 0px 5px;
  padding: 5px 15px;
  border-radius: 30px;
  box-sizing: border-box;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected ? `${Colors.sub4}` : "initial"};
  color: ${(props) => (props.selected ? "#5c5c5c" : "initial")};

  &:hover {
    background-color: ${Colors.sub4};
  }
`;

const CalendarWrapper = styled.div`
  position: absolute;
  top: 45px;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  z-index: 1;
`;

export default KeywordFilter;
