import { useState, useEffect, useContext } from "react";
import { getUserInfo } from "../../databaseFunctions/users_TableFunctions";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SurveyInfoContext } from "../../context/context";

const useSurvey = () => {
  const nav = useNavigate();
  const [surveyInfo, setSurveyInfo] = useContext(SurveyInfoContext);
  const [surveyData, setsurveyData] = useState({
    isloading: true,
    data: [],
    error: false,
  });
  const { user } = useAuth0();
  useEffect(() => {
    const fn_GetUserInfo = async () => {
      try {
        const userInfo = { email: user.email, userId: user.sub };
        const res = await getUserInfo(userInfo);
        setsurveyData({ isloading: false, data: res });
        console.log(res);
      } catch (error) {
        console.log("=========================");
        toast.error(error.message);
        setsurveyData((prev) => ({ ...prev, isloading: false, error: true }));
        console.log(error);
      }
    };

    fn_GetUserInfo();
  }, []);

  const fn_navigate = (surveydata) => {
    setSurveyInfo({
      surveyName: surveydata.survey_name,
      surveyId: surveydata.survey_id,
    });
    nav("/home/buildsurvey");
  };
  return [surveyData, fn_navigate];
};

export default useSurvey;
