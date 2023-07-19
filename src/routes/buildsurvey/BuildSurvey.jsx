import css from "./CSS.module.css";
import ToolBar from "./components/toolbar/ToolBar";
import Addquestion from "./components/addquestion/Addquestion";
import useBuildSurvey from "./useBuildSurvey";
import QuestionsLayout from "./components/questionslayout/QuestionsLayout";
const BuildSurvey = () => {
  const [state, dispatch, surveyInfo] = useBuildSurvey();
  return (
    // questions,
    // questionFunctions,
    <>
      <Addquestion state={state} dispatch={dispatch} />
      <div className={css.maincontainer}>
        <div className={css.formandtoolbarcontainer}>
          <ToolBar dispatch={dispatch} />
          <div className={css.surveyform}>
            <div className={css.title}>
              <h1>{surveyInfo.surveyName}</h1>
            </div>

            {state.questions.map((data) => {
              return (
                <QuestionsLayout
                  key={data.id}
                  question={data}
                  dispatch={dispatch}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BuildSurvey;
