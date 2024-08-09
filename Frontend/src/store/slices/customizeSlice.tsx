import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { customizedComponentListData } from "../../constants/DummyData";

interface CustomizedComponentList {
  componentName: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface CustomizeState {
  completeList: CustomizedComponentList[];
  componentList: CustomizedComponentList[];
}

const customizeSlice = createSlice({
  name: "customize",
  initialState: {
    completeList: [],
    componentList: [...customizedComponentListData],
  } as CustomizeState, // 초기 상태를 CustomizeState로 명시
  reducers: {
    setCompleteList: (
      state,
      action: PayloadAction<CustomizedComponentList[]>
    ) => {
      state.completeList = action.payload;
    },
    setComponentList: (
      state,
      action: PayloadAction<CustomizedComponentList[]>
    ) => {
      state.componentList = action.payload;
    },
  },
});

export const { setCompleteList, setComponentList } = customizeSlice.actions;
export default customizeSlice.reducer;
