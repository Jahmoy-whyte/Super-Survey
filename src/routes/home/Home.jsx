import css from "./CSS.module.css";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className={css.maincontainer}>
      <Header />
      <Outlet />
    </div>
  );
}

export default Home;
