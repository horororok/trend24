import styled from "styled-components";
import Table from "../components/pages/hottrend/KeywordTable";
import { useState, useEffect } from "react";
import KeywordDetail from "../components/pages/hottrend/KeywordDetail";
import { getTrendKeyword } from "../apis/trendApi";
import { FaChartLine, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Colors from "../constants/Color";
import moment from "moment";

interface TrendKeywordType {
  date: string;
  words: wordType[];
}

interface wordType {
  keywordId: number;
  name: string;
  clickCount: number;
  ranking: number;
}

const HotTrend = () => {
  const [keyword, setKeyword] = useState<wordType | null>(null); // 키워드의 단어와 id 저장
  const [selectedTable, setSelectedTable] = useState<string>(""); // 날짜 데이터 저장
  const [trendKeyword, setTrendKeyword] = useState<TrendKeywordType[]>([]); // 전체 테이블의 키워드 정보 저장
  const [tableDate, setTableDate] = useState<Date>(new Date());
  const [hoverWord, setHoverWord] = useState<wordType | null>(null);

  // 테이블 클릭 이벤트
  const handleTableClick = (date: string) => {
    if (selectedTable == "") {
      setSelectedTable(date);
    } else {
      setSelectedTable("");
      setKeyword(null);
    }
  };
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 키워드 클릭했을때 이벤트
  const handleKeyword = (key: wordType) => {
    setKeyword(key);
  };

  // 데이터 통신
  useEffect(() => {
    const fetchData = async () => {
      try {
        return await getTrendKeyword(
          moment(tableDate).subtract(1, "day").format("YYYY-MM-DD")
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData().then((res) => setTrendKeyword(res));
  }, [tableDate]);

  const hoverWordChange = (hoverWord: wordType) => {
    setHoverWord(hoverWord);
  };

  return (
    <Container>
      <Title>
        <FaChartLine className="icon" />
        인기 트렌드
      </Title>
      {selectedTable && (
        <PrevBtn onClick={() => handleTableClick("")}>
          <FaArrowLeft className="icon" />
        </PrevBtn>
      )}
      {!selectedTable && (
        <DateBtnWrapper>
          <NextBtn
            onClick={() =>
              setTableDate(() => {
                const nextDate = new Date(tableDate);
                nextDate.setDate(nextDate.getDate() + 1);
                if (nextDate > new Date()) return new Date();
                else return nextDate;
              })
            }
          >
            <FaArrowLeft className="icon" /> &nbsp; 이후 날짜
          </NextBtn>
          <PrevBtn
            onClick={() =>
              setTableDate(() => {
                const prevDate = new Date(tableDate);
                prevDate.setDate(prevDate.getDate() - 1);
                return prevDate;
              })
            }
          >
            이전 날짜 &nbsp;
            <FaArrowRight className="icon" />
          </PrevBtn>
        </DateBtnWrapper>
      )}
      <Content>
        {trendKeyword.map(
          (list, idx) =>
            (selectedTable === "" || selectedTable === list.date) && (
              <TableWrapper key={idx} onMouseLeave={() => setHoverWord(null)}>
                <Table
                  date={list.date}
                  columnList={list.words}
                  handleKeyword={handleKeyword}
                  handleTableClick={() => handleTableClick(list.date)}
                  selectedKeyword={keyword}
                  hoverWord={hoverWord}
                  hoverWordChange={hoverWordChange}
                  
                />
              </TableWrapper>
            )
        )}

        {selectedTable !== "" && (
          <KeywordDetailWrapper>
            <KeywordDetail keyword={keyword!} />
          </KeywordDetailWrapper>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border-radius: 20px;
  box-sizing: border-box;
`;

const Title = styled.div`
  display: flex;
  font-size: 2.5rem;
  margin: 20px 10px;
  font-weight: bold;
  align-items: center;

  .icon {
    font-size: 4rem;
    color: #313131;
    margin-right: 10px;
  }
`;
const DateBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${Colors.sub1};
`;

const PrevBtn = styled.div`
  display: flex;
  justify-content: left;
  margin-left: 10px;
  font-size: 2rem;
  color: ${Colors.sub1};
  cursor: pointer;
  margin: 8px;
  .icon {
    margin-right: 10px;
    font-size: 2.5rem;
  }
`;
const NextBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 10px;
  font-size: 2rem;
  margin: 5px;
  cursor: pointer;
  .icon {
    margin-left: 10px;
    font-size: 2.5rem;
  }
`;

const Content = styled.div`
  /* flex: 1; */
  flex-grow: 1;
  width: 100%;
  /* height: 100%; */
  display: flex;
  overflow-x: hidden;
  border-radius: 10px;
`;

const TableWrapper = styled.div`
  overflow: auto;
  margin-right: 5px;
  flex-grow: 1;
  box-shadow: -3px -3px 7px #ffffff73, 3px 3px 5px rgba(94, 104, 121, 0.288);

  &:first-child {
    box-shadow: 1px 0px 5px 1px #67676755;
  }
  &:last-child {
    box-shadow: 1px 0px 5px 1px #67676755;
  }
`;
const KeywordDetailWrapper = styled.div`
  width: 85%;
`;

export default HotTrend;
