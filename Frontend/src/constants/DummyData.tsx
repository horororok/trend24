export interface CustomPageComponentlistProps {
  componentName: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

// import CityTotalReport from "../../../googleanalytics/City/CityTotalReport";
// import CityUsers from "../../../googleanalytics/City/CityUsers";
// import DateAU from "../../../googleanalytics/Date/DateAU";
// import DateBounceRate from "../../../googleanalytics/Date/DateBounceRate";
// import DateTotalReport from "../../../googleanalytics/Date/DateTotalReport";
// import DateUsers from "../../../googleanalytics/Date/DateUsers";
// import DateView from "../../../googleanalytics/Date/DateView";
// import DeviceAU from "../../../googleanalytics/Device/DeviceAU";
// import DeviceTotalReport from "../../../googleanalytics/Device/DeviceTotalReport";
// import DeviceUsers from "../../../googleanalytics/Device/DeviceUsers";
// import Memo from "./Memo";

export const customizedComponentListData: CustomPageComponentlistProps[] = [
  {
    componentName: "CityTotalReport",
    position: { x: 100, y: 100 },
    size: { width: 200, height: 200 },
  },
  {
    componentName: "CityUsers",
    position: { x: 200, y: 100 },
    size: { width: 200, height: 200 },
  },
  {
    componentName: "DateAU",
    position: { x: 300, y: 100 },
    size: { width: 200, height: 200 },
  },
  {
    componentName: "DateBounceRate",
    position: { x: 400, y: 100 },
    size: { width: 200, height: 200 },
  },
  {
    componentName: "DateTotalReport",
    position: { x: 500, y: 100 },
    size: { width: 200, height: 200 },
  },
  {
    componentName: "DateUsers",
    position: { x: 600, y: 100 },
    size: { width: 200, height: 200 },
  },
  {
    componentName: "DateView",
    position: { x: 300, y: 200 },
    size: { width: 200, height: 200 },
  },
  {
    componentName: "DeviceAU",
    position: { x: 100, y: 300 },
    size: { width: 200, height: 200 },
  },
  {
    componentName: "DeviceTotalReport",
    position: { x: 300, y: 400 },
    size: { width: 200, height: 200 },
  },
  {
    componentName: "DeviceUsers",
    position: { x: 300, y: 500 },
    size: { width: 200, height: 200 },
  },
  {
    componentName: "Memo",
    position: { x: 300, y: 600 },
    size: { width: 200, height: 200 },
  },
];

export const emptyListData = [];

interface referenceType {
  platformId: number;
  platform: string;
  data: {
    uri: string;
    contents: string;
  };
}

export const referenceData: referenceType = {
  // platformId: 1,
  // platform: "X",
  // data: {
  //   uri: "https://www.naver.com",
  //   contents: "‘귀염 뽀짝’ 외모로 동네 지키는 성동구 반려견 순찰대 ‘호두’",
  // },

  // {
  // platformId: 2,
  // platform :  "Youtube",
  // data: {
  //   uri: "https://www.naver.com",
  //   contents: "‘귀염 뽀짝’ 외모로 동네 지키는 성동구 반려견 순찰대 ‘호두’"
  // }
  // }
  // {
  platformId: 3,
  platform: "GoogleTrends",
  data: {
    uri: "",
    contents: "",
  },
  // }
};
