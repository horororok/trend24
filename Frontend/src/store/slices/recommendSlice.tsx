import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BookType } from "../../constants/Type/Type";

export interface questionType {
  id: number;
  questionText: string;
}

interface RecommendState {
  selectedQuestion: questionType;
  selectedBook: BookType;
}

const initialState: RecommendState = {
  selectedQuestion: { id: -1, questionText: "" },
  selectedBook: {
    bookId: -1,
    productId: -1,
    searchKeyword: "",
    totalClickCount: 0,
    totalOrderCount: 0,
    totalOrderAmount: 0,
    contents: "",
    productName: "",
    salePrice: 0,
    categoryName: "",
    totalPurchaseCount: 0,
    keywords: [],
  },
};

const recommendSlice = createSlice({
  name: "recommend",
  initialState,
  reducers: {
    setQuestion: (state, action: PayloadAction<questionType>) => {
      state.selectedQuestion = action.payload;
    },
    setBook: (state, action: PayloadAction<BookType>) => {
      state.selectedBook = action.payload;
    },
  },
});

export const { setQuestion, setBook } = recommendSlice.actions;
export default recommendSlice.reducer;
