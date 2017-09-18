import {
  ADD_QUESTION,
  CHANGE_QUESTION_NAME,
  CHANGE_QUESTION_DIFFICULTY,
  REMOVE_ALL_QUESTIONS,
  CHANGE_ANSWER,
  CHANGE_IMAGE,
  CHANGE_SELECTED_ANSWER,
  MOVE_QUESTION
} from '../constants/game';

import 'array.prototype.move';

const initialState = {
  questions: [],
  image: null
};

export default (state = initialState, action) => {
  let newQuestions;
  let newAnswers;
  switch (action.type) {
    case ADD_QUESTION:
      return {
        ...state,
        questions: state.questions.concat([ action.question ])
      };
    case CHANGE_QUESTION_DIFFICULTY:
      return{
        ...state,
        questions: state.questions.map( (question, index) => {
          return {
            ...question,
            difficulty: index === action.index ? action.difficulty : question.difficulty
            }
        })

      }
    case CHANGE_QUESTION_NAME:
      return {
        ...state,
        questions: state.questions.map( (question, index) => {
          return {
            ...question,
            text: index === action.index ? action.questionName : question.text
            }
        })
      };
    case REMOVE_ALL_QUESTIONS:
      return {
        ...state,
        questions: []
      };
    case CHANGE_ANSWER:
      newAnswers = state.questions[action.question].answers.slice(0, 4);
      newAnswers[action.index] = action.answer;
      newQuestions = state.questions.slice(0, state.questions.length);
      newQuestions[action.question].answers = newAnswers;
      return {
        ...state,
        questions: newQuestions
      };
    case CHANGE_IMAGE:
      return {
        ...state,
        image: action.image
      };
    case CHANGE_SELECTED_ANSWER:
      newQuestions = state.questions.slice(0, state.questions.length);
      newQuestions[action.question].correctAnswer = action.answer;
      return {
        ...state,
        questions: newQuestions
      };
    case MOVE_QUESTION:
      let updatedQuestions = state.questions
      updatedQuestions.move(action.index, action.atIndex);
      console.log(updatedQuestions);
      return {
        ...state,
        questions: updatedQuestions
      };
    default:
      return state;
  }
}
