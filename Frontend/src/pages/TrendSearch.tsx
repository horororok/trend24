import { useEffect, useState } from "react";
import styled from "styled-components";
import KeywordFilter from "../components/pages/trendsearch/KeywordFilter";
import BookList from "../components/common/book/BookList";
import { getTrendCategories, getTrendSearchBooks } from "../apis/recommendApi";
import { BookType, PageInfo } from "../constants/Type/Type";
import { TbDeviceDesktopSearch } from "react-icons/tb";
import moment from "moment";

interface TrendCategoryDataType {
  trendCategoryId: number;
  name: string;
  keywords: keywords[];
}
interface keywords {
  keywordId: number;
  name: string;
}

const TrendSearch = () => {
  const [bookList, setBookList] = useState<BookType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedKeyword, setSelectedKeyword] = useState<keywords[]>([]);
  const [trendCategoryData, setTrendCategoryData] = useState<TrendCategoryDataType[]>([]);
  const [trendDate, setTrendDate] = useState<string>(
    moment().subtract(1, "days").format("YYYY-MM-DD")
  );

  const getTrendCategory = async () => {
    try {
      return await getTrendCategories(trendDate);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookList = async () => {
    try {
      return await getTrendSearchBooks({
        keywords: selectedKeyword.map((li) => li.keywordId),
        page: currentPage - 1,
        size: itemsPerPage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrendCategory().then((res) => setTrendCategoryData(res));
  }, [trendDate]);

  useEffect(() => {
    if (selectedKeyword.length !== 0) {
      getBookList().then((res) => {
        if (res.length !== 0) {
          setBookList(res.list);
          setTotalElements(res.pageInfo.totalElements);
          setTotalPages(res.pageInfo.totalPages);
        }
      });
    } else {
      setBookList([]);
      setCurrentPage(1);
      setTotalElements(0);
      setTotalPages(1);
    }
  }, [currentPage, selectedKeyword]);

  const handleKeywordChange = (keywords: keywords[]) => {
    setSelectedKeyword(keywords);
  };

  const handleTrendDateChange = (date: string) => {
    setTrendDate(date);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <Container>
      <Title>
        <TbDeviceDesktopSearch className="icon" />
        트렌드 조회
      </Title>
      <FilterContainer>
        <KeywordFilter
          selectedKeyword={selectedKeyword}
          trendCategoryData={trendCategoryData}
          onKeywordChange={handleKeywordChange}
          onTrendDateChange={handleTrendDateChange}
        />
      </FilterContainer>
      <BookListContainer>
        <BookList
          bookList={bookList}
          title="추천 책 도서"
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
      </BookListContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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

const FilterContainer = styled.div`
  width: 100%;
  /* min-height: 130px; */
  height: fit-content;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: white;
  box-shadow: -3px -3px 7px #ffffff73, 3px 3px 5px rgba(94, 104, 121, 0.288);
`;

const BookListContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow-y: auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: -3px -3px 7px #ffffff73, 3px 3px 5px rgba(94, 104, 121, 0.288);
`;

export default TrendSearch;
