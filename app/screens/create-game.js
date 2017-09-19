import React from 'react';
import '../stylesheets/create-game.scss';
import { addQuestion, changeImage, removeAllQuestions } from '../redux/actions/game';
import Questions from '../components/questions';
import Question from '../components/question';
import { connect } from 'react-redux';
import empty from '../../assets/images/empty.svg';

const mapStateToProps = (state) => {
  return {
    image: state.gameData.image,
    questions: state.gameData.questions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addQuestion: (question) => dispatch(addQuestion(question)),
    removeAllQuestions: () => dispatch(removeAllQuestions()),
    changeImage: (image) => dispatch(changeImage(image)),
    changeQuestionName: (newQuestion, index) => dispatch(changeQuestionName(newQuestion, index)),
  };
};

const question = () => {
  return {
    text: '',
    difficulty: 'easy',
    answers: [ '','','','' ],
    correctAnswer: 0
  };
};

class CreateGame extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onAddQuestion = this.onAddQuestion.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);


  }

  componentWillMount() {
    this.props.removeAllQuestions();
    this.props.addQuestion(question(0));
  }

  componentWillUnmount() {
    this.props.removeAllQuestions();
  }

  onAddQuestion() {
    let indexWhereAdd = this.props.questions.length;
    this.props.addQuestion(question(indexWhereAdd));
  }

  onChangeImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => this.props.changeImage(reader.result);

  }

  render() {
    let questions = this.props.questions;
    return (
      <div>
        <h2> MAKE UP YOUR OWN GAME </h2>
        Name <input type='text' name='name' placeholder='eg: Tennis Champions'/><br/>
        <label className='upload-image' htmlFor='uploadImage'>
          {/* use CSS to set image size */}
          <img src={ this.props.image === null ? empty : this.props.image } height="100" id="previewImage"/>
          <input hidden type='file' id='uploadImage' name='image' onChange={ this.onChangeImage }/>
        </label>
        <br/>
          <label> Choose an image! </label>
        <br/>
        Category
        <select>
          <option value='sport'>Sport</option>
          <option value='tv'>Television</option>
          <option value='videogames'>Videogames</option>
        </select> <br/>
        Questions <br/>
        <Questions/>
        <button onClick={ this.onAddQuestion }>Add...</button> <br/>
        <button>Done</button>  <button>Cancel</button> <br/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);
