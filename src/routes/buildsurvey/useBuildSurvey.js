import { useState, useReducer, useContext } from "react";
import { createSurvey } from "../../databaseFunctions/surveys_TableFunctions";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ACTIONS } from "./helper/reducerActions";
import { SurveyInfoContext } from "../../context/context";
const useBuildSurvey = () => {
  const [surveyInfo, setSurveyInfo] = useContext(SurveyInfoContext);
  const initialState = {
    questionType: "",
    questionText: "",
    questionId: 1,
    questions: [],
    isLoading: false,
    choices: [],
    choiceId: 1,
    showModel: false,
    buttonAction: "Save",
    id: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "questionType":
        return {
          ...state,
          questionType: action.payload,
          choices: [],
        };
      case "questionText":
        return { ...state, questionText: action.payload };
      case "questionId":
        return { ...state, questionId: state.questionId + 1 };

      case "deleteQuestion":
        return {
          ...state,
          questions: state.questions.filter((data) => {
            return data.id !== action.payload.id;
          }),
        };

      case "editQuestion": {
        const index = state.questions.findIndex(
          (ques) => ques.id === action.payload.id
        );
        return {
          ...state,
          buttonAction: "Update",
          questionType: state.questions[index].questionType,
          questionText: state.questions[index].questionText,
          choices: state.questions[index].choices,
          id: state.questions[index].id,
          showModel: true,
        };
      }
      case "addQuestion":
        return {
          ...state,
          questionId: state.questionId + 1,
          questions: [
            ...state.questions,
            {
              id: state.questionId,
              questionType: state.questionType,
              questionText: state.questionText,
              choices: state.choices,
            },
          ],
        };

      case "updateQuestion":
        return {
          ...state,
          questions: state.questions.map((ques) => {
            return ques.id == action.payload.id
              ? {
                  ...ques,
                  questionType: state.questionType,
                  questionText: state.questionText,
                  choices: state.choices,
                }
              : ques;
          }),
        };
      case "showModel":
        return {
          ...state,
          showModel: true,
        };
      case "closeModel":
        return {
          ...state,
          showModel: false,
          buttonAction: "Save",
          choices: [],
          questionType: "shortAnswer",
          questionText: "",
          id: "",
        };
      case "addChoice":
        return {
          ...state,
          choiceId: state.choiceId + 1,
          choices: [...state.choices, action.payload],
        };
      case "updateChoice":
        return {
          ...state,
          choices: state.choices.map((data) => {
            return data.id == action.payload.id
              ? { ...data, text: action.payload.text }
              : data;
          }),
        };
      case "deleteChoice":
        return {
          ...state,
          choices: state.choices.filter((data) => {
            return data.id !== action.payload;
          }),
        };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  // ======================================== questtions state =========================

  console.log(state);
  return [state, dispatch, surveyInfo];
};

export default useBuildSurvey;
