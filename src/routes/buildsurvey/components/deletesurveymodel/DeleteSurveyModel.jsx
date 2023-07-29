import css from "./CSS.module.css";
import closelarge from "../../../../assets/images/close2.svg";
import { ACTIONS } from "../../helper/reducerActions";

const DeleteSurveyModel = ({ state, dispatch, db_DeleteSurvey }) => {
  return (
    <>
      {state.showDeleteSurveyModel ? (
        <div
          className={css.backdrop}
          onClick={() =>
            dispatch({ type: ACTIONS.SHOWDELETESURVEYMODEL, payload: false })
          }
        >
          <div className={css.container} onClick={(e) => e.stopPropagation()}>
            <div className={css.inncontainer}>
              <div className={css.titlediv}>
                <h1>Delete</h1>
                <img
                  src={closelarge}
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.SHOWDELETESURVEYMODEL,
                      payload: false,
                    })
                  }
                />
              </div>

              <div className={css.deletebtnandtext}>
                <p>Are you sure you want to delete this survey?</p>
                <button onClick={() => db_DeleteSurvey()}>DELETE</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DeleteSurveyModel;
