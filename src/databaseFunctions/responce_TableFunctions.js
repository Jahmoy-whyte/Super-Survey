import { checkResponce, checkResponceReturn } from "./helper/CheckResponce";
import { API_BASE_URL } from "./helper/baseUrl";

export const submitForm = async (formData) => {
  const response = await fetch(`${API_BASE_URL}responces`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  await checkResponce(response);
};
export const getResponces = async (questionId) => {
  const response = await fetch(`${API_BASE_URL}responces/${questionId}`);
  return await checkResponceReturn(response);
};
