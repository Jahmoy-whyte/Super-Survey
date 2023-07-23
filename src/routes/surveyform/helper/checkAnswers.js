const checkAnswers = (state) => {
  let bool = true;
  let message = "";
  if (state.email === "") {
    bool = false;
    message = "Enter your email address";
  } else {
    for (let i = 0; i < state.questions.length; i++) {
      if (state.questions[i].answer == "") {
        bool = false;
        message = `Please answer question ${i + 1}`;
        break;
      }
    }
  }

  return [bool, message];
};

export default checkAnswers;
