import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { SurveyInfoContext } from "./context/context";
import { useState, lazy, Suspense } from "react";

import Createsurvey from "./routes/createsurvey/Createsurvey";

import ProtectedRoutes from "./ProtectedRoutes";
import LandingRoute from "./routes/landingroute/LandingRoute";
import { ProgressBar } from "react-loader-spinner";
//import Home from "./routes/home/Home";
//import BuildSurvey from "./routes/buildsurvey/BuildSurvey";
//import SurveyResponces from "./routes/surveyresponces/SurveyResponces";
//import Surveys from "./routes/surveys/Surveys";
//import SurveyForm from "./routes/surveyform/SurveyForm";
//import SurveySubmitted from "./routes/surveysubmitted/SurveySubmitted";

const SurveySubmitted = lazy(() =>
  import("./routes/surveysubmitted/SurveySubmitted")
);
const SurveyForm = lazy(() => import("./routes/surveyform/SurveyForm"));
const Home = lazy(() => import("./routes/home/Home"));
const BuildSurvey = lazy(() => import("./routes/buildsurvey/BuildSurvey"));
const Surveys = lazy(() => import("./routes/surveys/Surveys"));
const SurveyResponces = lazy(() =>
  import("./routes/surveyresponces/SurveyResponces")
);

const Routing = () => {
  const [surveyInfo, setSurveyInfo] = useState({
    surveyName: null,
    surveyId: null,
  });

  const router = createHashRouter([
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
      <Suspense
        fallback={
          <div className="loading-container">
            <ProgressBar barColor={"white"} borderColor={"white"} />
          </div>
        }
      >
        <SurveyInfoContext.Provider value={[surveyInfo, setSurveyInfo]}>
          <RouterProvider router={router} />
        </SurveyInfoContext.Provider>
        <ToastContainer hideProgressBar />
      </Suspense>
    </>
  );
};
export default Routing;
