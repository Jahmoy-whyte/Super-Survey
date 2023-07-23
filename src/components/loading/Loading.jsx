import { ProgressBar } from "react-loader-spinner";
import css from "./CSS.module.css";
const Loading = ({ primaryColors, secondary }) => {
  return (
    <div className={css.container}>
      <ProgressBar
        barColor={primaryColors ? primaryColors : "#5167F6"}
        borderColor={secondary ? secondary : "#3F59FE"}
      />
    </div>
  );
};

export default Loading;
