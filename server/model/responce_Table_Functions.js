import conn from "../helper/sqlconnection.js";

export const insertResponce = async (responceId, surveyId, answers, email) => {
  const [result1] = await conn.execute(
    "INSERT INTO responces (responce_id , survey_id , email) VALUES (?,?,?)",
    [responceId, surveyId, email]
  );
  const addResponceIdToAnswers = answers.map((ans) => {
    return [responceId, ...ans];
  });

  const result2 = await conn.query(
    "INSERT INTO answers (responce_id , question_id , answer) VALUES ?",
    [addResponceIdToAnswers]
  );
};

export const getResponces = async (questionId) => {
  const [result] = await conn.execute(
    `SELECT COUNT(answer) as count , answer FROM answers  WHERE question_id = ? 
    GROUP BY answer
    `,
    [questionId]
  );

  return result;
};
