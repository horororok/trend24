import { useEffect, useState } from "react";
import styled from "styled-components";
import { bookCategoryData } from "../../../constants/DummyData/BookCategoryData";
import { FaSearch } from "react-icons/fa";
import Colors from "../../../constants/Color";

interface BookFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  handleSearch: (type: string, searchText: string) => void;
}

const BookFilter = ({
  selectedCategory,
  onCategoryChange,
  handleSearch,
}: BookFilterProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("basic");

  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchButtonClick = () => {
    handleSearch(searchType, searchText); // 검색 함수 호출
  };
  useEffect(()=>{
    setSearchText("");
  },[searchType])

  return (
    <Container>
      <SearchTypeTab $type={searchType}>
        <div className="titleSearch" onClick={() => setSearchType("basic")}>
          제목으로 검색
        </div>
        <div className="sentenceSearch" onClick={() => setSearchType("live")}>
          문장으로 검색
        </div>
        <div className="border"></div>
      </SearchTypeTab>
      {searchType == "live" && (
        <Search>
          <div className="desc">자유롭게 검색해주세요.</div>
          
          <input
            type="text"
            value={searchText}
            onChange={handleSearchInputChange}
            placeholder="문장으로 검색"
          />
          
          <button onClick={handleSearchButtonClick}>
            <FaSearch />
          </button>
        </Search>
      )}
      {searchType == "basic" && (
        <>
          <Search>
            <input
              type="text"
              value={searchText}
              onChange={handleSearchInputChange}
              placeholder="제목으로 검색"
            />
            <button onClick={handleSearchButtonClick}>
              <FaSearch />
            </button>
          </Search>

          <Category>
            <div className="label">카테고리</div>
            <div className="content">
              {bookCategoryData.map((li: string, idx: number) => (
                <div
                  key={idx}
                  onClick={() => handleCategoryClick(li)}
                  className={selectedCategory === li ? "selected" : ""}
                >
                  {li}
                </div>
              ))}
            </div>
          </Category>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 5px;
`;

const SearchTypeTab = styled.div<{ $type: string }>`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  font-size: 2rem;
  text-align: center;
  position: relative;
  background-color: white;
  margin-bottom: 10px;

  .titleSearch {
    width: 50%;
    height: 100%;
    margin-top: 10px;
    text-align: center;
    cursor: pointer;
    z-index: 2;
    color: ${(props) => (props.$type === "basic" ? "black" : "#aeaeae")};
  }

  .sentenceSearch {
    width: 50%;
    height: 100%;
    margin-top: 10px;
    text-align: center;
    cursor: pointer;
    z-index: 2;
    color: ${(props) => (props.$type === "live" ? "black" : "#aeaeae")};
  }

  .border {
    position: absolute;
    width: 50%;
    height: 8px;
    background: ${Colors.sub1};
    top: 40px;
    z-index: 2;
    transition: 0.4s;
    transform: ${(props) => {
      if (props.$type === "basic") return "translateX(0)";
      else if (props.$type === "live") return "translateX(100%)";
      else return "translateX(100%)";
    }};
  }
`;
const Search = styled.div`
  align-self: center;
  margin: 5px;
  height: 30%;
  width: 50%;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;

  input {
    border: 2px solid #99999987;
    height: 50px;
    max-width: 300px;
    flex-grow: 1;
    box-sizing: border-box;
    text-align: right;
    font-size: 2rem;
    padding-right: 5px;
  }
  button {
    border: none;
    color: ${Colors.main};
    border-radius: 50%;
    background-color: transparent;
    cursor: pointer;
    height: 100%;
    min-width: 50px;
    box-sizing: border-box;
    font-size: 3rem;
    justify-content: center;
  }
  .desc{
    /* width: 300px; */
    margin-right: 10px;

    font-size: 2rem;
  }
`;

const Category = styled.div`
  height: 60%;
  display: flex;

  .label {
    min-width: 120px;
    font-size: 2rem;
    text-align: center;
    align-content: center;
    font-weight: bold;
  }
  .content {
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;

    div {
      font-size: 1.3rem;
      padding: 5px 15px;
      margin: 5px;
      background-color: #ededed;
      border-radius: 15px;
      align-content: center;
      &:hover {
        background-color: #cacaca;
      }
      &.selected {
        background-color: ${Colors.sub4};
        color: white;
      }
    }
  }
`;

export default BookFilter;
