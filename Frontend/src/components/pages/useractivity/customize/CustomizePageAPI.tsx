import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";

import {
  setCustomizedComponentList,
  setInitialComponentList,
  setPageTitle,
} from "../../../../store/slices/customPageSlice";
import { api } from "../../../../apis/apiConfig";

export const useInitialPageAPI = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/custom/components");
        const datas = JSON.parse(
          response.data.result.customContents.replace(/'/g, '"')
        );
        console.log(datas);
        dispatch(setInitialComponentList(datas));
        console.log(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);
};

export const useCustomizedPageAPI = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.patch("/custom/components");
        dispatch(setCustomizedComponentList(response.data));
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);
};

export const useGetCustomizeTitle = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/custom/page");
        console.log(response.data.result);
        dispatch(setPageTitle(response.data.result.name));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);
};

export const useCustomizeTitle = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.patch("/custom/page");
        dispatch(setPageTitle(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);
};
