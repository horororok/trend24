import { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../modal/Modal";
import Colors from "../../../constants/Color";
import CustomDropdown from "../select/Select";
import { getDrawer, postDrawerBook } from "../../../apis/drawerApi";

interface ModalDataType {
  listName: string;
  listKey: number;
}

interface ModalProps {
  bookId: number;
  modalOpen: boolean;
  changeModalOpen: (state: boolean) => void;
}

const BookDrawerSaveModal = ({
  bookId,
  modalOpen,
  changeModalOpen,
}: ModalProps) => {
  const [drawerKeyword, setDrawerKeyword] = useState<ModalDataType[]>([]); // 서랍 키워드 목록 -> 책 서랍에 저장할때 키워드 선택하는 부분에서 사용
  const [modalState, setModalState] = useState<boolean | null>(null); // 도서 저장 상태 관리 (true: 도서 저장 완료, false: 도서 저장 실패, null: 도서 저장버튼 클릭 전)
  const [selectedItem, setSelectedItem] = useState<ModalDataType>({
    listName: "Selected item",
    listKey: 0,
  }); // 선택된 서랍 키워드 저장

  // 선택된 서랍 키워드 저장
  const selectItem = (item: ModalDataType) => {
    setSelectedItem(item);
  };

  // 서랍 책 추가 api 호출
  const addDrawerBook = async (bookId: number) => {
    try {
      return await postDrawerBook(selectedItem.listKey, bookId);
    } catch (error) {
      console.log(error);
    }
  };

  // 서랍 키워드 api 호출 -> dropbox 키워드 목록 보여주기위한 api 호출
  const getDrawerKeyword = async () => {
    try {
      return await getDrawer({
        showList: true,
        page: 0,
        size: 100000,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // 처음 실행시 dropbox 키워드 목록 채우기
  useEffect(() => {
    getDrawerKeyword().then((res) => {
      setDrawerKeyword(
        res.map((x: { drawerId: number; name: string; books: [] }) => ({
          listName: x.name,
          listKey: x.drawerId,
        }))
      );
    });
  }, []);

  // 키워드에 책 추가 api
  const saveBook = (bookId: number) => {
    console.log("bookId: 이게 찐 ", bookId);
    if (selectedItem.listKey == -1) {
      setModalState(false);
      setTimeout(() => {
        setModalState(null);
        setSelectedItem({ listName: "Selected item", listKey: -1 });
      }, 2300);
    } else {
      addDrawerBook(bookId)
        .then(() => {
          setModalState(true);
          setTimeout(() => {
            changeModalOpen(false); 
            setModalState(null);
            setSelectedItem({ listName: "Selected item", listKey: -1 });
          }, 1900); // 잠시 대기 후 모달을 닫음
        })
        .catch((error) => {
          console.log(error);
          setModalState(false);
          setTimeout(() => {
            setModalState(null);
            setSelectedItem({ listName: "Selected item", listKey: -1 });
          }, 2300);
        });
    }
  };

  return (
    <Modal
      isOpen={modalOpen}
      onClose={() => {
        changeModalOpen(false);
      }}
    >
      {modalState == null && (
        <>
          <ModalBody>
            <div className="title">서랍에 추가</div>
            <CustomDropdown
              itemList={drawerKeyword}
              onSelectItem={selectItem}
              selectedItem={selectedItem}
            />
          </ModalBody>
          <ModalFooter>
            <div className="saveBtn" onClick={() => saveBook(bookId)}>
              저장
            </div>
          </ModalFooter>
        </>
      )}
      {modalState === true && (
        <ModalState>
          <img className="icon" src="/Image/Modal/save.gif" />
          도서 저장 성공
        </ModalState>
      )}
      {modalState === false && (
        <ModalState>
          <img className="icon" src="/Image/Modal/fail.gif" />
          도서 저장 실패
          <br />
          다시 키워드를 선택해주세요.
        </ModalState>
      )}
    </Modal>
  );
};

const ModalBody = styled.div`
  padding: 30px;
  .title {
    text-align: center;
    margin-bottom: 30px;
    font-size: 3rem;
    font-weight: bold;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 30px 30px;
  .saveBtn {
    display: inline-flex;
    width: auto;
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
  }
`;

const ModalState = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 150%;
  font-size: 3rem;
  margin-bottom: 50px;
  .icon {
    width: 30%;
    height: auto;
    margin: 10px;
  }
`;

export default BookDrawerSaveModal;
