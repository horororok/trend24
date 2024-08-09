import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

import { customizedComponentListData } from "../../constants/DummyData";
import { CustomPageComponentlistProps } from "../../constants/DummyData";

interface CustomPageState {
  initialComponentList: CustomPageComponentlistProps[];
  customizedComponentList: CustomPageComponentlistProps[];
  pageTitle: string;
}

const initialState: CustomPageState = {
  initialComponentList: [],
  customizedComponentList: [],
  // customizedComponentList: [...customizedComponentListData],
  pageTitle: "커스텀페이지",
};

const customPageSlice = createSlice({
  name: "customPage",
  initialState,
  reducers: {
    setInitialComponentList: (
      state,
      action: PayloadAction<CustomPageComponentlistProps[]>
    ) => {
      state.initialComponentList = action.payload;
    },
    setCustomizedComponentList: (
      state,
      action: PayloadAction<CustomPageComponentlistProps[]>
    ) => {
      state.customizedComponentList = action.payload;
    },
    setPageTitle: (state, action: PayloadAction<string>) => {
      state.pageTitle = action.payload;
    },
  },
});

export const {
  setInitialComponentList,
  setCustomizedComponentList,
  setPageTitle,
} = customPageSlice.actions;
export default customPageSlice.reducer;
