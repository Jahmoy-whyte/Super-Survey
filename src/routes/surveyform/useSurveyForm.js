import { useEffect, useReducer } from "react";
import { getSurveyForm } from "../../databaseFunctions/surveys_TableFunctions";
import { useParams, useNavigate } from "react-router-dom";
import { surveyFormActions } from "./helper/surveyFormActions";
import { toast } from "react-toastify";
import checkAnswers from "./helper/checkAnswers";
import { submitForm } from "../../databaseFunctions/responce_TableFunctions";

const useSurveyForm = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const initialState = {
    btnLoading: false,
    initialLoading: true,
    questions: [],
    error: false,
    notFound: false,
    message: "",
    email: "",
    disableForm: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "emailvalue":
        return { ...state, email: action.payload };
      case "notFound":
        return {
          ...state,
          notFound: true,
          message: action.payload,
          initialLoading: false,
        };
      case "btnLoading":
        return {
          ...state,
          btnLoading: action.payload,
          disableForm: action.payload,
        };
      case "setQuestions":
        return {
          ...state,
          questions: action.payload.questions,
          initialLoading: false,
        };
      case "answer":
        return {
          ...state,
          questions: state.questions.map((question) => {
            return question.id === action.payload.id
              ? { ...question, answer: action.payload.answer }
              : question;
          }),
        };

      case "clear":
        return {
          ...state,
          questions: state.questions.map((question) => {
            return question.id === action.payload.id
              ? { ...question, answer: "" }
              : question;
          }),
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const getForm = async () => {
      try {
        const res = await getSurveyForm(id);

        if (res.length == 0) {
          return dispatch({
            type: surveyFormActions.NOTFOUND,
            payload: "Survey Not Found",
          });
        } else if (res.length == 1 && res[0].questionText == null) {
          return dispatch({
            type: surveyFormActions.NOTFOUND,
            payload: "Survey Under Construction",
          });
        }

        const questions = res.map((question) => {
          const choices =
            question.questionType === "multipleChoice"
              ? JSON.parse(question.choices)
              : question.choices;
          return {
            ...question,
            choices: choices,
            answer: "",
          };
        });

        dispatch({
          type: surveyFormActions.SETQUESTIONS,
          payload: { questions: questions },
        });
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    };

    getForm();
  }, []);
  //console.log(state);

  const db_SubmitForm = async () => {
    dispatch({ type: surveyFormActions.BTNLOADING, payload: true });
    try {
      const [bool, message] = checkAnswers(state);
      if (!bool) {
        dispatch({ type: surveyFormActions.BTNLOADING, payload: false });
        return toast.warn(message);
      }

      const formData = {
        email: state.email,
        surveyId: state?.questions[0]?.surveyId,
        answers: state.questions.map((question) => {
          return [question.id, question.answer]; // responce id will be added on the server in the array
        }),
      };
      let test = await submitForm(formData);
      console.log(test);
      //await submitForm(formData);
      nav(`/surveysubmitted`, { replace: false });
      toast.success("Form submited successfully");
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "ERROR");
    }

    dispatch({ type: surveyFormActions.BTNLOADING, payload: false });
  };
  return [state, dispatch, db_SubmitForm];
};

export default useSurveyForm;
