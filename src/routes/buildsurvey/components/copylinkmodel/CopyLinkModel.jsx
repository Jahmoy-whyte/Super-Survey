import css from "./CSS.module.css";
import closelarge from "../../../../assets/images/close2.svg";
import { ACTIONS } from "../../helper/reducerActions";
const CopyLinkModel = ({ state, dispatch, surveyInfo, copyLink }) => {
  return (
    <>
      {state.showLinkModel ? (
        <div
          className={css.backdrop}
          onClick={() =>
            dispatch({ type: ACTIONS.SHOWLINKMODEL, payload: false })
          }
        >
          <div className={css.container} onClick={(e) => e.stopPropagation()}>
            <div className={css.inncontainer}>
              <div className={css.titlediv}>
                <h1>Link</h1>
                <img
                  src={closelarge}
                  onClick={() =>
                    dispatch({ type: ACTIONS.SHOWLINKMODEL, payload: false })
                  }
                />
              </div>

              <div className={css.linkdiv}>
                <p>http://localhost:5173/{surveyInfo.surveyId}</p>
                <button onClick={() => copyLink()}>
                  {state.linkButtonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CopyLinkModel;
