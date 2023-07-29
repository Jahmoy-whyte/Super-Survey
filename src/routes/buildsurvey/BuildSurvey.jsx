import css from "./CSS.module.css";
import ToolBar from "./components/toolbar/ToolBar";
import Addquestion from "./components/addquestion/Addquestion";
import useBuildSurvey from "./useBuildSurvey";
import QuestionsLayout from "./components/questionslayout/QuestionsLayout";
import Loading from "../../components/loading/Loading";
import LinkModel from "./components/copylink/LinkModel";
import DeleteSurveyModel from "./components/deletesurveymodel/DeleteSurveyModel";
const BuildSurvey = () => {
  const [
    state,
    dispatch,
    surveyInfo,
    questions,
    db_AddQuestion,
    db_UpdateQuestion,
    db_EditQuestion,
    db_DeleteQuestion,
    db_DeleteSurvey,
    copyLink,
    navToResponces,
  ] = useBuildSurvey();
  return (
    // questions,
    // questionFunctions,
    <>
      <DeleteSurveyModel
        db_DeleteSurvey={db_DeleteSurvey}
        dispatch={dispatch}
        state={state}
      />
      <LinkModel
        state={state}
        dispatch={dispatch}
        surveyInfo={surveyInfo}
        copyLink={copyLink}
      />
      <Addquestion
        state={state}
        dispatch={dispatch}
        db_AddQuestion={db_AddQuestion}
        db_UpdateQuestion={db_UpdateQuestion}
      />
      <div className={css.maincontainer}>
        <div className={css.formandtoolbarcontainer}>
          <ToolBar
            dispatch={dispatch}
            db_DeleteSurvey={db_DeleteSurvey}
            navToResponces={navToResponces}
          />
          <div className={css.surveyform}>
            <div className={css.title}>
              <h1>{surveyInfo.surveyName}</h1>
            </div>

            {state.initialLoading ? (
              <Loading />
            ) : (
              questions.map((data) => {
                return (
                  <QuestionsLayout
                    key={data.id}
                    question={data}
                    db_EditQuestion={db_EditQuestion}
                    db_DeleteQuestion={db_DeleteQuestion}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BuildSurvey;
