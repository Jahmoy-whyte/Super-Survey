import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import Loading from "./components/loading/Loading";
import { ProgressBar } from "react-loader-spinner";
const ProtectedRoutes = ({ children }) => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  if (isLoading) {
    return (
      <div className="loading-container">
        <ProgressBar barColor={"white"} borderColor={"white"} />
      </div>
    );
  }
  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    loginWithRedirect();
    return <div></div>;
  }
};

export default ProtectedRoutes;
