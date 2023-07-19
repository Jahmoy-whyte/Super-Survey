import css from "./CSS.module.css";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { FiClipboard } from "react-icons/fi";
import { ACTIONS } from "../../helper/reducerActions";
const ToolBar = ({ dispatch }) => {
  return (
    <div className={css.toobar}>
      <div
        className={css.toobarbtn}
        onClick={() => dispatch({ type: ACTIONS.SHOWMODEL, payload: true })}
      >
        <AiOutlinePlus />
        <p>Add Question</p>
      </div>

      <div className={css.toobarbtn}>
        <FiClipboard />
        <p>Publish</p>
      </div>

      <div className={css.toobarbtn}>
        <AiOutlineDelete />
        <p>Delete</p>
      </div>
    </div>
  );
};

export default ToolBar;
