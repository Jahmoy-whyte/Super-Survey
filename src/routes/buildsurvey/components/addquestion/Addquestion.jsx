import css from "./CSS.module.css";
import { MdShortText } from "react-icons/md";
import { BsTextLeft } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";

import Button from "../../../../components/button/Button";
import closelarge from "../../../../assets/images/close2.svg";
import { ACTIONS } from "../../helper/reducerActions";
import QuestionTypeHander from "../questiontypehander/QuestionTypeHander";

const Addquestion = ({
  state,
  dispatch,
  db_AddQuestion,
  db_UpdateQuestion,
}) => {
  return (
    <>
      {state.showModel ? (
        <div
          className={css.backdrop}
          onClick={() => {
            if (!state.isLoading) {
              dispatch({ type: ACTIONS.CLOSEMODEL });
            }
          }}
        >
          <div className={css.container} onClick={(e) => e.stopPropagation()}>
            <div className={css.innercontainer}>
              <div className={css.title}>
                <h1>Question</h1>
                <img
                  src={closelarge}
                  onClick={() => {
                    if (!state.isLoading) {
                      dispatch({ type: ACTIONS.CLOSEMODEL });
                    }
                  }}
                />
              </div>

              <div className={css.questioncontainer}>
                <div className={css.questiondiv}>
                  <input
                    className={css.questiondivinput}
                    placeholder="Enter Question"
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONS.QUESTIONSTEXT,
                        payload: e.target.value,
                      })
                    }
                    value={state.questionText}
                  />

                  <QuestionTypeHander state={state} dispatch={dispatch} />
                  <Button
                    isLoading={state.isLoading}
                    text={state.buttonAction}
                    width={100}
                    func={() => {
                      if (state.buttonAction === "Save") {
                        db_AddQuestion();
                      } else {
                        db_UpdateQuestion(state.id);
                      }
                    }}
                  />
                </div>
                <div className={css.questiontypediv}>
                  <ol>
                    <li>
                      <b> Question Type</b>
                    </li>
                    <li
                      onClick={() =>
                        dispatch({
                          type: ACTIONS.QUESTIONSTYPE,
                          payload: "shortAnswer",
                        })
                      }
                    >
                      <MdShortText size={15} />
                      Short answer
                    </li>
                    <li
                      onClick={() =>
                        dispatch({
                          type: ACTIONS.QUESTIONSTYPE,
                          payload: "longAnswer",
                        })
                      }
                    >
                      <BsTextLeft size={15} /> Long answer
                    </li>
                    <li
                      onClick={() =>
                        dispatch({
                          type: ACTIONS.QUESTIONSTYPE,
                          payload: "multipleChoice",
                        })
                      }
                    >
                      <SlOptionsVertical width={15} height={15} /> Multiple
                      choice
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Addquestion;
