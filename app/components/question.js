import Answer from './answer';
import { connect } from 'react-redux';
import { changeQuestionName } from '../redux/actions/game';
import { changeQuestionDifficulty } from '../redux/actions/game';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { moveQuestion } from '../redux/actions/game';

const mapDispatchToProps = (dispatch) => {
    return {
    changeQuestionName: (newQuestion, index) => dispatch(changeQuestionName(newQuestion, index)),
    changeQuestionDifficulty: (newDifficulty, index) => dispatch(changeQuestionDifficulty(newDifficulty, index))
    };
};

const mapStateToProps = (state) => {
    return {  };
};

const questionSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.id,
    };
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveQuestion(droppedId, originalIndex);
    }
  },
};

const questionTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = overId;
      props.moveQuestion(draggedId, overIndex);
    }
  },
};

@DropTarget('question', questionTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource('question', questionSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
class Question extends React.PureComponent {
  constructor(props){
    super(props);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.changeDifficulty = this.changeDifficulty.bind(this);
  }


  changeQuestion(event) {
    this.props.changeQuestionName(event.target.value, this.props.id);
  }


  changeDifficulty (event) {
    this.props.changeQuestionDifficulty(event.target.value, this.props.id);
  }

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    moveQuestion: PropTypes.func.isRequired
  };

  render() {
    let question = this.props.obj;
    let id = this.props.id;
    let answers = [];
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;
    question.answers.forEach( (answer, index) => {
      answers.push(
        <Answer
          key={ index }
          id={ index }
          text={ answer }
          correct={ question.correctAnswer === index }
          question={ id }
        />);
    });

    return connectDragSource(connectDropTarget(
      <li>
        <input type='text' onChange={ this.changeQuestion } defaultValue={ question.text } />
        Difficulty
        <select onChange={ this.changeDifficulty }>
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='challenging'>Challenging</option>
        </select> <br/>
        <ul>
          { answers }
        </ul>
      </li>
    ));
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
