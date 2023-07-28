import express from "express";
import cors from "cors";
import questionsRoute from "./controller/questionsRoute.js";
import surveysRoute from "./controller/surveysRoute.js";
import responcesRoute from "./controller/responcesRoute.js";
import usersRoute from "./controller/usersRoute.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://super-survey.onrender.com",
  })
);
app.use("/questions", questionsRoute);
app.use("/surveys", surveysRoute);
app.use("/responces", responcesRoute);
app.use("/users", usersRoute);
app.get("/", (req, res) => {
  res.send("surver is running");
});
/*
var options = {
  method: "POST",
  url: "https://surveywebapp.us.auth0.com/oauth/token",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  data: new URLSearchParams({
    grant_type: "client_credentials",
    client_id: "2i7Qfw9zOcgCraLrYuuiveYH1zcDKMaC",
    client_secret:
      "Oxh3okJk9QE57Z2_3PkVWTEUUHyfCwimrWvqc45ycoIbN8oNwNZIOA_icAWqAyxO",
    audience: "http://localhost:3000/",
  }),
};
axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
*/
app.listen(process.env.PORT || 3000, () =>
  console.log("server started on port 3000")
);
