import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/Authorization";
import Dashboard from "./pages/Dashboard";
import HotTrend from "./pages/HotTrend";
import TrendSearch from "./pages/TrendSearch";
import UserActivity from "./pages/UserActivity";
import BookSearch from "./pages/BookSearch";
import BookDrawer from "./pages/BookDrawer";

import RnDCustom from "./components/pages/useractivity/customize/RnDCustom";

import NotFound from "./pages/Notfound";
import CustomizePage from "./pages/CustomizePage";

import Event from "./pages/Event";
import Main from "./components/pages/event/Main";
import GeneralRecommend from "./pages/GeneralRecommend";
import PersonalRecommend from "./pages/PersonalRecommend";
import PersonalSearch from "./pages/PersonalSearch";
import PersonalResult from "./pages/PersonalResult";
import GeneralRecommendBook from "./components/pages/generalrecommend/GeneralRecommendBook";

import { TransitionProvider } from "./components/pages/PersonalRecommend/TransitionConText";
import TransitionComponent from "./components/pages/PersonalRecommend/Transition";

import Dummy from "./pages/Dummy";
import ProtectedRoutes from "./ProtectedRoutes";

// // usePageTracking 훅 구현
// const usePageTracking = () => {
//   const location = useLocation();

//   useEffect(() => {
//     const pagePath = location.pathname + location.search;
//     window.gtag('config', 'G-X6V6D0VZF5', {
//       'page_path': pagePath,
//     });
//   }, [location]);
// };

// function applyFixedTheme() {
//   document.body.style.backgroundColor = "#ffffff";
//   document.body.style.color = "#000000";
// }

function App() {
  useEffect(() => {
    // 로딩 화면을 숨기는 코드
    const loadingScreen = document.querySelector("#loading-screen");
    if (loadingScreen instanceof HTMLElement) {
      loadingScreen.style.display = "none";
    }
  }, []); // 빈 의존성 배열([])을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함

  // const windowRef = React.useRef(window);

  // useEffect(() => {
  //   applyFixedTheme();

  //   const windowObj = windowRef.current;

  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
  //       e.preventDefault();
  //       alert("개발자 도구 사용이 제한됩니다.");
  //     }
  //   };
  //   windowObj.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     windowObj.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  return (
    <TransitionProvider>
      <Routes>
        <Route path="/event" element={<Event />}>
          <Route path="" element={<Main />} />
          <Route
            path="personal"
            element={
              <TransitionComponent>
                <PersonalRecommend />
              </TransitionComponent>
            }
          />
          <Route
            path="personal/search"
            element={
              <TransitionComponent>
                <PersonalSearch />
              </TransitionComponent>
            }
          />
          <Route
            path="personal/result"
            element={
              <TransitionComponent>
                <PersonalResult />
              </TransitionComponent>
            }
          />
          <Route path="general" element={<GeneralRecommend />} />
          <Route path="general/recommend" element={<GeneralRecommendBook />} />
        </Route>

        <Route path="/prac" element={<Dummy />} />

        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/main" element={<Dashboard />}>
            <Route path="" element={<HotTrend />} />
            <Route path="trendSearch" element={<TrendSearch />} />
            <Route path="userActivity" element={<UserActivity />} />
            <Route path="bookSearch" element={<BookSearch />} />
            <Route path="bookDrawer" element={<BookDrawer />} />
            <Route path="customizePage" element={<CustomizePage />} />
            <Route path="custom" element={<RnDCustom />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </TransitionProvider>
  );
}

export default App;
