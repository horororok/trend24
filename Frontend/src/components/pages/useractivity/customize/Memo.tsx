import styled from "styled-components";
import { useState, useEffect } from "react";

import { setMemo } from "../../../../store/slices/memoSlice";
import { RootState } from "../../../../store/store";
import { useSelector, useDispatch } from "react-redux";

const Memo = () => {
  const dispatch = useDispatch();
  const memo = useSelector((state: RootState) => state.memo.memo);
  const [tempMemo, setTempMemo] = useState(memo);

  useEffect(() => {
    // get memo from local storage
    const savedMemo = localStorage.getItem("memo");
    if (savedMemo) {
      setTempMemo(savedMemo);
    }
  }, []);

  useEffect(() => {
    // save memo to local storage when tempMemo changes
    localStorage.setItem("memo", tempMemo);
  }, [tempMemo]);

  const savememo = () => {
    // save memo to server
    dispatch(setMemo(tempMemo));
  };
  return (
    <Container>
      <Content>
        <MemoInput
          placeholder="메모를 입력해주세요"
          value={tempMemo}
          onChange={(e) => {
            setTempMemo(e.target.value);
          }}
        />
      </Content>
      <BtnBox>
        <Btn
          onClick={() => {
            savememo();
          }}
        >
          저장
        </Btn>
      </BtnBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 20px auto; /* 상하 20px, 좌우 자동 마진으로 중앙 정렬 */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  border-radius: 8px; /* 모서리 둥글게 */
  background-color: #fff; /* 배경 색상 */
  box-sizing: border-box; /* padding, border 포함한 크기 설정 */
`;

const Content = styled.div`
  width: 100%;
  height: 90%;
`;

const MemoInput = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem; /* 글자 크기 */
  resize: none; /* 크기 조절 기능 비활성화 */
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  height: 10%;
  box-sizing: border-box;
`;

const Btn = styled.button`
  width: 20%;
  height: 100%;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  font-size: 1rem;
  cursor: pointer;
`;

export default Memo;
