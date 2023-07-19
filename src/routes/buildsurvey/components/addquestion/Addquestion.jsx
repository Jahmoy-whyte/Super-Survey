import css from "./CSS.module.css";
import { MdShortText } from "react-icons/md";
import { BsTextLeft } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
import Button from "../../../../components/button/Button";
import closelarge from "../../../../assets/images/close2.svg";
import { ACTIONS } from "../../helper/reducerActions";
import QuestionTypeHander from "../questiontypehander/QuestionTypeHander";
const Addquestion = ({ state, dispatch }) => {
  return (
    <>
      {state.showModel ? (
        <div
          className={css.backdrop}
          onClick={() => dispatch({ type: ACTIONS.CLOSEMODEL })}
        >
          <div className={css.container} onClick={(e) => e.stopPropagation()}>
            <div className={css.innercontainer}>
              <div className={css.title}>
                <h1>Question</h1>
                <img
                  src={closelarge}
                  onClick={() => dispatch({ type: ACTIONS.CLOSEMODEL })}
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
                    text={state.buttonAction}
                    width={100}
                    topbBottomMargin={10}
                    func={() => {
                      if (state.buttonAction === "Save") {
                        dispatch({
                          type: ACTIONS.ADD_QUESTION,
                        });
                      } else {
                        dispatch({
                          type: ACTIONS.UPDATE_QUESTION,
                          payload: { id: state.id },
                        });
                      }
                      dispatch({
                        type: ACTIONS.CLOSEMODEL,
                      });
                    }}
                  />
                </div>
                <div className={css.questiontypediv}>
                  <ol>
                    <li>
                      <b> Question Type</b>
                      <IoIosArrowDown />
                    </li>
                    <li
                      onClick={() =>
                        dispatch({
                          type: ACTIONS.QUESTIONSTYPE,
                          payload: "shortAnswer",
                        })
                      }
                    >
                      <MdShortText /> Short answer
                    </li>
                    <li
                      onClick={() =>
                        dispatch({
                          type: ACTIONS.QUESTIONSTYPE,
                          payload: "longAnswer",
                        })
                      }
                    >
                      <BsTextLeft /> Long answer
                    </li>
                    <li
                      onClick={() =>
                        dispatch({
                          type: ACTIONS.QUESTIONSTYPE,
                          payload: "multipleChoice",
                        })
                      }
                    >
                      <SlOptionsVertical /> Multiple choice
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
