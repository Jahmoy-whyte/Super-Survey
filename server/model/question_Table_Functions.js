import conn from "../helper/sqlconnection.js";

export const getQuestions = async (surveyId) => {
  const [result] = await conn.query(
    `SELECT 
    question_id AS id,
    survey_id AS surveyId, 
    question_text AS questionText, 
    question_type AS questionType,
    question_options AS choices
    FROM questions WHERE survey_id=?`,
    [surveyId]
  );

  return result;
};

export const insertQuestions = async (surveyQuestions) => {
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

export const updateQuestions = async (id, surveyQuestions) => {
  const options = JSON.stringify(surveyQuestions.choices);
  const [result] = await conn.execute(
    "UPDATE questions SET question_text=?, question_type=?, question_options=? WHERE question_id=?",
    [surveyQuestions.questionText, surveyQuestions.questionType, options, id]
  );
};

export const deleteQuestions = async (id) => {
  const result = await conn.execute(
    "DELETE FROM questions WHERE question_id=?",
    [id]
  );
};
