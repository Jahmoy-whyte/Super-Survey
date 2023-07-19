import css from "./CSS.module.css";
import logo from "../../../../assets/images/logo.svg";
import { useAuth0 } from "@auth0/auth0-react";
const Header = () => {
  const { user, logout } = useAuth0();
  return (
    <header className={css.heading_css}>
      <div>
        <img src={logo} />
        <h1>Super Survey</h1>
      </div>
      <img src={user.picture} onClick={() => logout()} />
    </header>
  );
};
//      <p>{JSON.stringify(user)}</p>
export default Header;
