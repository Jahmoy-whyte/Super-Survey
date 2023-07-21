import { checkResponceReturn, checkResponce } from "./helper/CheckResponce";
import { API_BASE_URL } from "./helper/baseUrl";

export const getQuestions = async (surveyId) => {
  const response = await fetch(`${API_BASE_URL}questions/${surveyId}`);
  return await checkResponceReturn(
    response,
    "Error getting questions please try again"
  );
};

export const insertQuestions = async (surveyQuestion) => {
  const response = await fetch(`${API_BASE_URL}questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(surveyQuestion),
  });
  return await checkResponceReturn(
    response,
    "Error insert Question please try again"
  );
};

export const updateQuestions = async (id, surveyQuestion) => {
  const response = await fetch(`${API_BASE_URL}questions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(surveyQuestion),
  });
  await checkResponce(response, "Error updating question please try again");
};

export const deleteQuestions = async (id) => {
  const response = await fetch(`${API_BASE_URL}questions/${id}`, {
    method: "DELETE",
  });
  await checkResponce(response, "Error deleting question please try again");
};
