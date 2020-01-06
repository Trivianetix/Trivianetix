import React, { Component } from 'react';

class GameContainer extends Component {
  render() {

    return (
      <div>
        <p className="question-tag">Question. {this.props.results[0].question}</p>
      </div>
    )
  }
}

export default GameContainer;
