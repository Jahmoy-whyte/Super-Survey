import css from "./CSS.module.css";
import smallClose from "../../../../assets/images/closesmall.svg";
import { ACTIONS } from "../../helper/reducerActions";
import { memo } from "react";
const QuestionTypeHander = ({ state, dispatch }) => {
  if (state.questionType == "shortAnswer") {
    return (
      <input
        type="text"
        placeholder="Short answer"
        className={css.textbox1}
        disabled
      />
    );
  } else if (state.questionType == "longAnswer") {
    return (
      <input
        type="text"
        placeholder="Long answer"
        className={css.textbox1}
        disabled
      />
    );
  } else if (state.questionType == "multipleChoice") {
    return (
      <>
        {state.choices.map((data) => (
          <div key={data.id} className={css.optionsdiv}>
            <div className={css.radioandtextbox}>
              <input type="radio" className={css.radiobtn} disabled />
              <input
                className={css.textbox}
                type="text"
                onChange={(e) =>
                  dispatch({
                    type: ACTIONS.UPDATECHOICE,
                    payload: { id: data.id, text: e.target.value },
                  })
                }
                placeholder="Enter Option"
                value={data.text}
              />
            </div>
            <img
              className={css.deleteimg}
              src={smallClose}
              onClick={() =>
                dispatch({ type: ACTIONS.DELETECHOICE, payload: data.id })
              }
            />
          </div>
        ))}

        <button
          className={css.btn}
          onClick={() => {
            const id = state.choiceId;

            dispatch({
              type: ACTIONS.ADDCHOICE,
              payload: { id: id, text: "" },
            });
          }}
        >
          Add
        </button>
      </>
    );
  } else {
    return null;
  }
};

export default memo(QuestionTypeHander);
