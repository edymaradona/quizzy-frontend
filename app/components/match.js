import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Header from '../components/header';
import { withRouter } from 'react-router-dom';
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
    this.props.history.push(`/start-match/${this.props.data.url}`);
  }

  render() {
    return (
      <tr>
        <td><img className='match-image' src={ this.props.data.game.image || require('../../assets/images/quizzy_logo.svg') }/></td>
        <td>{ this.props.data.game.name }</td>
        <td>{ this.props.data.isRealTime ? 'Real-Time' : 'Normal' }</td>
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

  };
}

MatchRow.propTypes = {
  history: ReactRouterPropTypes.history,
  location: ReactRouterPropTypes.location,
  match: ReactRouterPropTypes.match,
  data: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchRow)
