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
    state.choices.map((op, index) => {
      if (op.text == "") {
        bool = false;
        message = `Enter text for option ${index + 1}`;
      }
    });
  }
  return [bool, message];
};
