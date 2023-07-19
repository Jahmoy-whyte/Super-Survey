import mysql from "mysql2/promise";

const conn = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "surveydb",
});
/*


const getUserAccount = async (userInfo) => {
  const [result] = await conn.execute(
    "SELECT * FROM users LEFT JOIN surveys ON users.user_id = surveys.user_id WHERE users.user_id =?",
    [userInfo.userId]
  );
  return result;
};

*/

const getUserAccount = async (userInfo) => {
  const [result] = await conn.execute("SELECT * FROM users WHERE user_id =?", [
    userInfo.userId,
  ]);
  return result;
};

const addUserAccount = async (userInfo) => {
  const [result] = await conn.execute(
    "INSERT INTO users (user_id , email) VALUES  (?,?)",
    [userInfo.userId, userInfo.email]
  );
};

export const onStartup = async (userInfo) => {
  const result = await getUserAccount(userInfo);
  if (result.length === 0) await addUserAccount(userInfo);
};
