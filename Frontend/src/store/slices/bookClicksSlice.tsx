import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// {
//   “status” : 200,
//   “message” : “성공”,
//   “result” : {
//       list: [
//               {
//               “bookId” :  1,
//               “clickCountSum” : 36
//               “productName” : “책제목”,
//               “ranking”: 1,
//               “weeklyClickCount”: [
//                    {
//                        “date” :  “2024-04-25”,
//                        “clickCount” 4
//                    },
//                    {
//                        “date” :  “2024-04-24”,
//                        “clickCount” 3
//                    }
//               ]
//                },
//               {
//               “bookId” :  2,
//               “clickCountSum” : 7
//               “productName” : “책제목”,
//               “ranking”: 2,
//               “weeklyClickCount”: [
//                    {
//                        “date” :  “2024-04-25”,
//                        “clickCount” 4
//                    },
//                    {
//                        “date” :  “2024-04-24”,
//                        “clickCount” 3
//                    }
//               ]
//           }
//       ]
//   }
// }

interface weeklyClickCountProps {
  date: string;
  clickCount: number;
}

interface booksProps {
  bookId: number;
  clickCountSum: number;
  productName: string;
  ranking: number;
  weeklyClickCount: Array<weeklyClickCountProps>;
}

const initialState = {
  books: [] as Array<booksProps>,
  weeklyClickCount: [] as Array<weeklyClickCountProps>,
};

const bookClicksSlice = createSlice({
  name: "bookClicks",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Array<booksProps>>) => {
      state.books = action.payload;
    },
    setWeeklyClickCount: (
      state,
      action: PayloadAction<Array<weeklyClickCountProps>>
    ) => {
      state.weeklyClickCount = action.payload;
    },
  },
});

export const { setBooks, setWeeklyClickCount } = bookClicksSlice.actions;
export default bookClicksSlice.reducer;
