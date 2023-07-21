export const checkResponceReturn = async (response, errormsg) => {
  if (!response.ok) throw new Error(errormsg);
  const jsondata = await response.json();
  if (jsondata.status === "nok") throw new Error(jsondata.res.code);
  return jsondata.res;
};

export const checkResponce = async (response, errormsg) => {
  if (!response.ok) throw new Error(errormsg);
  const jsondata = await response.json();
  if (jsondata.status === "nok") throw new Error(jsondata.res.code);
};
