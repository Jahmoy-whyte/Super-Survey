import css from "./CSS.module.css";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { ACTIONS } from "../../helper/reducerActions";
const QuestionsLayout = ({ question, dispatch }) => {
  return (
    <>
      <div className={css.container}>
        <div className={css.heading}>
          <h3>{question.questionText}</h3>
          <span>
            <div
              onClick={() =>
                dispatch({
                  type: ACTIONS.EDIT_QUESTION,
                  payload: { id: question.id },
                })
              }
            >
              <AiOutlineEdit />
            </div>
            <div
              onClick={() => {
                dispatch({
                  type: ACTIONS.DELETE_QUESTION,
                  payload: { id: question.id },
                });
              }}
            >
              <AiOutlineDelete />
            </div>
          </span>
        </div>
        <div className={css.answerdiv}>
          {question.questionType === "multipleChoice" ? (
            question.choices.map((data) => {
              return (
                <div key={data.id} className={css.choices}>
                  <input type="radio" id={data.id} name={"test"} disabled />
                  <label htmlFor={data.id}>{data.text}</label>
                </div>
              );
            })
          ) : question.questionType === "shortAnswer" ? (
            <input
              disabled
              className={css.shortanswer}
              type="text"
              maxLength={150}
              placeholder="short answer text"
            />
          ) : (
            <input
              disabled
              className={css.longanswer}
              type="text"
              placeholder="Long answer text"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionsLayout;
