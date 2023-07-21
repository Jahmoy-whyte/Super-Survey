import { checkResponceReturn, checkResponce } from "./helper/CheckResponce";
import { API_BASE_URL } from "./helper/baseUrl";

export const createSurvey = async (userInfo) => {
  const response = await fetch(`${API_BASE_URL}surveys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });

  return await checkResponceReturn(
    response,
    "Error creating survey please try again"
  );
};

export const deleteSurvey = async (id) => {
  const response = await fetch(`${API_BASE_URL}surveys/${id}`, {
    method: "DELETE",
  });

  await checkResponce(response, "Error deleting survey please try again");
};
