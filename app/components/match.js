import React from 'react';
import Header from '../components/header';
import { withRouter } from 'react-router-dom';
import { setCurrentMatch } from '../redux/actions/match';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import '../stylesheets/match.scss';

@withRouter
class MatchRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {};
  }

  handleClick() {
    this.props.setCurrentMatch(this.props.data);
    this.props.history.push(`/start-match/${this.props.data.url}`);
  }

  render() {
    return (
      <tr>
        <td><img className='match-image' src={ this.props.data.game.image || require('../../assets/images/empty.svg') }/></td>
        <td>{ this.props.data.game.name }</td>
        <td><img className='play-button' src={ require('../../assets/images/play_button.png')} onClick={ this.handleClick }/></td>
      </tr>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentMatch: (currentMatch) => dispatch(setCurrentMatch(currentMatch)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchRow)
