import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setAgeReport,
  setCityReport,
  setDateReport,
  setDeviceReport,
  setGenderReport,
} from "../../store/slices/gaSlice";
import { AppDispatch } from "../../store/store";
import { useEffect } from "react";

//날짜별
export const useDateReportAPI = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    axios
      .post("https://oauth2.googleapis.com/token", {
        client_id: import.meta.env.VITE_GA4_CLIENT_ID,
        client_secret: import.meta.env.VITE_GA4_CLIENT_SECRET,
        refresh_token: import.meta.env.VITE_GA4_OAUTH_REFRESH_TOKEN,
        grant_type: "refresh_token",
      })
      .then((response) => {
        axios
          .post(
            `https://analyticsdata.googleapis.com/v1beta/properties/${
              import.meta.env.VITE_GA4_PROPERTY_ID
            }:runReport`,
            {
              dimensions: [{ name: "date" }],
              metrics: [
                { name: "activeUsers" },
                { name: "totalUsers" },
                { name: "newUsers" },
                { name: "dauPerMau" },
                { name: "dauPerWau" },
                { name: "wauPerMau" },
                { name: "screenPageViews" },
                { name: "sessions" },
                { name: "bounceRate" },
              ],
              dateRanges: [{ startDate: "2024-05-01", endDate: "today" }],
              orderBys: [
                {
                  dimension: {
                    orderType: "ALPHANUMERIC",
                    dimensionName: "date",
                  },
                  desc: false,
                },
              ],
              keepEmptyRows: true,
            },
            {
              headers: {
                Authorization: `Bearer ${response.data.access_token}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data.rows);
            dispatch(setDateReport(response.data.rows));
          })
          .catch((error) => {
            console.log("[REPORT ERROR] ", error);
          });
      })
      .catch((error) => {
        console.log("[TOKEN ERROR] ", error);
      });
  }, [dispatch]);
};

// 도시별
export const useCityReportAPI = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    axios
      .post("https://oauth2.googleapis.com/token", {
        client_id: import.meta.env.VITE_GA4_CLIENT_ID,
        client_secret: import.meta.env.VITE_GA4_CLIENT_SECRET,
        refresh_token: import.meta.env.VITE_GA4_OAUTH_REFRESH_TOKEN,
        grant_type: "refresh_token",
      })
      .then((response) => {
        axios
          .post(
            `https://analyticsdata.googleapis.com/v1beta/properties/${
              import.meta.env.VITE_GA4_PROPERTY_ID
            }:runReport`,
            {
              dimensions: [{ name: "city" }],
              metrics: [
                { name: "activeUsers" },
                { name: "totalUsers" },
                { name: "newUsers" },
                { name: "dauPerMau" },
                { name: "dauPerWau" },
                { name: "wauPerMau" },
                { name: "screenPageViews" },
                { name: "sessions" },
                { name: "bounceRate" },
              ],
              dateRanges: [{ startDate: "2024-05-01", endDate: "today" }],
              keepEmptyRows: true,
            },
            {
              headers: {
                Authorization: `Bearer ${response.data.access_token}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
            dispatch(setCityReport(response.data.rows));
          })
          .catch((error) => {
            console.log("[REPORT ERROR] ", error);
          });
      })
      .catch((error) => {
        console.log("[TOKEN ERROR] ", error);
      });
  }, [dispatch]);
};

// 기기별
export const useDeviceReportAPI = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    axios
      .post("https://oauth2.googleapis.com/token", {
        client_id: import.meta.env.VITE_GA4_CLIENT_ID,
        client_secret: import.meta.env.VITE_GA4_CLIENT_SECRET,
        refresh_token: import.meta.env.VITE_GA4_OAUTH_REFRESH_TOKEN,
        grant_type: "refresh_token",
      })
      .then((response) => {
        axios
          .post(
            `https://analyticsdata.googleapis.com/v1beta/properties/${
              import.meta.env.VITE_GA4_PROPERTY_ID
            }:runReport`,
            {
              dimensions: [{ name: "deviceCategory" }],
              metrics: [
                { name: "activeUsers" },
                { name: "totalUsers" },
                { name: "newUsers" },
                { name: "dauPerMau" },
                { name: "dauPerWau" },
                { name: "wauPerMau" },
                { name: "screenPageViews" },
                { name: "sessions" },
                { name: "bounceRate" },
              ],
              dateRanges: [{ startDate: "2024-05-01", endDate: "today" }],
              keepEmptyRows: true,
            },
            {
              headers: {
                Authorization: `Bearer ${response.data.access_token}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
            dispatch(setDeviceReport(response.data.rows));
          })
          .catch((error) => {
            console.log("[REPORT ERROR] ", error);
          });
      })
      .catch((error) => {
        console.log("[TOKEN ERROR] ", error);
      });
  }, [dispatch]);
};

//나이별
export const useAgeReportAPI = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    axios
      .post("https://oauth2.googleapis.com/token", {
        client_id: import.meta.env.VITE_GA4_CLIENT_ID,
        client_secret: import.meta.env.VITE_GA4_CLIENT_SECRET,
        refresh_token: import.meta.env.VITE_GA4_OAUTH_REFRESH_TOKEN,
        grant_type: "refresh_token",
      })
      .then((response) => {
        axios
          .post(
            `https://analyticsdata.googleapis.com/v1beta/properties/${
              import.meta.env.VITE_GA4_PROPERTY_ID
            }:runReport`,
            {
              dimensions: [{ name: "userAgeBracket" }],
              metrics: [
                { name: "activeUsers" },
                { name: "totalUsers" },
                { name: "newUsers" },
                { name: "dauPerMau" },
                { name: "dauPerWau" },
                { name: "wauPerMau" },
                { name: "screenPageViews" },
                { name: "sessions" },
                { name: "bounceRate" },
              ],
              dateRanges: [{ startDate: "2024-05-01", endDate: "today" }],
              keepEmptyRows: true,
            },
            {
              headers: {
                Authorization: `Bearer ${response.data.access_token}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data.rows);
            dispatch(setAgeReport(response.data.rows));
          })
          .catch((error) => {
            console.log("[REPORT ERROR] ", error);
          });
      })
      .catch((error) => {
        console.log("[TOKEN ERROR] ", error);
      });
  }, [dispatch]);
};

//성별 별
export const useGenderReportAPI = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    axios
      .post("https://oauth2.googleapis.com/token", {
        client_id: import.meta.env.VITE_GA4_CLIENT_ID,
        client_secret: import.meta.env.VITE_GA4_CLIENT_SECRET,
        refresh_token: import.meta.env.VITE_GA4_OAUTH_REFRESH_TOKEN,
        grant_type: "refresh_token",
      })
      .then((response) => {
        axios
          .post(
            `https://analyticsdata.googleapis.com/v1beta/properties/${
              import.meta.env.VITE_GA4_PROPERTY_ID
            }:runReport`,
            {
              dimensions: [{ name: "userGender" }],
              metrics: [
                { name: "activeUsers" },
                { name: "totalUsers" },
                { name: "newUsers" },
                { name: "dauPerMau" },
                { name: "dauPerWau" },
                { name: "wauPerMau" },
                { name: "screenPageViews" },
                { name: "sessions" },
                { name: "bounceRate" },
              ],
              dateRanges: [{ startDate: "2024-05-01", endDate: "today" }],
              keepEmptyRows: true,
            },
            {
              headers: {
                Authorization: `Bearer ${response.data.access_token}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
            dispatch(setGenderReport(response.data.rows));
          })
          .catch((error) => {
            console.log("[REPORT ERROR] ", error);
          });
      })
      .catch((error) => {
        console.log("[TOKEN ERROR] ", error);
      });
  }, [dispatch]);
};
