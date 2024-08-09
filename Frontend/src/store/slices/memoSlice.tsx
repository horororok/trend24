import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface MemoState {
  memo: string;
}

const initialState: MemoState = {
  memo: "",
};

const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    setMemo: (state, action: PayloadAction<string>) => {
      state.memo = action.payload;
    },
  },
});

export const { setMemo } = memoSlice.actions;
export default memoSlice.reducer;
