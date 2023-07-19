import css from "./CSS.module.css";
import nosurveys from "../../assets/images/nosurveys1.svg";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useSurvey from "./useSurvey";
import Surveycards from "./components/surveycards/Surveycards";
import Loading from "../../components/loading/Loading";
const Surveys = () => {
  const nav = useNavigate();
  const [surveyData, fn_navigate] = useSurvey();

  if (surveyData.isloading) {
    return <Loading />;
  }
  return (
    <>
      <div className={css.maincontainer}>
        <div className={css.containerdiv}>
          <div className={css.innercontainer}>
            <button
              className={css.createnewbtn}
              onClick={() => nav("/home/createsurvey")}
            >
              <AiOutlinePlus size={20} /> Create New Survey
            </button>
            <h1>Published Surveys:</h1>

            {surveyData.data.length > 0 ? (
              <div className={css.surveyscontainer}>
                {surveyData.data.map((data) => (
                  <Surveycards
                    surveydata={data}
                    key={data.survey_id}
                    fn_navigate={fn_navigate}
                  />
                ))}
              </div>
            ) : (
              <div className={css.notfound}>
                <p>No Surveys Published</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

//<img src={nosurveys} />

export default Surveys;
