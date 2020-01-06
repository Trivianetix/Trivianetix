import React, { Component } from "react";
import UserInfo from "./UserInfo.jsx";
import Stats from "./Stats.jsx";
import GameContainer from "./GameContainer.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //ACTUAL DEFAULT
      // username: document.cookie something something something,
      // gameMode: false,
      // results: [],
      // stats: {},
      //      stats: {gamesPlayed: 5, correctAnswers: 12},
      // correctResponses: [],
      // incorrectResponses: [],
      // question:{}

      //MOCK DATA
      username: "JJ",
      gameMode: false,
      results: [
        {
          category: "General Knowledge",
          type: "multiple",
          difficulty: "easy",
          question: "Which one of these Swedish companies was founded in 1943?",
          correct_answer: "IKEA",
          incorrect_answers: ["H &; M", "Lindex", "Clas Ohlson"]
        },
        {
          category: "General Knowledge",
          type: "multiple",
          difficulty: "easy",
          question: "Which one of these Swedish companies was founded in 1943?",
          correct_answer: "IKEA",
          incorrect_answers: ["H &; M", "Lindex", "Clas Ohlson"]
        }
      ],
      stats: { gamesPlayed: 5, correctAnswers: 12 },
      correctResponses: [],
      incorrectResponses: [],
      question:{},
      choice: 'none',
    };

    // Function binds=================================================
    this.startGame = this.startGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

// Wait until server is working to test correct data
  // componentOnMount(){
  //   fetch(`/trivia/${this.state.username})
  //   .then(res => res.json())
  //   .then(data => {
  //     const { username, results, gamesPlayed, correctAnswers}
  //     this.setState({
  //       username,
  //       results,
  //       stats: { gamesPlayed, correctAnswers },
  //     })
  //   })
  // }

  startGame() {
    let gameMode = this.state.gameMode;
    let results = [...this.state.results];
    let question = this.state.question;

    // populate question
    if (results.length > 0) {
      question = results.pop();
      gameMode = true;
    }
    // Updating state
    this.setState({
      gameMode,
      results,
      question,
      choice: 'pending',
    })
  }

  handleChange(e) {
    let gameMode = this.state.gameMode;
    const choice = e.target.value;
    const correct = this.state.question.correct_answer;
    const correctResponses = [...this.state.correctResponses];
    const incorrectResponses = [...this.state.incorrectResponses];
    console.log('button value', e.target.value);
    console.log('correct', correct);
    if (choice === correct) {
      correctResponses.push(this.state.question)
    } else {
      incorrectResponses.push(this.state.question);
    }
    if (this.state.results.length > 0) {
      this.startGame();
    } else {
      this.sendResponse();
      gameMode = false;
    }
    e.target.checked = false;
    this.setState({
      gameMode,
      correctResponses,
      incorrectResponses,
    })
  }

  sendResponse() {
    console.log('Sending Repsonse...');
  }

  render() {


    return (
      <div className="app">
        {/* ===================================================================================== */}
        {/* When User is logged in, and gameMode=false, render UserInfo, Stats, and GameContainer */}
        {/* ===================================================================================== */}
        {!this.state.gameMode ?
          <React.Fragment>
            <UserInfo username={this.state.username} gameMode={this.state.gameMode} />
            <Stats stats={this.state.stats} gameMode={this.state.gameMode} />
            <GameContainer results={this.state.results} gameMode={this.state.gameMode} startGame={this.startGame} />
          </React.Fragment>
          :
        //*================================================================= */}
        //* When User is logged in, and gameMode=true, render GameContainer */}
        //*================================================================= */}
          <React.Fragment>
            <GameContainer
              choice={this.state.choice}
              results={this.state.results}
              gameMode={this.state.gameMode}
              question={this.state.question}
              handleChange={this.handleChange}/>
          </React.Fragment>}
        {/* ================================================================= */}
      </div>
    );
  }
}

export default App;
