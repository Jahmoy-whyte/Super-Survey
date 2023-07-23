export const setTimeOut_Func = async (func) => {
  let responce = "";
  return new Promise((resolve, reject) =>
    setTimeout(
      async () => {
        try {
          let res = await func();
          resolve(res);
        } catch (error) {
          reject(error);
        }
      },

      2000
    )
  );
};
