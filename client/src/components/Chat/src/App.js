import React, { Component } from 'react';
import './App.css';
import Messages from "./Messages";
import Input from "./Input";
import { Typography } from '@material-ui/core';

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class ChatApp extends Component { 
  userToChat;
  state = {
    messages: [],
    member: {
      username: window.localStorage.getItem("user"),
      color: randomColor(),
    }
  }

  constructor() {
    super();
    this.state = JSON.parse(window.localStorage.getItem('state')) || {
      messages: [],
      member: {
        username: window.localStorage.getItem("user"),
        color: randomColor(),
      }
    }
    this.drone = new window.Scaledrone("bV9BflM5njIqoQRS", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      //member.id = this.drone.clientId;
      member.id = window.localStorage.getItem("user");
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
      window.localStorage.setItem('state', JSON.stringify({...this.state}));
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Typography style= {{ fontFamily: 'Courgette', backgroundColor: '#212121', color: '#FFFFFF'}} variant="h3" align="center">ChatMate</Typography>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}

export default ChatApp;