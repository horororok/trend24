import React, { useState } from "react";
import styled from "styled-components";
import Colors from "../../../constants/Color";
import { postDrawerKeyword } from "../../../apis/drawerApi";
type Keyword = {
  drawerId: number;
  name: string;
  books: {
    bookId: number;
    productId: number;
    searchKeyword: string;
    totalClickCount: number;
    totalOrderCount: number;
    totalOrderAmount: number;
    contents: string;
    productName: string;
    salePrice: number;
    categoryName: string;
    totalPurchaseCount: number | null;
  }[];
};

const AddKeywordModalContent = ({
  setShowAddKeywordModal,
  addKeyword,
}: {
  setShowAddKeywordModal: () => void;
  addKeyword: (keyword: Keyword) => void;
}) => {
  const [inputValue, setInputValue] = useState<string>(""); // 입력 값을 상태로 관리
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false); // 성공 모달 상태
  const [showErrorModal, setShowErrorModal] = useState<string | null>(null); // 실패 모달 상태

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // 이벤트 버블링 방지
  };

  const postKeyword = async (keyword: string) => {
    try {
      return await postDrawerKeyword(keyword);
    } catch (error) {
      console.log(error);
      throw error; // 에러를 잡아서 상위로 전달
    }
  };

  const handleAddClick = () => {
    // 입력 값이 존재하는지 확인하고, 존재한다면 addBookList 함수 호출
    if (inputValue.trim() !== "") {
      console.log(inputValue);
      postKeyword(inputValue)
        .then((res) => {
          const newKeyword: Keyword = {
            drawerId: res.drawerId,
            name: inputValue,
            books: [],
          };
          addKeyword(newKeyword); // addBookList 함수 호출하여 새로운 책 정보 전달
          setInputValue(""); // 입력 값 초기화
          setShowSuccessModal(true); // 성공 모달 띄우기
        })
        .catch((error) => {
          if (error.message == "이미 존재하는 서랍입니다.") {
            setShowErrorModal("이미 존재하는 서랍입니다.");
          } else {
            setShowErrorModal("키워드 저장에 실패하였습니다.");
          }
        });
    }
  };

  return (
    <AddKeywordModalContainer onClick={handleBackgroundClick}>
      {!showSuccessModal && showErrorModal == null && (
        <>
          <AddKeywordModalTitle>키워드 추가</AddKeywordModalTitle>
          <AddKeywordModalBody>
            <AddKeywordModalInput
              placeholder="키워드"
              value={inputValue} // 입력 값과 input 요소를 바인딩
              onChange={(e) => setInputValue(e.target.value)} // 입력 값이 변경될 때마다 상태 업데이트
            />
            <ModalFooter>
              <AddKeywordModalBtn
                onClick={() => {
                  handleAddClick();
                }}
              >
                추가
              </AddKeywordModalBtn>
            </ModalFooter>
          </AddKeywordModalBody>
        </>
      )}

      {showSuccessModal && (
        <>
          <AddKeywordModalTitle>키워드 추가 성공</AddKeywordModalTitle>
          <AddKeywordModalBody>
            <ModalFooter>
              <AddKeywordModalBtn
                onClick={() => {
                  setShowAddKeywordModal();
                }}
              >
                닫기
              </AddKeywordModalBtn>
            </ModalFooter>
          </AddKeywordModalBody>
        </>
      )}
      {showErrorModal && (
        <>
          <AddKeywordModalTitle>이미 존재하는 서랍입니다.</AddKeywordModalTitle>
          <AddKeywordModalBody>
            <ModalFooter>
              <AddKeywordModalBtn
                onClick={() => {
                  setShowErrorModal(null);
                }}
              >
                닫기
              </AddKeywordModalBtn>
            </ModalFooter>
          </AddKeywordModalBody>
        </>
      )}
    </AddKeywordModalContainer>
  );
};

const AddKeywordModalContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddKeywordModalTitle = styled.div`
  text-align: center;
  margin-bottom: 30px;
  font-size: 3rem;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const AddKeywordModalBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddKeywordModalInput = styled.input`
  width: 70%;
  height: 30px;

  padding: 1.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.6rem;
  cursor: pointer;
  border: 2px solid #7878783b;
`;

const AddKeywordModalBtn = styled.div`
  margin-top: 30px;
  margin-right: 20px;
  padding: 15px 25px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.sub1};
  color: #ffffff;
  font-size: 1.6rem;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transition: opacity 0.1s ease-out;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export default AddKeywordModalContent;
