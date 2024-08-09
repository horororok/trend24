import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface EditpageState {
  componentName: string[];
}

const initialState: EditpageState = {
  componentName: [],
};

const editpageSlice = createSlice({
  name: "editpage",
  initialState,
  reducers: {
    setComponentName: (state, action: PayloadAction<string[]>) => {
      state.componentName = action.payload;
    },
  },
});

export const { setComponentName } = editpageSlice.actions;
export default editpageSlice.reducer;