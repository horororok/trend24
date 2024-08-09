import { useEffect, useState } from "react";
import styled from "styled-components";
import { PageInfo } from "../../../constants/DummyData/BookListData";
import { MdOutlineMenuBook } from "react-icons/md";

import { MdOutlineSave } from "react-icons/md";
import { BookType } from "../../../constants/Type/Type";
import Colors from "../../../constants/Color";
import BookDrawerSaveModal from "./BookDrawerSaveModal";

interface BookListProps {
  title: string;
  bookList: BookType[];
  pageInfo: PageInfo;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const BookList = ({
  title,
  bookList,
  pageInfo,
  onNextPage,
  onPrevPage,
}: BookListProps) => {
  const [showBookContent, setShowBookContent] = useState<boolean[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedBookId, setSelectedBookId] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 토글 함수
  const toggleBookContent = (index: number) => {
    setShowBookContent((prevState) =>
      prevState.map((state, idx) => (idx === index ? !state : state))
    );
  };

  // 토글 함수
  const changeModalOpen = (state: boolean) => {
    setModalOpen(state);
  };

  // 초기화 이펙트
  useEffect(() => {
    setLoading(false);
    setShowBookContent(Array(bookList.length).fill(false));
  }, [bookList]);

  const bookClick = (bookId: number) => {
    setSelectedBookId(bookId);
    setModalOpen(true);
  };

  return (
    <Container>
      <Title>{title}</Title>

      <BookListContainer>
        {bookList &&
          bookList.length !== 0 &&
          bookList.map((book: BookType, index: number) => (
            <BookContainer key={index}>
              <NextBtn onClick={() => toggleBookContent(index)}>
                <MdOutlineMenuBook />
              </NextBtn>

              <BookCover
                $hovered={hoveredIndex === index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => bookClick(book.bookId)}
              >
                <img
                  src={`https://image.yes24.com/goods/${book.productId}/XL`}
                  alt="Book Cover"
                />
                {hoveredIndex === index && (
                  <div className="saveBtn">
                    <MdOutlineSave /> 저장
                  </div>
                )}
              </BookCover>

              <BookInfo>
                <div className="title">{book.productName}</div>
                {showBookContent[index] ? (
                  <div>{book.contents}</div>
                ) : (
                  <>
                    <div>id : {book.bookId}</div>
                    <div>가격 : {book.salePrice}</div>
                    <div>유입 검색어 : {book.searchKeyword}</div>
                    <div>클릭수 : {book.totalClickCount}</div>
                    <div>판매량 : {book.totalOrderCount}</div>
                    <div>총 판매금액 : {book.totalOrderAmount}</div>
                    <div>카테고리 : {book.categoryName}</div>

                    {book.keywords && (
                      <div>키워드 : {book.keywords.map((x) => " # " + x)}</div>
                    )}
                  </>
                )}
              </BookInfo>
              {modalOpen && (
                <BookDrawerSaveModal
                  bookId={selectedBookId}
                  modalOpen={modalOpen}
                  changeModalOpen={changeModalOpen}
                />
              )}
            </BookContainer>
          ))}
      </BookListContainer>
      {pageInfo.totalElements > 0 && (
        <Pagination>
          <button onClick={onPrevPage} disabled={pageInfo.page === 1}>
            Prev
          </button>
          <span>
            {pageInfo.page} / {pageInfo.totalPages}
          </span>
          <button
            onClick={onNextPage}
            disabled={pageInfo.page === pageInfo.totalPages}
          >
            Next
          </button>
        </Pagination>
      )}
      {!loading && pageInfo.totalElements == 0 && (
        <NoData>
          <img src="/Image/Logo/logo.png" />
          <div>검색된 데이터가 없습니다.</div>
        </NoData>
      )}
      {loading && (
        <Loading>
          <img src="/Image/Logo/gifLogo3.gif" />
          <div>책 검색중...</div>
        </Loading>
      )}
    </Container>
  );
};

// 스타일 컴포넌트
const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  width: 100%;
`;

const BookListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(430px, 1fr));
  gap: 5px;
  overflow-y: auto;
`;

const BookContainer = styled.div`
  position: relative;
  display: flex;
  /* min-width: 430px; */
  align-items: center;
  margin: 10px;
  padding: 20px;

  box-sizing: border-box;
  border: 3px solid ${Colors.sub4};
`;

const BookCover = styled.div<{ $hovered: boolean }>`
  width: 30%;
  max-width: 130px;
  position: relative;
  cursor: pointer;
  margin-right: 20px;

  img {
    height: fit-content;
    width: 100%;
    margin-right: 20px;
    transition: filter 0.3s ease-in-out;
    filter: ${({ $hovered }) => ($hovered ? "brightness(70%)" : "none")};
    border-radius: 0px 10px 10px 0px;
  }

  .saveBtn {
    display: flex;
    background-color: #000000bb;
    font-size: 1.5rem;
    position: absolute;
    width: max-content;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    padding: 10px;
    border-radius: 20px;
    svg {
      font-size: 2rem;
      margin-right: 5px;
    }
  }
`;

const BookInfo = styled.div`
  width: 70%;
  max-height: 300px;
  overflow: auto;
  padding: 10px;
  border-radius: 20px;
  font-size: 1.5rem;
  align-self: flex-start;
  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    margin-right: 40px;
  }
`;

const NextBtn = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
  font-size: 3rem;
  color: ${Colors.main};
  position: absolute;
  top: 25px;
  right: 20px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    margin: 0 5px;
    padding: 5px 10px;
    font-size: 1.2rem;
    cursor: pointer;
    background-color: #ccc;
    border: none;
    border-radius: 5px;
    &:hover {
      background-color: #aaa;
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const NoData = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  font-size: 3.5rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    margin-bottom: 30px;
    width: 30%;
  }`;

const Loading = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  font-size: 4rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 40%;
  }
`;

export default BookList;
