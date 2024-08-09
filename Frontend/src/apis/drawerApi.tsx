import { api } from "./apiConfig";

export const getDrawer = async ({showList, page, size }: { showList: boolean; page: number; size: number }) => {
  try{
    const response = await api.get(`/drawer?show-list=${showList}&page=${page}&size=${size}`);
    return response.data.result.list;
  }catch(error){
    console.log(error);
  }
}

export const postDrawerKeyword = async (keyword:string) => {
  try {
    const response = await api.post("/drawer", {
      name: `${keyword}`,
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};

export const postDrawerBook = async (drawerId: number, bookId: number) => {
  try {
    const response = await api.post(`/drawer/${drawerId}`, {
      bookId: `${bookId}`,
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};