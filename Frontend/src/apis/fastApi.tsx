import axios from "axios";

const fastApi = axios.create({
  baseURL: "http://trend24.live:8000/fastapi",
  headers: { "Content-Type": "application/json" },
});

export const getBookLive = async (text:string) => {
  console.log(text);
  
  try{
    
    const res = await fastApi.get(`/book/live?search_sentence=${text}`);
    console.log(res);
    
    return res.data.result;
  }catch (error){
    console.log(error);
  }
};