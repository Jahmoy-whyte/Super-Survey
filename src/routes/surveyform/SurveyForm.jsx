import css from "./CSS.module.css";
import useSurveyForm from "./useSurveyForm";
import QuestionsLayout from "./components/questionslayout/QuestionsLayout";
import Button from "../../components/button/Button";
import { surveyFormActions } from "./helper/surveyFormActions";
import { ProgressBar } from "react-loader-spinner";
import Loading from "../../components/loading/Loading";
const SurveyForm = () => {
  const [state, dispatch, db_SubmitForm] = useSurveyForm();

  if (state.initialLoading)
    return (
      <div className="loading-container">
        <Loading
          text="Node sever hosted on the free tier on render.com, free instance will
          spin down with inactivity. so it may take seconds."
          primaryColors={"white"}
          secondary={"white"}
        />
      </div>
    );
  return (
    <>
      <div className={css.maincontainer}>
        <div className={css.container}>
          <div className={css.surveyform}>
            {state.notFound ? (
              <div className={css.notFounddiv}>
                <h3>{state.message}</h3>
              </div>
            ) : (
              <>
                <div className={css.title}>
                  <h1>{state?.questions[0]?.surveyName}</h1>
                </div>
                <div className={css.emaildiv}>
                  <label>Email:</label>
                  <input
                    disabled={state.disableForm}
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) =>
                      dispatch({
                        type: surveyFormActions.EMAILVALUE,
                        payload: e.target.value,
                      })
                    }
                    value={state.email}
                  />
                </div>

                {state.questions.map((question, index) => {
                  return (
                    <QuestionsLayout
                      question={question}
                      dispatch={dispatch}
                      key={question.id}
                      index={index + 1}
                      state={state}
                    />
                  );
                })}

                <Button
                  text="Submit"
                  width={120}
                  topbBottomMargin={20}
                  isLoading={state.btnLoading}
                  func={db_SubmitForm}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyForm;
