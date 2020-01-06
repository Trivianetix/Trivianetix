import React, { Component } from "react";
import UserInfo from "./UserInfo.jsx";
import Stats from "./Stats.jsx";
import GameContainer from "./GameContainer.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //ACTUAL DEFAULT
      // username: '',
      // gameMode: false,
      // results: [],
      // stats: {},
      //      stats: {gamesPlayed: 5, correctAnswers: 12},
      // correctResponses: [],
      // incorrectResponses: [],

      //MOCK DATA
      logged_in: true,
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
        }
      ],
      stats: { gamesPlayed: 5, correctAnswers: 12 },
      correctResponses: [],
      incorrectResponses: []
    };
  }

  // Wait until server is working to test correct data
  // componentOnMount(){
  //   fetch('/profile')
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

  render() {
    return (
      <div className="app">
        {/* ================================================================= */}
        {/* When User is logged in, render UserInfo, Stats, and GameContainer */}
        {/* ================================================================= */}
        {this.state.logged_in ?
          <React.Fragment>
            <UserInfo username={this.state.username} gameMode={this.state.gameMode} />
            <Stats stats={this.state.stats} gameMode={this.state.gameMode} />
            <GameContainer results={this.state.results} gameMode={this.state.gameMode} />
          </React.Fragment>
          :
          null}
        {/* ================================================================= */}
      </div>
    );
  }
}

export default App;
