import css from "./CSS.module.css";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const ResponceDisplay = ({ question }) => {
  if (question.questionType == "multipleChoice") {
    return (
      <div className={css.chatdiv}>
        <Pie
          data={{
            labels: question?.answers?.map((ans) => ans.answer),
            datasets: [
              {
                label: "",
                data: question?.answers?.map((ans) => ans.count),
              },
            ],
          }}
        />
      </div>
    );
  } else {
    return (
      <>
        {question?.answers?.map((ans, index) => (
          <div key={index} className={css.answersdiv}>
            <p>{ans.answer}</p>
          </div>
        ))}
      </>
    );
  }
};

/*

  <Pie
                  data={{
                    labels: question?.answers?.map((ans) => ans.answer),
                    datasets: [
                      {
                        label: "",
                        data: question?.answers?.map((ans) => ans.count),
                      },
                    ],
                  }}
                />

*/

export default ResponceDisplay;
