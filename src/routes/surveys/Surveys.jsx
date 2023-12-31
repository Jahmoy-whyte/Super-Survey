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
    return (
      <Loading
        text="Node sever hosted on the free tier on render.com, free instance will
      spin down with inactivity. so it may take a minute to connect to server. Please wait"
        primaryColors={"white"}
        secondary={"white"}
      />
    );
  } else if (surveyData.error) {
    return (
      <div className={css.errordiv}>
        <p>Error occurred please refresh and tryagain </p>
      </div>
    );
  }

  return (
    <>
      <div className={css.maincontainer}>
        <div className={css.containerdiv}>
          <div className={css.innercontainer}>
            <h1>Work Space:</h1>
            <div className={css.buttonandsurveydiv}>
              <button
                className={css.createnewbtn}
                onClick={() => nav("/home/createsurvey")}
              >
                <AiOutlinePlus size={20} />

                <p>Create New Survey </p>
              </button>

              <div className={css.surveydiv}>
                {surveyData.data.length > 0 ? (
                  surveyData.data.map((data) => (
                    <Surveycards
                      surveydata={data}
                      key={data.survey_id}
                      fn_navigate={fn_navigate}
                    />
                  ))
                ) : (
                  <div className={css.notfound}>
                    <img src={nosurveys} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

//<img src={nosurveys} />

export default Surveys;
