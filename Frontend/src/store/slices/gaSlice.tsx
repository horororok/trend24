import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// const initialState = {
// { name: "activeUsers" },
// { name: "totalUsers" },
// { name: "newUsers" },
// { name: "dauPerMau" },
// { name: "dauPerWau" },
// { name: "wauPerMau" },
// { name: "screenPageViews" },
// { name: "sessions" },
// { name: "bounceRate" },
// };

interface RowTypes {
  dimensionValues: { value: string }[];
  metricValues: { value: string }[];
}

interface GaState {
  dateReport: RowTypes[];
  cityReport: RowTypes[];
  deviceReport: RowTypes[];
  ageReport: RowTypes[];
  genderReport: RowTypes[];
}

const initialState: GaState = {
  dateReport: [],
  cityReport: [],
  deviceReport: [],
  ageReport: [],
  genderReport: [],
};

const gaSlice = createSlice({
  name: "ga",
  initialState,
  reducers: {
    setAgeReport: (state, action: PayloadAction<RowTypes[]>) => {
      state.ageReport = action.payload;
    },
    setCityReport: (state, action: PayloadAction<RowTypes[]>) => {
      state.cityReport = action.payload;
    },
    setDateReport: (state, action: PayloadAction<RowTypes[]>) => {
      state.dateReport = action.payload;
    },
    setDeviceReport: (state, action: PayloadAction<RowTypes[]>) => {
      state.deviceReport = action.payload;
    },
    setGenderReport: (state, action: PayloadAction<RowTypes[]>) => {
      state.genderReport = action.payload;
    },
  },
});

export const {
  setAgeReport,
  setCityReport,
  setDateReport,
  setDeviceReport,
  setGenderReport,
} = gaSlice.actions;
export default gaSlice.reducer;
