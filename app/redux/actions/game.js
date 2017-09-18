import {
  ADD_QUESTION,
  CHANGE_QUESTION_NAME,
  REMOVE_ALL_QUESTIONS,
  CHANGE_ANSWER,
  CHANGE_IMAGE,
  CHANGE_SELECTED_ANSWER,
  CHANGE_QUESTION_DIFFICULTY,
  MOVE_QUESTION
} from '../constants/game';
export const changeImage = (image) => {
  return {
    type: CHANGE_IMAGE,
    image
  }
};



export const changeQuestionDifficulty = (difficulty, index) => {
  return {
      type: CHANGE_QUESTION_DIFFICULTY,
      difficulty,
      index
  }
};


export const changeQuestionName = (questionName, index) => {
  return {
    type: CHANGE_QUESTION_NAME,
    questionName,
    index
  }
};

export const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question
  }
};

export const removeAllQuestions = () => {
  return {
    type: REMOVE_ALL_QUESTIONS,
  }
};

export const changeAnswer = (question, answer, index) => {
  return {
    type: CHANGE_ANSWER,
    question,
    answer,
    index
  }
};

export const changeSelectedAnswer = (question, answer) => {
  return {
    type: CHANGE_SELECTED_ANSWER,
    question,
    answer
  }
}

export const moveQuestion = (question, index, atIndex) => {
  return {
    type: MOVE_QUESTION,
    question,
    index,
    atIndex
  }
};
