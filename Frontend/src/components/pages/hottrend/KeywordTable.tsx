import styled from "styled-components";
import Colors from "../../../constants/Color";

interface Props {
  date: string;
  columnList: wordType[];
  handleKeyword: (key: wordType) => void;
  handleTableClick: (idx: string | null) => void;
  selectedKeyword: wordType | null;
  hoverWord: wordType|null;
  hoverWordChange: (keword: wordType) => void;
}

interface wordType {
  keywordId: number;
  name: string;
  clickCount: number;
  ranking: number;
}

function Table({
  date,
  columnList,
  handleKeyword,
  handleTableClick,
  selectedKeyword,
  hoverWord,
  hoverWordChange,
}: Props) {
  const keywordClick = (li: wordType) => {
    handleKeyword(li);

    if (selectedKeyword === null) {
      handleTableClick(date);
    }
  };

  return (
    <TableContainer>
      <thead>
        <tr>
          <th>{date}</th>
        </tr>
      </thead>
      <tbody>
        {columnList.map((li, idx) => (
          <TableRow
            key={idx}
            $hover={hoverWord?.name == li.name}
            $selectedKeyword={selectedKeyword}
            $currentKeyword={li.keywordId}
          >
            <td onMouseEnter={() => hoverWordChange(li)} onClick={() => keywordClick(li)}>
              {li.name}
            </td>
          </TableRow>
        ))}
      </tbody>
    </TableContainer>
  );
}

const TableContainer = styled.table`
  font-size: 1.4rem;
  width: 100%;
  min-width: 100px;
  border-collapse: collapse;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background-color: white;
  position: relative;

  th,
  td {
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.2);
    color: #000000;
  }
  th {
    position: sticky;
    top: 0;
    background-color: ${Colors.main};
    color: white;
  }

  tbody {
    height: calc(100% - 40px);
  }
`;
const TableRow = styled.tr<{
  $selectedKeyword: wordType | null;
  $currentKeyword: number;
  $hover: boolean;
}>`
  background-color: ${({ $selectedKeyword, $currentKeyword }) =>
    $selectedKeyword !== null && $selectedKeyword?.keywordId === $currentKeyword
      ? Colors.sub1
      : "transparent"};

  td {
    background-color: ${(props) => props.$hover? Colors.sub4: null};
    transition:background-color 0.2s ease;
    &:hover {
      &:before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        background-color: inherit;
        z-index: -1;
      }
    }
  }

  &:hover {
    background-color: ${({ $selectedKeyword, $currentKeyword }) =>
      $selectedKeyword?.keywordId !== $currentKeyword ? Colors.sub4 : "null"};
    cursor: pointer;
  }
`;

export default Table;
