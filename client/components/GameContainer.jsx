import React, { Component } from 'react';

class GameContainer extends Component {
  render() {
    let gameMode = this.props.gameMode;
    let startGame = this.props.startGame;
    let question = this.props.question;

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
          {question.question}
        </React.Fragment>}
      {/* ================================================================= */}
    </div>
    )
  }
}

export default GameContainer;

