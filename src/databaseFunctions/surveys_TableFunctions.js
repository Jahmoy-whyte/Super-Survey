const API_BASE_URL = "http://localhost:3000/";

export const createSurvey = async (userInfo) => {
  const response = await fetch(`${API_BASE_URL}surveys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });

  return await checkresponce(response, "error(1)");
};

const checkresponce = async (response, errormsg) => {
  if (!response.ok) throw new Error(errormsg);
  const jsondata = await response.json();
  if (jsondata.status === "nok") throw new Error(jsondata.res.code);
  return jsondata.res;
};
