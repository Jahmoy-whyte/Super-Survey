import css from "./CSS.module.css";
import logo from "../../../../assets/images/logo.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { user, logout } = useAuth0();
  const [show, setShow] = useState(false);
  const nav = useNavigate();
  return (
    <>
      {show ? (
        <div className={css.menubackdrop} onClick={() => setShow(!show)}></div>
      ) : null}

      <header className={css.heading_css}>
        <div className={css.leftdiv} onClick={() => nav("/")}>
          <img src={logo} />
          <h1>Super Survey</h1>
        </div>
        <div className={css.accountmenudiv}>
          <img src={user?.picture} onClick={() => setShow(!show)} />
          {show ? (
            <div className={css.accountmenu}>
              <div className={css.accountinfodiv}>
                <img src={user?.picture} />
                <div className={css.accountinfo}>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                </div>
              </div>
              <button className={css.logoutbtn} onClick={() => logout()}>
                <FiLogOut />
                Log Out
              </button>
            </div>
          ) : null}
        </div>
      </header>
    </>
  );
};
//      <p>{JSON.stringify(user)}</p>
export default Header;
