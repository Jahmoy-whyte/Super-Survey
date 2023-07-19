import css from "./CSS.module.css";
import { Oval } from "react-loader-spinner";
const Button = ({
  leftRightMargin = 0,
  topbBottomMargin = 0,
  width = "auto",
  isLoading = false,
  text = "",
  func,
}) => {
  return (
    <button
      onClick={() => func()}
      disabled={isLoading}
      className={css.btn}
      style={{
        width: width,
        marginBottom: topbBottomMargin,
        marginTop: topbBottomMargin,
        marginLeft: leftRightMargin,
        marginRight: leftRightMargin,
      }}
    >
      {isLoading ? (
        <Oval color="#1E1C68" secondaryColor="white" width={22} height={22} />
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
