import { useState, useReducer, useContext, useEffect } from "react";
import { deleteSurvey } from "../../databaseFunctions/surveys_TableFunctions";
import { API_BASE_URL } from "../../databaseFunctions/helper/baseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ACTIONS } from "./helper/reducerActions";
import { SurveyInfoContext } from "../../context/context";
import {
  getQuestions,
  insertQuestions,
  deleteQuestions,
  updateQuestions,
} from "../../databaseFunctions/question_TableFunctions";
import { checker } from "./helper/validateQuestion";
const useBuildSurvey = () => {
  const nav = useNavigate();
  const [surveyInfo, setSurveyInfo] = useContext(SurveyInfoContext);
  const initialState = {
    questionType: "shortAnswer",
    questionText: "",
    questionId: 1,
    isLoading: false,
    choices: [],
    choiceId: 1,
    showModel: false,
    buttonAction: "Save",
    id: "",
    initialLoading: true,
    showLinkModel: false,
    linkButtonText: "Copy",
    showDeleteSurveyModel: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "showDeleteSurveyModel":
        return {
          ...state,
          showDeleteSurveyModel: action.payload,
        };
      case "showLinkModel":
        return {
          ...state,
          showLinkModel: action.payload,
        };
      case "linkButtonText":
        return {
          ...state,
          linkButtonText: action.payload,
        };

      case "loadingTrue":
        return {
          ...state,
          isLoading: true,
        };
      case "loadingFalse":
        return {
          ...state,
          isLoading: false,
        };
      case "initialLoading":
        return {
          ...state,
          initialLoading: action.payload,
        };
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
      case "editQuestion":
        return {
          ...state,
          buttonAction: "Update",
          questionType: action.payload.questionType,
          questionText: action.payload.questionText,
          choices: [...action.payload.choices],
          id: action.payload.id,
          showModel: true,
          choiceId: action.payload.choices.length + 1,
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
          isLoading: false,
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
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [questions, setQuestions] = useState([]);
  // ======================================== questtions state =========================

  const copyLink = () => {
    dispatch({ type: ACTIONS.LINKBUTTONTEXT, payload: "Copied" });
    navigator.clipboard.writeText(
      `${"http://localhost:5173/"}surveyform/${surveyInfo.surveyId}`
    );
    setTimeout(() => {
      dispatch({ type: ACTIONS.LINKBUTTONTEXT, payload: "Copy" });
    }, 500);
  };

  useEffect(() => {
    // getting all questions for the form
    const db_GetQuestions = async () => {
      dispatch({ type: ACTIONS.INITIALLOADING, payload: true });
      try {
        const res = await getQuestions(surveyInfo.surveyId);

        setQuestions(
          res.map((row) => {
            if (row.questionType === "multipleChoice") {
              const choices = JSON.parse(row.choices);
              return {
                ...row,
                choices: choices,
              };
            } else {
              return row;
            }
          })
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
      dispatch({ type: ACTIONS.INITIALLOADING, payload: false });
    };

    db_GetQuestions();
  }, []);

  const db_AddQuestion = async () => {
    const [bool, message] = checker(state);
    if (!bool) return toast.warn(message);
    dispatch({ type: ACTIONS.LOADING_TRUE });
    try {
      const res = await insertQuestions({
        surveyId: surveyInfo.surveyId,
        questionType: state.questionType,
        questionText: state.questionText,
        choices: state.choices,
      });
      setQuestions((prev) => [
        ...prev,
        {
          id: res.insertId,
          questionType: state.questionType,
          questionText: state.questionText,
          choices: state.choices,
        },
      ]);

      dispatch({ type: ACTIONS.CLOSEMODEL });
    } catch (error) {
      console.log(error);
    }
  };

  const db_UpdateQuestion = async (id) => {
    const [bool, message] = checker(state);
    if (!bool) return toast.warn(message);
    dispatch({ type: ACTIONS.LOADING_TRUE });
    try {
      const updateobj = {
        questionType: state.questionType,
        questionText: state.questionText,
        choices: state.choices,
      };
      await updateQuestions(id, updateobj);
      setQuestions(
        questions.map((question) => {
          return question.id == id
            ? {
                ...question,
                ...updateobj,
              }
            : question;
        })
      );
      dispatch({ type: ACTIONS.CLOSEMODEL });
    } catch (error) {
      console.log(error);
    }
  };

  const db_EditQuestion = async (id) => {
    try {
      const index = questions.findIndex((item) => item.id === id);
      dispatch({
        type: ACTIONS.EDIT_QUESTION,
        payload: {
          questionType: questions[index].questionType,
          questionText: questions[index].questionText,
          choices: [...questions[index].choices],
          id: questions[index].id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const db_DeleteQuestion = async (id) => {
    let beforeDelete = [...questions];

    try {
      setQuestions(
        questions.filter((data) => {
          return data.id !== id;
        })
      );
      await deleteQuestions(id);
    } catch ({ error, message }) {
      console.log(error);
      setQuestions(beforeDelete);
      toast.error(message);
    }
  };

  const db_DeleteSurvey = async () => {
    dispatch({ type: ACTIONS.INITIALLOADING, payload: true });
    try {
      await deleteSurvey(surveyInfo.surveyId);
      nav("/");
    } catch ({ error, message }) {
      console.log(error);
      toast.error(message);
    }
    dispatch({ type: ACTIONS.INITIALLOADING, payload: false });
  };

  const navToResponces = () => {
    nav("/home/surveyresponces");
  };
  return [
    state,
    dispatch,
    surveyInfo,
    questions,
    db_AddQuestion,
    db_UpdateQuestion,
    db_EditQuestion,
    db_DeleteQuestion,
    db_DeleteSurvey,
    copyLink,
    navToResponces,
  ];
};

export default useBuildSurvey;
