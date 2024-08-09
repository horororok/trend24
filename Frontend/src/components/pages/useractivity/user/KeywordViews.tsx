import styled from "styled-components";
import { useEffect, useState } from "react";
import Colors from "../../../../constants/Color";
import { FaArrowLeft } from "react-icons/fa";
import { getHighClickKeywords } from "../../../../apis/uaApi";
import { getKeywordClickCount } from "../../../../apis/uaApi";
import { FaArrowRight } from "react-icons/fa";

// const data = {
//   status: 200,
//   message: "성공",
//   result: {
//     list: [
//       {
//         categories: [
//           {
//             trendCategoryName: "건강",
//           },
//           {
//             trendCategoryName: "뉴스",
//           },
//         ],
//         keywordName: "관절염",
//         clickCountSum: 4,
//       },
//       {
//         categories: [
//           {
//             trendCategoryName: "건강",
//           },
//           {
//             trendCategoryName: "뉴스",
//           },
//         ],
//         keywordName: "관절염",
//         clickCountSum: 4,
//       },
//       {
//         categories: [
//           {
//             trendCategoryName: "건강",
//           },
//           {
//             trendCategoryName: "뉴스",
//           },
//         ],
//         keywordName: "관절염",
//         clickCountSum: 4,
//       },
//       {
//         categories: [
//           {
//             trendCategoryName: "건강",
//           },
//           {
//             trendCategoryName: "뉴스",
//           },
//         ],
//         keywordName: "관절염",
//         clickCountSum: 4,
//       },
//       {
//         categories: [
//           {
//             trendCategoryName: "건강",
//           },
//           {
//             trendCategoryName: "뉴스",
//           },
//         ],
//         keywordName: "관절염",
//         clickCountSum: 4,
//       },
//     ],
//   },
// };

// const data2 = {
//   status: 200,
//   message: "성공",
//   result: {
//     list: [
//       {
//         date: "2024-05-16",
//         trend: true,
//       },
//       {
//         date: "2024-05-15",
//         trend: false,
//       },
//       {
//         date: "2024-05-14",
//         trend: true,
//       },
//       {
//         date: "2024-05-13",
//         trend: false,
//       },
//       {
//         date: "2024-05-12",
//         trend: true,
//       },
//       {
//         date: "2024-05-11",
//         trend: false,
//       },
//       {
//         date: "2024-05-10",
//         trend: true,
//       },
//     ],
//   },
// };

interface weekdataProps {
  date: string;
  trend: boolean;
}
interface keywordProps {
  categories: Array<{ trendCategoryName: string }>;
  keywordName: string;
  clickCountSum: number;
}

const KeywordViews = () => {
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [weekdata, setWeekdata] = useState<weekdataProps[]>([]);
  const [keywordlist, setKeywordlist] = useState<keywordProps[]>([]);
  const [weeklyClicked, setWeeklyClicked] = useState<weekdataProps[]>([]);
  const [clickedKeywordName, setClickedKeywordName] = useState("");

  useEffect(() => {
    getHighClickKeywords().then((res) => {
      setKeywordlist(res);
    });
  }, []);

  useEffect(() => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const formatNumber = (num: number) => `0${num}`.slice(-2);
    const weekdates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(year, month, day - i);
      return `${d.getFullYear()}-${formatNumber(
        d.getMonth() + 1
      )}-${formatNumber(d.getDate())}`;
    });

    setWeekdata(
      weekdates.map((date) => {
        const weeklyData = weeklyClicked.find((d) => d.date === date);
        return {
          date,
          trend: weeklyData ? weeklyData.trend : false,
        };
      })
    );
  }, [weeklyClicked]);

  const showWeeklyKeyword = (keywordName: string) => {
    setClickedKeywordName(keywordName);
    getKeywordClickCount(keywordName).then((res) => {
      setWeeklyClicked(res);
    });
    setIsTableOpen(true);
  };

  const goback = () => {
    setIsTableOpen(false);
  };

  return (
    <Container>
      <Title>키워드 조회수 Top 5</Title>
      {isTableOpen ? (
        <Content>
          <WeeklyData>
            <TableContent1>주간 등장 추이</TableContent1>
            <TableContent2>{clickedKeywordName}</TableContent2>
            <BackBtn onClick={goback}>
              <FaArrowLeft size={"10%"} />
            </BackBtn>
          </WeeklyData>
          <CalendarContainer>
            {weekdata.map((d) => (
              <DayWrapper key={d.date}>
                <DayText>
                  {d.date.split("-")[1] + "/" + d.date.split("-")[2]}
                </DayText>
                <Day key={d.date.split("-")[2]} $isCurrentDay={d.trend}>
                  {d.trend ? "O" : "X"}
                </Day>
              </DayWrapper>
            ))}
          </CalendarContainer>
        </Content>
      ) : (
        <Content>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>순위</TableHeadCell>
                <TableHeadCell>키워드</TableHeadCell>
                <TableHeadCell>카테고리</TableHeadCell>
                <TableHeadCell>조회수</TableHeadCell>
                <TableHeadCell>주간 등장 추이</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {keywordlist.map((keyword, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{keyword.keywordName}</TableCell>
                  <TableCell>
                    {keyword.categories.length > 0 &&
                      keyword.categories.map((category, categoryIndex) => (
                        <span key={categoryIndex}>
                          {category.trendCategoryName === "NEWS"
                            ? "뉴스"
                            : category.trendCategoryName === "ENTERTAINMENT"
                            ? "엔터"
                            : category.trendCategoryName === "NEWMEDIA"
                            ? "뉴미디어"
                            : category.trendCategoryName === "ANIMAL"
                            ? "동물"
                            : "IT"}{" "}
                        </span>
                      ))}
                  </TableCell>
                  <TableCell>{keyword.clickCountSum}</TableCell>
                  <TableWeekly>
                    <FaArrowRight
                      className="icon"
                      onClick={() => showWeeklyKeyword(keyword.keywordName)}
                    />
                  </TableWeekly>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Content>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
  height: 10%;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90%;
  width: 100%;
  box-sizing: border-box;
`;

const Table = styled.table`
  width: 100%;
  height: 100%;
  justify-content: center;
  border-collapse: collapse;
  border-spacing: 0;
  box-sizing: border-box;
`;

const TableHead = styled.thead`
  background-color: #5f996d;
  width: 100%;
`;

const TableRow = styled.tr`
  width: 100%;
  border-bottom: 1px solid #dee2e6;
  &:last-child {
    border-bottom: none;
  }
  box-sizing: border-box;
  text-align: center;
`;

const TableHeadCell = styled.th`
  font-size: 2rem;
  box-sizing: border-box;
`;

const TableBody = styled.tbody`
  font-size: 1.5rem;
  width: 100%;
  box-sizing: border-box;
`;

const TableCell = styled.td`
  padding: 10px;
  box-sizing: border-box;
`;

const TableWeekly = styled.td`
  padding: 10px;
  box-sizing: border-box;

  .icon {
    cursor: pointer;
    font-size: 2rem;
  }
`;

const WeeklyData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20%;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid #c2cec5;
`;

const TableContent1 = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 2rem;
`;
const TableContent2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: ${Colors.main};
`;

const BackBtn = styled.div`
  width: 100%;
  text-align: center;
  cursor: pointer;
`;

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80%;
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

const Day = styled.div<{ $isCurrentDay: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 5px;
  background-color: ${({ $isCurrentDay }) =>
    $isCurrentDay ? Colors.main : "#ccc"};
  color: ${({ $isCurrentDay }) => ($isCurrentDay ? "#fff" : "#333")};
  font-weight: bold;
  font-size: 1.5rem;
`;

export default KeywordViews;
