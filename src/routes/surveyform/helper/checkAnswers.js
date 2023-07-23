const checkAnswers = (state) => {
  let bool = true;
  let message = "";

  if (state.email === "") {
    bool = false;
    message = "Enter your email address";
  } else if (!validateEmail(state.email)) {
    bool = false;
    message = "email format incorrect";
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

const validateEmail = (email) => {
  var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

export default checkAnswers;
