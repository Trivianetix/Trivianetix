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
<<<<<<< HEAD
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
=======
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
          <div dangerouslySetInnerHTML={{__html: question.question}}></div>
          <form>
            <label htmlFor='A' dangerouslySetInnerHTML={{__html: answers[0]}}></label>
            <input type='radio' name='questions' id='A' onChange={this.props.handleChange} value={answers[0]}/>
            <label htmlFor='B' dangerouslySetInnerHTML={{__html: answers[1]}}></label>
            <input type='radio' name='questions' id='B' onChange={this.props.handleChange} value={answers[1]}/>
            <label htmlFor='C' dangerouslySetInnerHTML={{__html: answers[2]}}></label>
            <input type='radio' name='questions' id='C' onChange={this.props.handleChange} value={answers[2]}/>
            <label htmlFor='D' dangerouslySetInnerHTML={{__html: answers[3]}}></label>
            <input type='radio' name='questions' id='D' onChange={this.props.handleChange} value={answers[3]}/>
          </form>
        </React.Fragment>}
      {/* ================================================================= */}
    </div>
>>>>>>> 930c958c9f94da4f2fceb8ad0282a577abf0103d
    )
  }
}

export default GameContainer;
