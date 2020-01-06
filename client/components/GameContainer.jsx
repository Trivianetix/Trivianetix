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
      console.log('question', question);
      correctAnswer = question.correct_answer;
      incorrectAnswers = question.incorrect_answers;
      answers = [correctAnswer, ...incorrectAnswers];
      answers.forEach((el, i) => {
        const random = Math.floor(Math.random()*4);
        [answers[i], answers[random]] = [answers[random], answers[i]]
      })
      console.log('correct', correctAnswer);
    }


    return (
      <div className="app">
      {/* ===================================================================================== */}
      {/* When User is logged in, and gameMode=false, render UserInfo, Stats, and GameContainer */}
      {/* ===================================================================================== */}
      {!gameMode ?
        <React.Fragment>
          <button onClick={()=> startGame() }>Play Game </button>
        </React.Fragment>
        :
      //*================================================================= */}
      //* When User is logged in, and gameMode=true, render GameContainer */}
      //*================================================================= */}
        <React.Fragment>
          <p>Question: {question.question}</p>
          <input type='radio' name='size' />{answers[0]}
          <input type='radio' name='size' />{answers[1]}
          <input type='radio' name='size' />{answers[2]}
          <input type='radio' name='size' />{answers[3]}
        </React.Fragment>}
      {/* ================================================================= */}
    </div>
    )
  }
}


// <form>

// </form>

// let answerChoices = [...incorrectAnswers, correctAnswer].map((el, i) => {
//   const random = Math.floor(Math.random * 4);
//   [answerChoices[i], answerChoices[random]] = [answerChoices[random], answerChoices[i]];
//   return el;
// })

export default GameContainer;
