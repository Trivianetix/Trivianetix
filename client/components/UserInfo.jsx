import React, { Component } from 'react';

class UserInfo extends Component {
  render() {
    const username = this.props.username
    return (
      <div>
        <p>How's it going {this.props.username}?</p>
      </div>
    )
  }
}

export default UserInfo;
