import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routing from "./Routing";
import { Auth0Provider } from "@auth0/auth0-react";

const clientid = import.meta.env.CLINETID;
const domain = import.meta.env.DOMAIN;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientid}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Routing />
    </Auth0Provider>
  </React.StrictMode>
);
