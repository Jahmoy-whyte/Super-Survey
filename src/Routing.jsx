import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Home from "./routes/home/Home";
import { useAuth0 } from "@auth0/auth0-react";
import Surveys from "./routes/surveys/Surveys";
import Createsurvey from "./routes/createsurvey/Createsurvey";
import BuildSurvey from "./routes/buildsurvey/BuildSurvey";
import { SurveyInfoContext } from "./context/context";
import { useState } from "react";
import SurveyForm from "./routes/surveyform/SurveyForm";
import SurveySubmitted from "./routes/surveysubmitted/SurveySubmitted";
import SurveyResponces from "./routes/surveyresponces/SurveyResponces";
const Routing = () => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  const [surveyInfo, setSurveyInfo] = useState({
    surveyName: null,
    surveyId: null,
  });

  const Temproute = () => {
    if (isLoading) {
      return <div>loading</div>;
    }

    if (!isLoading) {
      if (isAuthenticated) {
        return <Navigate to={"/home"} />;
      } else {
        loginWithRedirect();
        return <div></div>;
      }
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Temproute />,
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
      path: "/home",
      element: <Home />,
      children: [
        {
          path: "/home/",
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
