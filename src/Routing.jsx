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
const Routing = () => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  const [surveyInfo, setSurveyInfo] = useState({
    surveyName: null,
    surveyId: null,
  });

  const Temproute = () => {
    if (!isLoading) {
      if (isAuthenticated) {
        return <Navigate to={"/home"} />;
      } else {
        loginWithRedirect();
        return <div></div>;
      }
    }
  };

  if (isLoading) {
    return <div>loading</div>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Temproute />,
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
          element: <BuildSurvey />,
        },
        {
          path: "/home/buildsurvey",
          element: <BuildSurvey />,
        },
      ],
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
