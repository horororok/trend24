import { api } from "./apiConfig";

// 사용자 페이지에서 일주일동안의
// 도서 클릭수가 높은 도서 3권을 보여준다.
// 순위, 도서 제목, 클릭수를 보여준다.
// weeklyClickCount는 오늘~지난주까지의 클릭 데이터 오늘 날짜가 왼쪽, 지난주로 갈수록 오른쪽에 있다
// GET /status/books
export const getWeeklyBookClick = async () => {
  try {
    const response = await api.get(`/status/books`);
    console.log(response);
    return response.data.result.list;
  } catch (error) {
    console.log(error);
  }
};

// 클릭수가 높은 키워드 리스트(5개)를 보여준다.
// GET /status/keywords
export const getHighClickKeywords = async () => {
  try {
    const response = await api.get(`/status/keywords`);
    console.log(response);
    return response.data.result.list;
  } catch (error) {
    console.log(error);
  }
};

// UA-2에서 변화차트 보기를 클릭한 키워드에 대해서
// 일별 변화 그래프를 제공한다
// 가로축 : 하루 단위로 날짜 데이터(일주일치 데이터 제공)
// 세로축 : 해당 키워드의 클릭수
// date는 최신순으로 보여줌 (오늘 날짜일수록 먼저 나옴)
// GET /status/keywords/{:keywordName}
export const getKeywordClickCount = async (keywordName: string) => {
  try {
    const response = await api.get(`/status/keywords/${keywordName}`);
    console.log(response);
    return response.data.result.list;
  } catch (error) {
    console.log(error);
  }
};
