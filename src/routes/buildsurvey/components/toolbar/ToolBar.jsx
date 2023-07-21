import css from "./CSS.module.css";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { FiClipboard } from "react-icons/fi";
import { ACTIONS } from "../../helper/reducerActions";
const ToolBar = ({ dispatch, db_DeleteSurvey }) => {
  return (
    <div className={css.toobar}>
      <div
        className={css.toobarbtn}
        onClick={() => dispatch({ type: ACTIONS.SHOWMODEL, payload: true })}
      >
        <AiOutlinePlus />
        <p>Add Question</p>
      </div>

      <div
        className={css.toobarbtn}
        onClick={() => dispatch({ type: ACTIONS.SHOWLINKMODEL, payload: true })}
      >
        <FiClipboard />
        <p>Share</p>
      </div>

      <div className={css.toobarbtn} onClick={() => db_DeleteSurvey()}>
        <AiOutlineDelete />
        <p>Delete</p>
      </div>
    </div>
  );
};

export default ToolBar;
