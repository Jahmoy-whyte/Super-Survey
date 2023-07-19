const API_BASE_URL = "http://localhost:3000/";

export const getQuestions = async (surveyId) => {
  const response = await fetch(`${API_BASE_URL}questions/${surveyId}`);
  return await checkresponce(response, "get questions error");
};

const checkresponce = async (response, errormsg) => {
  if (!response.ok) throw new Error(errormsg);
  const jsondata = await response.json();
  if (jsondata.status === "nok") throw new Error(jsondata.res.code);
  return jsondata.res;
};
