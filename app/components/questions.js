import React from 'react';
import { moveQuestion } from '../redux/actions/game';
import Question from './question';
import PropTypes from 'prop-types';
import { DropTarget, DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';

const mapDispatchToProps = (dispatch) => {
  return {
    moveQuestion: (question, index, atIndex) => dispatch(moveQuestion(question, index, atIndex))
  };
};

const mapStateToProps = (state) => {
  return {
    questionsState: state.gameData.questions
  };
};
const questionTarget = {
  drop() {
  },
};

@DragDropContext(HTML5Backend)
@DropTarget('question', questionTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
class Questions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.moveQuestion = this.moveQuestion.bind(this);
  }

  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    children: PropTypes.node
  };

  moveQuestion(id, atIndex) {
    let question = this.props.questionsState[id];
    this.props.moveQuestion(question, id, atIndex);
  }

  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div>
        { this.props.questionsState.map((question, index) => (
          <Question
            key={ index }
            id={ index }
            obj={ question }
            moveQuestion={ this.moveQuestion }
          />
        ))}
      </div>,
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
