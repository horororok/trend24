import { useEffect, useState } from "react";
import styled from "styled-components";
import BookFilter from "../components/pages/bookSearch/BookFilter";
import BookList from "../components/common/book/BookList";
import { BookType, PageInfo } from "../constants/Type/Type";
import { getSearchBook, getSearchBookSentence } from "../apis/searchApi";
import { PiBooksDuotone } from "react-icons/pi";

const BookSearch = () => {
  const [bookList, setBookList] = useState<BookType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("basic");
  const [loading, setLoading] = useState<boolean>(false);

  const getBookList = async () => {
    try {
      return await getSearchBook({
        title: searchText,
        category: selectedCategory === "전체" ? "" : selectedCategory,
        page: currentPage - 1,
        size: itemsPerPage,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  const getBookLiveList = async () => {
    try {
      return await getSearchBookSentence(searchText);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (searchType === "basic") {
      getBookList().then((res) => {
        if (res.length !== 0) {
          console.log(res.list);

          setBookList(res.list);
          setTotalElements(res.pageInfo.totalElements);
          setTotalPages(res.pageInfo.totalPages);
          setLoading(false);
        }
      });
    } else {
      getBookLiveList().then((res) => {
        if (res.length !== 0) {
          console.log(res);

          setBookList(res);
          setTotalElements(10);
          setTotalPages(1);
          setLoading(false);
        }
      });
    }
  }, [searchText, selectedCategory, currentPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = (type: string, text: string) => {
    setSearchText(text);
    setSearchType(type);
  };

  return (
    <Container>
      <Title>
        <PiBooksDuotone className="icon" />
        도서 검색
      </Title>
      <SearchContainer>
        <BookFilter
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
          handleSearch={handleSearch}
        />
      </SearchContainer>
      <BookListContainer>
        {!loading && (
          <BookList
            bookList={bookList}
            title="도서 검색 결과"
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
        )}
        {loading && (
          <Loading>
            <img src="/Image/Logo/gifLogo3.gif" />
            <div>책 검색중...</div>
          </Loading>
        )}
      </BookListContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
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

const SearchContainer = styled.div`
  width: 100%;
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

const Loading = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  font-size: 4rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img{
    width: 40%;
  }
`;

export default BookSearch;
