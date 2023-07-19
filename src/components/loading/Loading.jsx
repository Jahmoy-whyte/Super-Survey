import { ProgressBar } from "react-loader-spinner";
import css from "./CSS.module.css";
const Loading = () => {
  return (
    <div className={css.container}>
      <ProgressBar barColor="#5167F6" borderColor="#3F59FE" />
    </div>
  );
};

export default Loading;
