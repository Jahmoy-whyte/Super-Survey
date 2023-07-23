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
/*
          id: question.question_id,
            choices: choices,
            questionText: question.question_text,
            questionType: question.question_type,
            surveyId: question.survey_id,
            surveyName: question.survey_name,
            answer: "",
*/
export const getSurveyForm = async (surveyId) => {
  const [result] = await conn.execute(
    `SELECT
      questions.question_id AS id, 
      questions.survey_id AS surveyId, 
      questions.question_text AS questionText, 
      questions.question_type AS questionType, 
      questions.question_options AS choices, 
      surveys.survey_name AS surveyName 
      FROM  surveys LEFT JOIN  questions ON surveys.survey_id = questions.survey_id  WHERE surveys.survey_id =?`,
    [surveyId]
  );
  return result;
};
