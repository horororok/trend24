import styled from "styled-components";
import { Text } from "@visx/text";
import { scaleLog } from "@visx/scale";
import { Wordcloud } from "@visx/wordcloud";
import { useEffect } from "react";

interface WordCloudProp {
  width: number;
  height: number;
  showControls: boolean;
  wordList: WordType[];
}

interface WordType {
  name: string;
  freq: number;
}

interface WordFrequency {
  [key: string]: number;
}

export interface WordData {
  text: string;
  value: number;
}

const WordCloudComponent = ({ width, height, wordList }: WordCloudProp) => {
  const wordFreq = (wordList: WordType[]): WordData[] => {
    const words: string[] = wordList.map((li) => li.name);
    const freqMap = convertToObject(wordList);

    for (const w of words) {
      if (!freqMap[w]) freqMap[w] = 0;
      freqMap[w] += 1;
    }

    const returnData = Object.keys(freqMap).map((word) => ({
      text: word,
      value: freqMap[word],
    }));

    return returnData;
  };

  const convertToObject = (arr: WordType[]): WordFrequency => {
    const result: WordFrequency = {};
    arr.forEach((item: WordType) => {
      const { name, freq } = item;
      result[name] = freq;
    });
    return result;
  };

  const colors = ["#143059", "#43597A", "#72839B", "#A1ACBD"];

  const words = wordFreq(wordList);
  const fontScale = scaleLog({
    domain: [
      Math.min(...words.map((w) => w.value)),
      Math.max(...words.map((w) => w.value)),
    ],
    range: [20, 100],
  });
  const fontSizeSetter = (datum: WordData) => fontScale(datum.value);
  const fixedValueGenerator = () => 0.5;

  return (
    <WordCloudContainer>
      <Wordcloud
        words={words}
        width={width}
        height={height}
        fontSize={fontSizeSetter}
        padding={2}
        spiral={"archimedean"}
        rotate={0}
        random={fixedValueGenerator}
      >
        {(cloudWords) =>
          cloudWords.map((w, i) => (
            <Text
              key={w.text}
              fill={colors[i % colors.length]}
              textAnchor={"middle"}
              transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
              fontSize={w.size}
              fontFamily={w.font}
            >
              {w.text}
            </Text>
          ))
        }
      </Wordcloud>
    </WordCloudContainer>
  );
};

const WordCloudContainer = styled.div`
  width: 700px;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  background-color: #ffffff;
  border-radius: 50%;
  svg {
    margin: 1rem 0;
    font-weight: 500;
  }
  label {
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    margin-right: 8px;
  }
`;

export default WordCloudComponent;
