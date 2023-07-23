import Loading from "../../../../components/loading/Loading";
import css from "./CSS.module.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ResponceDisplay from "../responcedisplay/ResponceDisplay";
const ResponeLayout = ({ question, dbGetResponces }) => {
  return (
    <>
      <div
        className={css.maincontainer}
        onClick={() => dbGetResponces(question.id)}
      >
        <div className={css.headingcontainer}>
          <h3>{question.questionText}</h3>
          <MdOutlineKeyboardArrowDown />
        </div>
        {question?.showResponce ? (
          <div className={css.answersdiv}>
            {question.isLoading ? (
              <Loading />
            ) : (
              <ResponceDisplay question={question} />
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ResponeLayout;
