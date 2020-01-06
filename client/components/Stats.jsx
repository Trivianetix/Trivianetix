import React, { Component } from "react";

class Stats extends Component {
  render() {
    const questionsPosed = this.props.stats.gamesPlayed * 10;
    const questionsRight = this.props.stats.correctAnswers;
    const percentageRight = Math.floor((questionsRight / questionsPosed) * 100);
    let gameMode = this.props.gameMode;
    let scoreBoard = <p>You're Score: {percentageRight}%</p>;

    return (
      <React.Fragment>
        {/* ================================================================= */}
        {/* When game is playing, hide this component */}
        {/* ================================================================= */}
        {gameMode ? scoreBoard : null}
        {/* ================================================================= */}
      </React.Fragment>
    );
  }
}

export default Stats;
