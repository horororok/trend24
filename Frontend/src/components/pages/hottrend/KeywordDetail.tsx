import styled from "styled-components";
import { useState, useEffect } from "react";
import KeywordCalendar from "./KeywordCalendar";
import KeywordSource from "./KeywordSource";
import BookList from "../../common/book/BookList";
import { getKeywordRanking, getKeywordReference } from "../../../apis/trendApi";
import { getTrendSearchBooks } from "../../../apis/recommendApi";
import { BookType, PageInfo } from "../../../constants/Type/Type";

interface wordType {
  keywordId: number;
  name: string;
  clickCount: number;
  ranking: number;
}

interface rankingType {
  date: string;
  ranking: number;
}

interface referenceType {
  platformId: number;
  platform: string;
  data: {
    uri: string;
    contents: {
      title: string;
      video_id: string;
      published_at: string;
      video_keywords: string[];
    };
  };
}
const defaultReference: referenceType = {
  platformId: 0, 
  platform: "", 
  data: {
    uri: "",
    contents: {
      title: "",
      video_id: "",
      published_at: "",
      video_keywords: [],
    },
  },
};


const KeywordDetail = ({ keyword }: { keyword: wordType }) => {
  const [bookList, setBookList] = useState<BookType[]>([]);
  const [ranking, setRanking] = useState<rankingType[]>([]);
  const [reference, setReference] = useState<referenceType>(defaultReference);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getRanking = async () => {
    try {
      return await getKeywordRanking(keyword?.keywordId);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookList = async () => {
    try {
      return await getTrendSearchBooks({
        keywords: [keyword?.keywordId],
        page: currentPage - 1,
        size: itemsPerPage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getReference = async () => {
    try {
      const res = await getKeywordReference(keyword?.keywordId);
      return res[0];
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRanking().then((res) => (res.length !== 0 ? setRanking(res) : null));
    getReference().then((res) => (res !== null ? setReference(res) : null));
    getBookList().then((res) => {
      if (res.length !== 0) {
        setBookList(res.list);
        setCurrentPage(1);
        setTotalElements(res.pageInfo.totalElements);
        console.log(res.pageInfo);
        
        setTotalPages(
          res.pageInfo.totalPages == 0
            ? 1
            : res.pageInfo.totalPages
        );
      }
    });
  }, [keyword]);

  useEffect(() => {
    getBookList().then((res) => {
      if (res.length !== 0) {
        setBookList(res.list);
        setTotalElements(res.pageInfo.totalElements);
        setTotalPages(res.pageInfo.totalPages);
      }
    });
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <Container>
      <BookWrapper>
        <BookList
          bookList={bookList}
          title={"# " + keyword?.name}
          pageInfo={
            {
              page: currentPage,
              size: itemsPerPage,
              totalElements: totalElements,
              totalPages: totalPages,
            } as PageInfo
          }
          onNextPage={nextPage}
          onPrevPage={prevPage}
        />
      </BookWrapper>

      <KeywordCalendarWrapper>
        <KeywordCalendar rankingData={ranking} />
      </KeywordCalendarWrapper>

      <KeywordSourceWrapper>
        <KeywordSource
          platform={reference?.platform}
          data={reference?.data}
        />
      </KeywordSourceWrapper>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 5fr 1fr;
  grid-template-rows: 1fr 3fr;
  grid-template-areas:
    "book keyword"
    "book source";
`;

const BookWrapper = styled.div`
  grid-area: book;
  overflow-y: auto;
  box-shadow: 1px 0px 5px 1px #67676755;
  background-color: white;
  box-sizing: border-box;
  margin: 5px 10px;
  border-radius: 10px;
  box-sizing: border-box;
`;

const KeywordCalendarWrapper = styled.div`
  grid-area: keyword;
  box-shadow: 1px 0px 5px 1px #67676755;
  background-color: white;
  box-sizing: border-box;
  margin: 5px 10px 5px 5px;
  border-radius: 10px;
`;

const KeywordSourceWrapper = styled.div`
  grid-area: source;
  box-shadow: 1px 0px 5px 1px #67676755;
  background-color: white;
  box-sizing: border-box;
  margin: 10px 10px 10px 5px;
  border-radius: 10px;
`;

export default KeywordDetail;
