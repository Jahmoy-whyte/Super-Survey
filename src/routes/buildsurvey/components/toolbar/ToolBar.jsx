import css from "./CSS.module.css";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { FiClipboard } from "react-icons/fi";
import { VscGraph } from "react-icons/vsc";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { ACTIONS } from "../../helper/reducerActions";
import { useNavigate } from "react-router-dom";
const ToolBar = ({ dispatch, navToResponces }) => {
  const nav = useNavigate();
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
      <button className={css.toobarbtn2} onClick={() => nav(-1)}>
        <MdOutlineArrowBackIosNew />
        <p>Back</p>
      </button>
    </div>
  );
};

export default ToolBar;
