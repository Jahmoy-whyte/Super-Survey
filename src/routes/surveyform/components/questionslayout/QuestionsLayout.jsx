import css from "./CSS.module.css";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { surveyFormActions } from "../../helper/surveyFormActions";
const QuestionsLayout = ({ question, dispatch, index, state }) => {
  return (
    <>
      <div className={css.container}>
        <div className={css.heading}>
          <h3>{index + ". " + question.questionText}</h3>
          <p
            onClick={() => {
              if (state.disableForm === true) return;
              dispatch({
                type: surveyFormActions.CLEAR,
                payload: {
                  id: question.id,
                },
              });
            }}
          >
            Clear
          </p>
        </div>

        <div className={css.answerdiv}>
          {question.questionType === "multipleChoice" ? (
            question.choices.map((data) => {
              return (
                <div
                  key={data.id}
                  className={css.choices}
                  onClick={() => {
                    if (state.disableForm === true) return;
                    dispatch({
                      type: surveyFormActions.ANSWER,
                      payload: {
                        id: question.id,
                        answer: data.text,
                      },
                    });
                  }}
                >
                  <input
                    disabled={state.disableForm}
                    type="radio"
                    value={data.text}
                    onChange={(e) => {
                      dispatch({
                        type: surveyFormActions.ANSWER,
                        payload: {
                          id: question.id,
                          answer: e.target.value,
                        },
                      });
                    }}
                    checked={data.text === question.answer}
                  />
                  <label>{data.text}</label>
                </div>
              );
            })
          ) : question.questionType === "shortAnswer" ? (
            <input
              disabled={state.disableForm}
              className={css.shortanswer}
              type="text"
              maxLength={150}
              placeholder="Short answer text"
              value={question.answer}
              onChange={(e) =>
                dispatch({
                  type: surveyFormActions.ANSWER,
                  payload: {
                    id: question.id,
                    answer: e.target.value,
                  },
                })
              }
            />
          ) : (
            <input
              disabled={state.disableForm}
              className={css.longanswer}
              type="text"
              placeholder="Long answer text"
              value={question.answer}
              onChange={(e) =>
                dispatch({
                  type: surveyFormActions.ANSWER,
                  payload: {
                    id: question.id,
                    answer: e.target.value,
                  },
                })
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionsLayout;
