import css from "./CSS.module.css";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { FiClipboard } from "react-icons/fi";
import { VscGraph } from "react-icons/vsc";
import { ACTIONS } from "../../helper/reducerActions";
const ToolBar = ({ dispatch, navToResponces }) => {
  return (
    <div className={css.toobar}>
      <div
        className={css.toobarbtn}
        onClick={() => dispatch({ type: ACTIONS.SHOWMODEL, payload: true })}
      >
        <AiOutlinePlus />
        <p>AddQuestion</p>
      </div>

      <div
        className={css.toobarbtn}
        onClick={() => dispatch({ type: ACTIONS.SHOWLINKMODEL, payload: true })}
      >
        <FiClipboard />
        <p>Share</p>
      </div>

      <div
        className={css.toobarbtn}
        onClick={() =>
          dispatch({ type: ACTIONS.SHOWDELETESURVEYMODEL, payload: true })
        }
      >
        <AiOutlineDelete />
        <p>Delete</p>
      </div>

      <button className={css.toobarbtn2} onClick={() => navToResponces()}>
        <VscGraph />
        <p>Responces</p>
      </button>
    </div>
  );
};

export default ToolBar;
