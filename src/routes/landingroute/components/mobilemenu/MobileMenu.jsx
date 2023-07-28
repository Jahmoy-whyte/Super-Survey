import css from "./CSS.module.css";
import close from "../../../../assets/images/close2.svg";
const MobileMenu = ({ show, setshow, loginOrSignUp }) => {
  return (
    <>
      {show ? (
        <div className={css.menubackdrop} onClick={() => setshow(false)}>
          <div
            className={css.menucontainer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={css.closeheading}>
              Menu
              <img src={close} loading="lazy" onClick={() => setshow(false)} />
            </div>
            <button className={css.btn} onClick={() => loginOrSignUp("login")}>
              Login
            </button>
            <button className={css.btn} onClick={() => loginOrSignUp("signup")}>
              Sign Up
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MobileMenu;
