import css from "./CSS.module.css";
import logo from "../../../../assets/images/survey1.svg";

const Surveycards = ({ surveydata, fn_navigate }) => {
  const newdate = surveydata.time_created.split("T");

  return (
    <div className={css.container} onClick={() => fn_navigate(surveydata)}>
      <div className={css.tophalf}>
        <img src={logo} />
      </div>

      <div className={css.bottomhalf}>
        <h1>{surveydata.survey_name}</h1>
        <p>Date: {newdate[0]}</p>
      </div>
    </div>
  );
};
//      <p>{JSON.stringify(user)}</p>
export default Surveycards;
