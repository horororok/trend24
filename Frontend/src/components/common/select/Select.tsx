import { useState } from "react";
import styled from "styled-components";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface itemType {
  listName: string;
  listKey: number;
}

interface CustomDropdownProps {
  itemList: itemType[];
  onSelectItem: (item: itemType) => void;
  selectedItem: itemType;
}

const CustomDropdown = ({
  itemList,
  onSelectItem,
  selectedItem,
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const listClick = (item: itemType) => {
    setIsOpen(false);
    onSelectItem(item);
  };

  return (
    <DropdownWrapper>
      <DropdownSelect onClick={toggleDropdown}>
        <span>{selectedItem.listName}</span>
        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </DropdownSelect>
      <DropdownList $isOpen={isOpen}>
        {itemList.map((item, index) => (
          <DropdownListItem key={index} onClick={() => listClick(item)}>
            {item.listName}
          </DropdownListItem>
        ))}
      </DropdownList>
    </DropdownWrapper>
  );
};

const DropdownWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const DropdownSelect = styled.div`
  padding: 1.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.6rem;
  cursor: pointer;
  border: 2px solid #7878783b;
`;

const DropdownList = styled.div<{ $isOpen: boolean }>`
  /* margin-top: 10px; */
  border: 2px solid #7878783b;
  background-color: white;
  border-radius: 4px;
  position: absolute;

  left: 0;
  right: 0;
  margin-top: 5px;
  max-height: 200px;
  overflow-y: auto;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  transition: opacity 0.2s linear, visibility 0.2s linear;
  z-index: 1;
`;
const DropdownListItem = styled.div`
  padding: 1rem;
  font-size: 1.4rem;
  &:hover {
    background-color: #f0f0f0;
    transition: background-color 0.1s ease-in-out;
  }
`;

export default CustomDropdown;
