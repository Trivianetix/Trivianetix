import React, { Component } from 'react';


class GameContainer extends Component {
  render() {
    let gameMode = this.props.gameMode;
    let startGame = this.props.startGame;
    let question = this.props.question;
    let correctAnswer;
    let incorrectAnswers;
    let answers;
    if (question) {
      correctAnswer = question.correct_answer;
      incorrectAnswers = question.incorrect_answers;
      answers = [correctAnswer, ...incorrectAnswers];
      answers.forEach((el, i) => {
        const random = Math.floor(Math.random() * 4);
        [answers[i], answers[random]] = [answers[random], answers[i]]
      })
    }


    return (
      <div className="app">
        {/* ===================================================================================== */}
        {/* When User is logged in, and gameMode=false, render UserInfo, Stats, and GameContainer */}
        {/* ===================================================================================== */}
        {!gameMode ?
          <React.Fragment>
            <button onClick={() => startGame()}>Play Game </button>
          </React.Fragment>
          :
          //*================================================================= */}
          //* When User is logged in, and gameMode=true, render GameContainer */}
          //*================================================================= */}
          <React.Fragment>
            <form className='form-tag'>
              <h1 className='question-tag'>Question: {question.question}</h1>
              <input type='radio' name='questions' onChange={this.props.handleChange} value={answers[0]} />{answers[0]}
              <input type='radio' name='questions' onChange={this.props.handleChange} value={answers[1]} />{answers[1]}
              <input type='radio' name='questions' onChange={this.props.handleChange} value={answers[2]} />{answers[2]}
              <input type='radio' name='questions' onChange={this.props.handleChange} value={answers[3]} />{answers[3]}
            </form>
          </React.Fragment>}
        {/* ================================================================= */}
      </div>
    )
  }
}

export default GameContainer;
