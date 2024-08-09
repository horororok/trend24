// 트렌드 검색 페이지 더미데이터
interface TrendCategoryDataType {
  trendCategoryId: number;
  name: string;
  keywords: {
    keywordId: number;
    name: string;
  }[];
}

export const trendCategoryData: TrendCategoryDataType[] = [
  {
    trendCategoryId: 1,
    name: "it",
    keywords: [
      {
        keywordId: 1,
        name: "인공지능",
      },
      {
        keywordId: 2,
        name: "IoT",
      },
      {
        keywordId: 1,
        name: "블록체인",
      },
      {
        keywordId: 2,
        name: "자동화",
      },
      {
        keywordId: 1,
        name: "IT",
      },
      {
        keywordId: 2,
        name: "빅데이터",
      },
    ],
  },
  {
    trendCategoryId: 2,
    name: "부동산",
    keywords: [
      {
        keywordId: 3,
        name: "토비",
      },
    ],
  },
  {
    trendCategoryId: 2,
    name: "금융",
    keywords: [
      {
        keywordId: 3,
        name: "토비",
      },
    ],
  },
  {
    trendCategoryId: 2,
    name: "게임",
    keywords: [
      {
        keywordId: 3,
        name: "토비",
      },
    ],
  },
  {
    trendCategoryId: 2,
    name: "취미",
    keywords: [
      {
        keywordId: 3,
        name: "토비",
      },
    ],
  },
];
