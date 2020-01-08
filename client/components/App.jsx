import React, { Component } from "react";
import UserInfo from "./UserInfo.jsx";
import Stats from "./Stats.jsx";
import GameContainer from "./GameContainer.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //ACTUAL DEFAULT
      username: document.cookie.slice(9),
      gameMode: false,
      results: [],
      stats: { gamesPlayed: 0, correctAnswers: 0 },
      correctResponses: [],
      incorrectResponses: [],
      question: {},
      choice: 'none',
      url: "9",

      //MOCK DATA
      // username: document.cookie.slice(9),
      // gameMode: false,
      // results: [
      //   {
      //     category: "General Knowledge",
      //     type: "multiple",
      //     difficulty: "easy",
      //     question: "Which one of these Swedish companies was founded in 1943?",
      //     correct_answer: "IKEA",
      //     incorrect_answers: ["H &; M", "Lindex", "Clas Ohlson"]
      //   },
      //   {
      //     category: "General Knowledge",
      //     type: "multiple",
      //     difficulty: "easy",
      //     question: "Which one of these Swedish companies was founded in 1943?",
      //     correct_answer: "IKEA",
      //     incorrect_answers: ["H &; M", "Lindex", "Clas Ohlson"]
      //   }
      // ],
      // stats: { gamesPlayed: 5, correctAnswers: 12 },
      // correctResponses: [],
      // incorrectResponses: [],
      // question:{},
      // choice: 'none',
    };

    // Function binds=================================================
    this.startGame = this.startGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);
  }

  // Wait until server is working to test correct data
  componentDidMount() {
    console.log('MOUNTED');
    fetch(`/trivia/${this.state.username}/${this.state.url}`)
      .then(res => res.json())
      .then(data => {
        const { username, results, gamesPlayed, correctAnswers } = data;
        this.setState({
          username,
          results,
          stats: { gamesPlayed, correctAnswers },
        })
      })
      .catch((err) => { console.log(err); })
  }

  onHandleClick(e) {
    this.setState({ url: e.target.value })
  }
  startGame() {
    if (!this.state.gameMode) {
      fetch(`/trivia/${this.state.username}/${this.state.url}`)
        .then(res => res.json())
        .then(data => {
          const { results, gamesPlayed, correctAnswers } = data;
          const gameMode = true;
          const question = results.pop();
          this.setState({
            gameMode,
            results,
            question,
            stats: { gamesPlayed, correctAnswers },
          })
        })
        .catch(err => { console.log(err); })
    } else {
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
    fetch('/profile/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        correctAnswers: this.state.correctResponses.length,
      }),
    }).then(res => res.json())
      .then(data => {
        const { gamesPlayed, correctAnswers } = data;
        this.setState({
          stats: { gamesPlayed, correctAnswers },
        })
      })
      .catch(err => {
        console.log(err);
      })
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

            <select className="custom-select" onChange={this.onHandleClick}>
              <option value="9" className="topicButton">General Knowledge (default) </option>
              <option value="10" > Books</option>
              <option value="11" > Film</option>
              <option value="12" > Music</option>
              <option value="13" > Musicals and Theater</option>
              <option value="14" > Television</option>
              <option value="15" > Video Games</option>
              <option value="16" > Board Games</option>
              <option value="17" > Science and Nature</option>
              <option value="18" > Computers</option>
              <option value="19" > Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21" > Sports</option>
              <option value="22" > Geography</option>
              <option value="23" > History</option>
              <option value="24">Politics</option>
              <option value="25" > Art</option>
              <option value="26" > Celebrities</option>
              <option value="27" > Animals</option>
            </select>
            <button onClick={() => this.startGame()}>Play Game </button>
          </React.Fragment>
          :
          //*================================================================= */}
          //* When User is logged in, and gameMode=true, render GameContainer */}
          //*================================================================= */}
          <React.Fragment>
            <GameContainer
              onHandleClick={this.onHandleClick}
              choice={this.state.choice}
              results={this.state.results}
              gameMode={this.state.gameMode}
              question={this.state.question}
              handleChange={this.handleChange} />
          </React.Fragment>}
        {/* ================================================================= */}
      </div>
    );
  }
}

export default App;
