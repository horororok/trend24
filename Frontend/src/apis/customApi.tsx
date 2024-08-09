import { api } from "./apiConfig";

// 커스텀 페이지 저장/완료 시 현재 상태를 저장함
// 참고: 프론트에서 준 값을 그대로 string JSON 으로 DB에 저장할 예정입니다
// PATCH /custom/components

interface CustomizedComponentListProps {
  componentName: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export const patchCustomComponents = async (
  customContents: CustomizedComponentListProps[]
) => {
  try {
    const response = await api.patch("/custom/components", {
      customContents: JSON.stringify(customContents),
    });
    console.log(response.data.result);
    // return response.data.result;
  } catch (error) {
    console.log(error);
  }
};

// 컴포넌트 리스트
// 컴포넌트 리스트 값 프론트에서 정하면 DB에 그대로 저장하고, 그대로 줄 예정입니다. 프론트에서 나중에 쓰기 편한 형태로 주세요.
// GET /custom/components
// getCustomComponents 함수 내부
export const getCustomComponents = async () => {
  try {
    const response = await api.get("/custom/components");
    if (!response.data.result.customContents) {
      return [];
    }
    const datas = JSON.parse(
      response.data.result.customContents.replace(/'/g, '"')
    );
    console.log(datas);
    return datas;
  } catch (error) {
    console.error("Error fetching custom components:", error);
  }
};

// 페이지 이름 보기
// GET /custom/page
export const getCustomPage = async () => {
  try {
    const response = await api.get("/custom/page");
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};

// 페이지 제목 변경
// 이름은 100자 이내 (varchar(100) )
// name에는 다음 조건이 있다
// 1. null 불가
// 2. 100자 이내
// 3. 공백만 있으면 안됨 (white space로만 이루어지면 안됨)
// PATCH /custom/page
export const patchCustomPage = async (name: string) => {
  try {
    const response = await api.patch("/custom/page", {
      name: `${name}`,
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};
