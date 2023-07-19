import css from "./CSS.module.css";
import nosurveys from "../../assets/images/nosurveys1.svg";
import { AiOutlinePlus } from "react-icons/ai";
import useCreateSurvey from "./useCreateSurvey";
import Button from "../../components/button/Button";
const Createsurvey = () => {
  const [isLoading, setSurveyName, fn_CreateSurvey] = useCreateSurvey();
  return (
    <>
      <div className={css.maincontainer}>
        <div className={css.containerdiv}>
          <div>
            <h1>Create Survey</h1>
            <div>
              <p>Survey Name:</p>
              <input
                type="text"
                placeholder="Enter your survey name"
                maxLength={35}
                onChange={(e) => setSurveyName(e.target.value)}
              />
            </div>
            <Button
              isLoading={isLoading}
              func={fn_CreateSurvey}
              text="Create"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Createsurvey;
