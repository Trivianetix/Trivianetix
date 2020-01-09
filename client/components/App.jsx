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
      choice: 'none'

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
  }

  // Wait until server is working to test correct data
  componentDidMount() {
    console.log('MOUNTED');
    fetch(`/trivia/${this.state.username}`)
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

  startGame() {
    if (!this.state.gameMode) {
      fetch(`/trivia/${this.state.username}`)
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
    console.log('e.target ', e.target)
    console.log('query selector ', document.querySelector("#buttonc"))
    console.log('a value?????', document.querySelector("#buttona").firstChild.defaultValue)
    console.log('b value?????', document.querySelector("#buttonb").firstChild.defaultValue)
    console.log('c value?????', document.querySelector("#buttonc").firstChild.defaultValue)
    console.log('d value?????', document.querySelector("#buttond").firstChild.defaultValue)
    let gameMode = this.state.gameMode;
    const choice = e.target.value;
    const correct = this.state.question.correct_answer;
    const correctResponses = [...this.state.correctResponses];
    const incorrectResponses = [...this.state.incorrectResponses];
    console.log('button value', e.target.value);
    console.log('correct', correct);
    if (choice === correct) {
      document.getElementById(e.target.labels[0].id).style.backgroundColor = 'green';
      correctResponses.push(this.state.question)
    } else {
      incorrectResponses.push(this.state.question);
      document.getElementById(e.target.labels[0].id).style.backgroundColor = 'red';

      if(document.querySelector("#buttona").firstChild.defaultValue === correct) {
        document.getElementById('buttona').style.backgroundColor = 'green';
      }
      if(document.querySelector("#buttonb").firstChild.defaultValue === correct) {
        document.getElementById('buttonb').style.backgroundColor = 'green';
      }
      if(document.querySelector("#buttonc").firstChild.defaultValue === correct) {
        document.getElementById('buttonc').style.backgroundColor = 'green';
      }
      if(document.querySelector("#buttond").firstChild.defaultValue === correct) {
        document.getElementById('buttond').style.backgroundColor = 'green';
      }
    }



    e.target.checked = false;
    setTimeout((e) => {
      document.getElementById('buttona').style.backgroundColor = '';
      document.getElementById('buttonb').style.backgroundColor = '';
      document.getElementById('buttonc').style.backgroundColor = '';
      document.getElementById('buttond').style.backgroundColor = '';

      if (this.state.results.length > 0) {
        this.startGame();
      }
      else {
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
      , 2000)
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
              handleChange={this.handleChange} />
          </React.Fragment>}
        {/* ================================================================= */}
      </div>
    );
  }
}

export default App;
