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

export const getSurveyForm = async (surveyId) => {
  const response = await fetch(`${API_BASE_URL}surveys/form/${surveyId}`);
  return await checkResponceReturn(
    response,
    "Error getting survey form please reload and try again"
  );
};
