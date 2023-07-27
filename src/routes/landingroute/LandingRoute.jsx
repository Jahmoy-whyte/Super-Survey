import css from "./CSS.module.css";
import logo from "../../assets/images/logo.svg";
import landingimg from "../../assets/images/landingimg.png";
import landingimgsignup from "../../assets/images/landingimgsignup.png";
import createsurveyimg from "../../assets/images/createsurvey.png";
import createsurveyicon from "../../assets/images/createsurvey.svg";

import linkimg from "../../assets/images/linkimg.png";
import linkimgicon from "../../assets/images/linkimg.svg";

import statsimg from "../../assets/images/statsimg.png";

import statsimgicon from "../../assets/images/statsimg.svg";
import StepsCards from "./components/stepscards/StepsCards";
const LandingRoute = () => {
  return (
    <>
      <div className={css.maincontainer}>
        <div className={css.headingandherodiv}>
          <header className={css.header}>
            <div className={css.headerdiv}>
              <div className={css.logoandtitlediv}>
                <img src={logo} />
                <div>Super Survey</div>
              </div>
              <button className={css.signupbtn}>Sign Up</button>
            </div>
          </header>
          <section className={css.herosection}>
            <div className={css.herodiv}>
              <div className={css.herotextdiv}>
                <h1>
                  Create Surveys Fast <br />
                  And Easy
                </h1>
                <p>
                  Build, distribute, and analyze surveys effortlessly with
                  <br /> our user-friendly survey builder.
                </p>
                <button>Get Started</button>
              </div>
              <div className={css.heroimgdiv}>
                <img className={css.heroimg} src={landingimg} />
              </div>
            </div>
          </section>
        </div>
        <section className={css.section}>
          <div className={css.sectiondiv}>
            <div className={css.sectionimgdiv}>
              <img className={css.sectionimg} src={landingimgsignup} />
            </div>
            <div className={css.sectioncontentdiv}>
              <h2>Signup</h2>
              <p>its free all you need is an email address </p>
            </div>
          </div>
        </section>

        <section className={css.cardsection}>
          <div className={css.headingdiv}>
            <h2>Easy to use</h2>
            <p>Get your survey out there in 3 simple steps</p>
          </div>
          <div className={css.carddiv}>
            <StepsCards
              text={"Create Survey"}
              icon={createsurveyicon}
              img={createsurveyimg}
            />
            <StepsCards text={"Share Link"} icon={linkimgicon} img={linkimg} />
            <StepsCards
              text={"View Responce"}
              icon={statsimgicon}
              img={statsimg}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingRoute;
