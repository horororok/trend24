import { api } from "./apiConfig";

export const getSearchBook = async ({
  title,
  category,
  page,
  size,
}: {
  title: string;
  category: string;
  page: number;
  size: number;
}) => {
  try {
    let url = `/search/?page=${page}&size=${size}`;
    if (title !== "") {
      url += `&title=${title}`;
    }
    if (category !== "") {
      url += `&category=${category}`;
    }
    const response = await api.get(url);
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};

export const getSearchBookSentence = async (sentence: string) => {
  try {
    const response = await api.get(`/search/live?sentence=${sentence}`);
    return response.data.result.list;
  } catch (error) {
    console.log(error);
  }
};
