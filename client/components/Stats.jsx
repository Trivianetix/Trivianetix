import React, { Component } from "react";

class Stats extends Component {
  render() {
    const questionsPosed = this.props.stats.gamesPlayed * 10;
    const questionsRight = this.props.stats.correctAnswers;
    const percentageRight = questionsPosed ? Math.floor((questionsRight / questionsPosed) * 100) : 0;
    let gameMode = this.props.gameMode;
    let scoreBoard = <p>Your All-Time Score: {percentageRight}%</p>;

    return (
      <div className='scoreboard'>{scoreBoard}</div>
    );
  }
}

export default Stats;
