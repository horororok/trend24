import { api } from "./apiConfig";

// QB-04 도서 검색창에 입력한 키워드
export const getSearchBook = async (bookName: string) => {
  try {
    const res = await api.get(`/anonymous/search/${bookName}`);
    return res.data.result.list;
  } catch (error) {
    console.log(error);
  }
};

// QB-01 전체 질문 리스트
export const getQuestion = async () => {
  try {
    const res = await api.get(`/anonymous/question`);
    return res.data.result.list;
  } catch (error) {
    console.log(error);
  }
};

// QB-03 선택한 질문에 해당되는 도서들의 제목 리스트
export const getQuestionBooks = async (questionId: number) => {
  try {
    const res = await api.get(`/anonymous/question/${questionId}`);
    return res.data.result.list;
  } catch (error) {
    console.log(error);
  }
};

// QB-03 선택한 질문에 해당되는 도서들의 제목 리스트
export const postBookSelect = async (questionId: number, bookId: number) => {
  try {
    const res = await api.post(`/anonymous/question/${questionId}/books`, {
      bookId: `${bookId}`,
    });
    return res.data.result.list;
  } catch (error) {
    console.log(error);
  }
};

// BR-01 도서 및 키워드 클릭 수 올리기
export const postBookClick = async (
  bookId: number,
  categoryId: number,
  keyword: string
) => {
  try {
    const res = await api.post(
      `/anonymous2/recommend/book/${bookId}/click?category-id=${categoryId}&keywords=${keyword}`
    );
    return res.data.result;
  } catch (error) {
    console.log(error);
  }
};

// BR-03 카테고리별 키워드 및 도서 목록(워드클라우드)
export const getWordCloudData = async (
  categoryId: number,
  date: string | null,
  size: number = 5
) => {
  try {
    let url = `/anonymous2/recommend?categoryId=${categoryId}&size=${size}`;
    if (date !== null) {
      url += `&date=${date}`;
    }
    const res = await api.get(url);

    return res.data.result.list;
  } catch (error) {
    console.log(error);
  }
};
