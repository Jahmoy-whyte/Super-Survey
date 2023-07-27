import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home/Home";
import Surveys from "./routes/surveys/Surveys";
import Createsurvey from "./routes/createsurvey/Createsurvey";
import BuildSurvey from "./routes/buildsurvey/BuildSurvey";
import { SurveyInfoContext } from "./context/context";
import { useState } from "react";
import SurveyForm from "./routes/surveyform/SurveyForm";
import SurveySubmitted from "./routes/surveysubmitted/SurveySubmitted";
import SurveyResponces from "./routes/surveyresponces/SurveyResponces";
import ProtectedRoutes from "./ProtectedRoutes";
import LandingRoute from "./routes/landingroute/LandingRoute";
const Routing = () => {
  const [surveyInfo, setSurveyInfo] = useState({
    surveyName: null,
    surveyId: null,
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingRoute />,
    },
    {
      path: "/surveyform/:id",
      element: <SurveyForm />,
    },
    {
      path: "/surveysubmitted",
      element: <SurveySubmitted />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoutes>
          <Home />
        </ProtectedRoutes>
      ),
      children: [
        {
          path: "/home",
          element: <Surveys />,
        },
        {
          path: "/home/createsurvey",
          element: <Createsurvey />,
        },
        {
          path: "/home/buildsurvey",
          element: <BuildSurvey />,
        },
        {
          path: "/home/surveyresponces",
          element: <SurveyResponces />,
        },
      ],
    },
    {
      path: "*",
      element: <p>page not found</p>,
    },
  ]);

  return (
    <>
      <SurveyInfoContext.Provider value={[surveyInfo, setSurveyInfo]}>
        <RouterProvider router={router} />
      </SurveyInfoContext.Provider>
      <ToastContainer hideProgressBar />
    </>
  );
};
export default Routing;
