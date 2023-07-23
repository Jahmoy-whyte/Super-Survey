import { useState, useEffect, useContext, useReducer } from "react";
import { getResponces } from "../../databaseFunctions/responce_TableFunctions";
import { getQuestions } from "../../databaseFunctions/question_TableFunctions";

import surveyResponceActions from "./helper/surveyResponceActions";
import { SurveyInfoContext } from "../../context/context";
import { toast } from "react-toastify";
const useSurveyResponces = () => {
  const [surveyInfo, setSurveyInfo] = useContext(SurveyInfoContext);

  const initialState = {
    initialLoad: true,
    questions: [],
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "setQuestions":
        return { ...state, questions: action.payload };
      case "setQuestionsAnswers":
        return {
          ...state,
          questions: state.questions.map((question) => {
            return question.id === action.payload.id
              ? {
                  ...question,
                  answers: action.payload.answers,
                }
              : question;
          }),
        };
      case "showQuestionsAnswersLoading":
        return {
          ...state,
          questions: state.questions.map((question) => {
            return question.id === action.payload.id
              ? {
                  ...question,
                  showResponce: action.payload.showResponce,
                  isLoading: action.payload.isLoading,
                }
              : question;
          }),
        };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [responce, setResponce] = useState();

  const checkFor_state_ShowAndAnswers = (questionId) => {
    /* 
    checkFor state Show And Answer it
      finds the index of the question
       and then uses the index to test if state.show is  true 
       if true it will set it false else if answer have been fetched already 
       then just toggle state.show to true  if state.show is false 
       then return a bool 
    */
    let functionContinue = true;
    const index = state.questions.findIndex(
      (question) => question.id == questionId
    );

    if (state.questions[index].showResponce) {
      functionContinue = false;
      dispatch({
        type: surveyResponceActions.SHOW_QUESTIONS_ANSWERS_AND_LOADING,
        payload: { id: questionId, isLoading: false, showResponce: false },
      });
    } else if (state.questions[index]?.answers) {
      functionContinue = false;
      dispatch({
        type: surveyResponceActions.SHOW_QUESTIONS_ANSWERS_AND_LOADING,
        payload: { id: questionId, isLoading: false, showResponce: true },
      });
    }
    return functionContinue;
  };

  const dbGetResponces = async (questionId) => {
    if (!checkFor_state_ShowAndAnswers(questionId)) return;

    dispatch({
      type: surveyResponceActions.SHOW_QUESTIONS_ANSWERS_AND_LOADING,
      payload: { id: questionId, isLoading: true, showResponce: true },
    });
    try {
      const res = await getResponces(questionId);

      dispatch({
        type: surveyResponceActions.SET_QUESTIONS_ANSWERS,
        payload: { id: questionId, answers: res },
      });
      // console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    dispatch({
      type: surveyResponceActions.SHOW_QUESTIONS_ANSWERS_AND_LOADING,
      payload: { id: questionId, isLoading: false, showResponce: true },
    });
  };

  useEffect(() => {
    const dbGetQuestions = async () => {
      try {
        const res = await getQuestions(surveyInfo.surveyId);

        const newArray = res.map((question) => {
          if (question.questionType === "multipleChoice") {
            const choices = JSON.parse(question.choices);
            let arr = choices.map((choice) => choice.text);
            return { ...question, choices: arr };
          } else {
            return question;
          }
        });
        dispatch({
          type: surveyResponceActions.SET_QUESTIONS,
          payload: newArray,
        });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };
    dbGetQuestions();
  }, []);

  console.log(state);
  return [state, dispatch, surveyInfo, dbGetResponces];
};

export default useSurveyResponces;
