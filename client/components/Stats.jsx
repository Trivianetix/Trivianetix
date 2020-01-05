import React, { Component } from 'react';

class Stats extends Component {
  render() {

    const questionsPosed = this.props.stats.gamesPlayed*10;
    const questionsRight = this.props.stats.correctAnswers;
    const percentageRight = Math.floor(questionsRight/questionsPosed * 100);

    return (
      <div>
        <p>You're Score: {percentageRight}%</p>
      </div>
    )
  }
}

export default Stats;
