import { useState, useContext } from "react";
import { createSurvey } from "../../databaseFunctions/surveys_TableFunctions";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SurveyInfoContext } from "../../context/context";
const useCreateSurvey = () => {
  const [surveyName, setSurveyName] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const { user } = useAuth0();
  const nav = useNavigate();
  const [surveyInfo, setSurveyInfo] = useContext(SurveyInfoContext);

  const fn_CreateSurvey = async () => {
    setisLoading(true);
    try {
      if (surveyName.length < 5) {
        setisLoading(false);
        toast.warn("Survey name must be 5 letters or greater");
        return;
      }
      const surveyInfo = { surveyName: surveyName, userId: user.sub };
      const surveyId = await createSurvey(surveyInfo); // takes in obj userid and surveyname
      setSurveyInfo({
        surveyName: surveyName,
        surveyId: surveyId,
      });

      setisLoading(false);
      nav("/home/buildsurvey", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setisLoading(false);
    }
  };

  return [isLoading, setSurveyName, fn_CreateSurvey];
};

export default useCreateSurvey;
