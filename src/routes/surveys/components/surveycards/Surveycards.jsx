import css from "./CSS.module.css";
import logo from "../../../../assets/images/survey1.svg";
import pen from "../../../../assets/images/pen.svg";
import arrow from "../../../../assets/images/arrowright.svg";

const Surveycards = ({ surveydata, fn_navigate }) => {
  const newdate = surveydata.time_created.split("T");

  return (
    <div className={css.container} onClick={() => fn_navigate(surveydata)}>
      <div className={css.surveyinfo}>
        <div className={css.imgdiv}>
          <img src={pen} />
        </div>
        <div className={css.infodiv}>
          <h1>{surveydata.survey_name}</h1>
          <p>Date: {newdate[0]}</p>
        </div>
      </div>

      <img src={arrow} className={css.arrow} />
    </div>
  );
};
//      <p>{JSON.stringify(user)}</p>
export default Surveycards;
