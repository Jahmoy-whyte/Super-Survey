import css from "./CSS.module.css";
import Button from "../../components/button/Button";
import useSurveyResponces from "./useSurveyResponces";
import ResponeLayout from "./components/responelayout/ResponeLayout";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
const SurveyResponces = () => {
  const nav = useNavigate();
  const [state, dispatch, surveyInfo, dbGetResponces] = useSurveyResponces();
  return (
    <>
      <div className={css.maincontainer}>
        <div className={css.container}>
          <div className={css.toolbar}>
            <button className={css.toobarbtn2} onClick={() => nav(-1)}>
              <MdOutlineArrowBackIosNew />
              <p>Back</p>
            </button>
          </div>
          <div className={css.basediv}>
            <div className={css.title}>
              <h1>{surveyInfo.surveyName}</h1>
            </div>
            <div className={css.respocesdiv}>
              {state.questions.map((question) => {
                return (
                  <ResponeLayout
                    key={question.id}
                    question={question}
                    dbGetResponces={dbGetResponces}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyResponces;
