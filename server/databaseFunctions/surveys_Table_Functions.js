import mysql from "mysql2/promise";

const conn = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "surveydb",
});

export const getAccountSurveys = async (userInfo) => {
  const [result] = await conn.execute(
    "SELECT * FROM surveys WHERE user_id =?",
    [userInfo.userId]
  );
  return result;
};

export const createSurvey = async (surveyInfo) => {
  const [result] = await conn.execute(
    "INSERT INTO surveys (survey_id , user_id ,survey_name) VALUES (?,?,?)",
    [surveyInfo.surveyId, surveyInfo.userId, surveyInfo.surveyName]
  );
};

export const deleteAccountSurvey = async (surveyId) => {
  const [result] = await conn.execute(
    "DELETE FROM surveys WHERE survey_id =?",
    [surveyId]
  );
};
