import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Rnd, DraggableData, ResizableDelta } from "react-rnd";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import CustomComponentList from "../../../common/modal/CustomComponentList";

import CityTotalReport from "../../../googleanalytics/City/CityTotalReport";
import CityUsers from "../../../googleanalytics/City/CityUsers";
import DateAU from "../../../googleanalytics/Date/DateAU";
import DateBounceRate from "../../../googleanalytics/Date/DateBounceRate";
import DateTotalReport from "../../../googleanalytics/Date/DateTotalReport";
import DateUsers from "../../../googleanalytics/Date/DateUsers";
import DateView from "../../../googleanalytics/Date/DateView";
import DeviceAU from "../../../googleanalytics/Device/DeviceAU";
import DeviceTotalReport from "../../../googleanalytics/Device/DeviceTotalReport";
import DeviceUsers from "../../../googleanalytics/Device/DeviceUsers";
import Memo from "./Memo";

import {
  patchCustomComponents,
  getCustomPage,
  patchCustomPage,
  getCustomComponents,
} from "../../../../apis/customApi";

interface CustomizedComponentListProps {
  componentName: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const RnDCustom = () => {
  const [addedList, setAddedList] = useState<CustomizedComponentListProps[]>(
    []
  );
  const [toggleListModal, setToggleListModal] = useState(false);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState("");

  useEffect(() => {
    getCustomPage().then((res) => {
      setTitle(res.name);
      setTempTitle(res.name);
    });
    getCustomComponents().then((res) => {
      setAddedList(res);
    });
  }, []);

  const handleDragStop = (index: number, d: DraggableData) => {
    setAddedList(
      addedList.map((item, i) =>
        i === index ? { ...item, position: { x: d.x, y: d.y } } : item
      )
    );
  };

  // 각 componentName에 대응하는 컴포넌트를 정의합니다.
  const componentMap: { [key: string]: JSX.Element } = {
    CityTotalReport: <CityTotalReport />,
    CityUsers: <CityUsers />,
    DateAU: <DateAU />,
    DateBounceRate: <DateBounceRate />,
    DateTotalReport: <DateTotalReport />,
    DateUsers: <DateUsers />,
    DateView: <DateView />,
    DeviceAU: <DeviceAU />,
    DeviceTotalReport: <DeviceTotalReport />,
    DeviceUsers: <DeviceUsers />,
    Memo: <Memo />,
  };

  const handleResizeStop = (
    index: number,
    direction: string,
    ref: HTMLElement,
    delta: ResizableDelta,
    position: { x: number; y: number }
  ) => {
    setAddedList(
      addedList.map((item, i) =>
        i === index
          ? {
              ...item,
              size: { width: ref.offsetWidth, height: ref.offsetHeight },
              position: { x: position.x, y: position.y },
            }
          : item
      )
    );
  };

  const toggleModal = () => {
    setToggleListModal(!toggleListModal);
  };

  const cancelChange = () => {
    navigate("/main/customizePage");
  };

  const completeCustomize = async () => {
    try {
      await patchCustomComponents(addedList);
      await patchCustomPage(title);

      navigate("/main/customizePage");
    } catch (error) {
      console.error("Error completing customization:", error);
      // 에러 처리 로직 추가 가능
    }
  };

  const makeTempList = (componentName: string) => {
    setAddedList([
      ...addedList,
      {
        componentName: componentName,
        position: { x: 100, y: 100 },
        size: { width: 200, height: 200 },
      },
    ]);
  };

  const sendTitleEdit = (newTitle: string) => {
    setTitle(newTitle);
    setTempTitle(newTitle);
    setIsTitleEditing(false);
  };

  const handleCancelTitleEdit = () => {
    setTitle(tempTitle);
    setIsTitleEditing(false);
  };

  const showEditTitle = () => {
    setIsTitleEditing(true);
    setTitle("");
  };

  const handlleDeleteComponent = (name: string) => {
    setAddedList(addedList.filter((item) => item.componentName !== name));
  };

  return (
    <Container>
      <TitleContainer>
        {isTitleEditing ? (
          <>
            <Title>
              <Input
                type="text"
                placeholder={`${tempTitle}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Button
                onClick={() => {
                  sendTitleEdit(title);
                }}
              >
                확인
              </Button>
              <Button onClick={handleCancelTitleEdit}>취소</Button>
            </Title>
          </>
        ) : (
          <>
            <Title>
              {title}
              <EditBtn onClick={showEditTitle}>
                <MdEdit className="icon" />
              </EditBtn>
            </Title>
          </>
        )}
        <BtnBox>
          <AddBtn onClick={toggleModal}>
            <IoMdAdd size={50} />
            추가
          </AddBtn>
          <CancelBtn onClick={cancelChange}>
            <MdOutlineCancel size={50} />
            취소
          </CancelBtn>
          <CompleteBtn onClick={completeCustomize}>
            <IoSaveOutline size={50} />
            완료
          </CompleteBtn>
        </BtnBox>
      </TitleContainer>

      <DragContainer>
        {addedList.map((item, index) => (
          <Rnd
            key={index}
            size={{ width: item.size.width, height: item.size.height }}
            position={{ x: item.position.x, y: item.position.y }}
            onDragStop={(e, d) => handleDragStop(index, d)}
            onResizeStop={(e, direction, ref, delta, position) =>
              handleResizeStop(index, direction, ref, delta, position)
            }
            resizeGrid={[20, 20]}
            dragGrid={[20, 20]}
            bounds={"parent"}
            minWidth={"20%"}
            minHeight={"20%"}
            maxHeight={"500%"}
            maxWidth={"500%"}
          >
            <Item>
              <DeleteBtn
                onClick={() => {
                  handlleDeleteComponent(item.componentName);
                }}
              >
                <MdDelete className="icon" />
              </DeleteBtn>

              {componentMap[item.componentName]}
            </Item>
          </Rnd>
        ))}
      </DragContainer>
      {toggleListModal && (
        <CustomComponentList
          makeTempList={makeTempList}
          onClose={toggleModal}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
`;

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #000;
  text-align: start;
  flex: 2;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 20px 10px;
  .icon {
    font-size: 3rem;
    color: #313131;
    margin-right: 10px;
  }
`;

const Input = styled.input`
  width: 50%;
  height: 50%;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border 0.3s ease-in-out;

  &:focus {
    border-color: #000000;
    outline: none;
  }
`;

const Button = styled.button`
  height: 50%;
  background-color: #000000;
  color: white;

  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #505050;
  }
`;

const EditBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 2rem;

  .icon {
    font-size: 4rem;
  }
`;

const BtnBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const AddBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: 2rem;
  cursor: pointer;
`;

const CancelBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: 2rem;
  cursor: pointer;
`;

const CompleteBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: 2rem;
  cursor: pointer;
`;

const DragContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  position: relative;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  width: 100%;
  height: 90%;
  box-sizing: border-box;
  background-color: #ffffff;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid #000;
`;

const DeleteBtn = styled.div`
  display: flex;
  height: 10%;
  width: 100%;
  justify-content: flex-end;
  align-items: flex-start;
  cursor: pointer;
  .icon {
    font-size: 3rem;
    &:hover {
      color: red;
    }
  }
`;

export default RnDCustom;
