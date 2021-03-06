import React from 'react';
import PropTypes from 'prop-types';
import AnswerButtons from '../components/answer-buttons';
import { Col, Grid, Row } from 'react-bootstrap';
import '../stylesheets/answer-question.scss';
import { connect } from 'react-redux';
import QuestionHeader from '../components/question-header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchMatch, removeCurrentMatch, timeout, clearMatchState } from '../redux/actions/match';
import '../stylesheets/home.scss';
import { TIME_TO_ANSWER, PROGRESS_HEIGHT, PROGRESS_COLOR } from '../constants/match';
import { SlideFadeDelayed } from '../components/transitions';
import Progress from 'react-progress';
import { withRouter } from 'react-router-dom';
import Spinner from '../components/spinner';
import matchService from '../services/match';

const mapStateToProps = (state) => {
  return {
    matchData: state.matchData.match,
    matchState: state.matchData.state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeCurrentMatch: () => dispatch(removeCurrentMatch()),
    fetchMatch: matchName => dispatch(fetchMatch(matchName)),
    timeout: () => dispatch(timeout()),
    clearMatchState: () => dispatch(clearMatchState())
  };
};

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
class AnswerQuestion extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onTimeout = this.onTimeout.bind(this);
  }

  componentWillMount() {
    this.props.clearMatchState();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  
  onTimeout() {
    this.props.timeout();
  }

  render() {
    if (!this.props.matchData) {
      this.props.history.push('/');
      return <Spinner/>;
    }
    const totalQuestions = this.props.matchData.game.questions.length;
    const questionIndex = this.props.matchState.question;
    const question = this.props.matchData.game.questions[questionIndex];
    const answered = this.props.matchState.answer;

    return (
      <Grid>
        <Progress
          percent={ 100 * (questionIndex) / totalQuestions }
          color={ PROGRESS_COLOR }
          height={ PROGRESS_HEIGHT }
        />
        <QuestionHeader
          seconds={ TIME_TO_ANSWER }
          onTimeout={ this.onTimeout }
          text={ question.text }
          stop={ answered }
          correct={ matchService.decrypt(question) === answered }
        />
        <Row>
          <SlideFadeDelayed in={ answered === false  }>
            <Col xs={ 12 } smOffset={ 3 } sm={ 6 }>
              <AnswerButtons answers={ question.answers } correctAnswer={ question.correctAnswer }/>
            </Col>
          </SlideFadeDelayed>
        </Row>
      </Grid>
    )
  }
}

AnswerQuestion.propTypes = {
  matchData: PropTypes.object,
  matchState: PropTypes.object,
  removeCurrentMatch: PropTypes.func,
  fetchMatch: PropTypes.func,
  timeout: PropTypes.func,
  clearMatchState: PropTypes.func,
}

export default AnswerQuestion;
