import mysql2 from "mysql2";

const conn = mysql2.createPool({
  host: "localhost",
  user: "root",
  database: "surveydb",
});

export const getSurveyQuestions = async (surveyId) => {
  const [result] = await conn.execute(
    "SELECT * FROM users WHERE survey_id =?",
    [surveyId]
  );
  conn.releaseConnection();
  return result;
};
