export const checker = (state) => {
  let bool = true;
  let message = "";
  if (state.questionText == "") {
    bool = false;
    message = "Enter question";
  } else if (
    state.questionType == "multipleChoice" &&
    state.choices.length == 0
  ) {
    bool = false;
    message = "Add options";
  } else if (
    state.questionType == "multipleChoice" &&
    state.choices.length < 2
  ) {
    bool = false;
    message = "There must be 2 or more options";
  } else if (state.questionType == "multipleChoice") {
    for (let i = 0; i < state.choices.length; i++) {
      if (state.choices[i].text == "") {
        bool = false;
        message = `Enter text for option ${i + 1}`;
        break;
      }
    }
  }
  return [bool, message];
};
