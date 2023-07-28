export const checkResponceReturn = async (response) => {
  const jsondata = await response.json();
  if (jsondata.status === "nok") throw new Error(jsondata.res);
  return jsondata.res;
};

export const checkResponce = async (response) => {
  const jsondata = await response.json();
  if (jsondata.status === "nok") throw new Error(jsondata.res);
};
