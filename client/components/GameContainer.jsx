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
            <div className='question-app'>
              <div className='question-tag' dangerouslySetInnerHTML={{ __html: question.question }}></div>
              <form className='radio-form'>
                <label className='a' htmlFor='A' dangerouslySetInnerHTML={{ __html: answers[0] }}></label>
                <input type='radio' name='questions' id='A' onChange={this.props.handleChange} value={answers[0]} />
                <label className='b' htmlFor='B' dangerouslySetInnerHTML={{ __html: answers[1] }}></label>
                <input type='radio' name='questions' id='B' onChange={this.props.handleChange} value={answers[1]} />
                <label className='c' htmlFor='C' dangerouslySetInnerHTML={{ __html: answers[2] }}></label>
                <input type='radio' name='questions' id='C' onChange={this.props.handleChange} value={answers[2]} />
                <label className='d' htmlFor='D' dangerouslySetInnerHTML={{ __html: answers[3] }}></label>
                <input type='radio' name='questions' id='D' onChange={this.props.handleChange} value={answers[3]} />
              </form>
            </div>
          </React.Fragment>}
        {/* ================================================================= */}
      </div>
    )
  }
}

export default GameContainer;
