import React, { Component } from "react";

class Stats extends Component {
  render() {
    const questionsPosed = this.props.stats.gamesPlayed * 10;
    const questionsRight = this.props.stats.correctAnswers;
    const percentageRight = Math.floor((questionsRight / questionsPosed) * 100);
    let gameMode = this.props.gameMode;
    let scoreBoard = <p>Your Score: {percentageRight}%</p>;

    return (
      <div>{scoreBoard}</div>
    );
  }
}

export default Stats;
