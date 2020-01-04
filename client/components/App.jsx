import React, { Component } from 'react';
import UserInfo from './UserInfo.jsx';
import Stats from './Stats.jsx';
import GameContainer from './GameContainer.jsx';

class App extends Component {
  render () {

    return (
      <div>
        <UserInfo />
        <Stats />
        <GameContainer />
      </div>
    )
  }
}

export default App;
