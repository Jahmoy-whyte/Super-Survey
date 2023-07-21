import { checkResponceReturn } from "./helper/CheckResponce";
import { API_BASE_URL } from "./helper/baseUrl";

export const getUserInfo = async (userInfo) => {
  const response = await fetch(`${API_BASE_URL}users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });

  return await checkResponceReturn(
    response,
    "Error getting userinfo please try again"
  );
};
