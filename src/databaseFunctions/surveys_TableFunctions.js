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

  return await checkResponceReturn(response);
};

export const deleteSurvey = async (id) => {
  const response = await fetch(`${API_BASE_URL}surveys/${id}`, {
    method: "DELETE",
  });

  await checkResponce(response);
};

export const getSurveyForm = async (surveyId) => {
  const response = await fetch(`${API_BASE_URL}surveys/form/${surveyId}`);
  return await checkResponceReturn(response);
};
