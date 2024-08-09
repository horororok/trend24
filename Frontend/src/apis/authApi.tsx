import { api } from "./apiConfig";

export const signUp = async (name: string) => {
  try {
    const response = await api.post("/auth/signup", {
      name: `${name}`,
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (adminId: string, adminPw: string) => {
  try {
    const response = await api.post("/auth/signin", {
      adminId: `${adminId}`,
      adminPw: `${adminPw}`,
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};
