import mysql2 from "mysql2/promise";

const conn = mysql2.createPool({
  host: "localhost",
  user: "root",
  database: "surveydb",
});

export const getSurveyQuestions = async (surveyId) => {
  const [result] = await conn.execute(
    "SELECT * FROM questions WHERE survey_id =?",
    [surveyId]
  );
  return result;
};

export const insertSurveyQuestions = async (surveyQuestions) => {
  const options = JSON.stringify(surveyQuestions.choices);
  const [result] = await conn.execute(
    "INSERT INTO questions (survey_id, question_text, question_type, question_options) VALUES(?,?,?,?)",
    [
      surveyQuestions.surveyId,
      surveyQuestions.questionText,
      surveyQuestions.questionType,
      options,
    ]
  );
  console.log(result);
  return result;
};

export const updateSurveyQuestions = async (id, surveyQuestions) => {
  const options = JSON.stringify(surveyQuestions.choices);
  const [result] = await conn.execute(
    "UPDATE questions SET question_text=?, question_type=?, question_options=? WHERE question_id=?",
    [surveyQuestions.questionText, surveyQuestions.questionType, options, id]
  );
};

export const deleteSurveyQuestions = async (id) => {
  const result = await conn.execute(
    "DELETE FROM questions WHERE question_id=?",
    [id]
  );
};
