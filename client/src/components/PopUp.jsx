import React, { Component } from "react";
import Options from './Options';
import { HighlightOff } from '@material-ui/icons';
import { Button } from '@material-ui/core';

export default class PopUp extends Component {
  handleClick = () => {
    this.props.toggle();
  };

  render() {
    return (
      <div className="modal">
        <div className="modal_content">
          <Button className="close" style={{minWidth: '30px'}} onClick={this.handleClick} startIcon={<HighlightOff style={{width: 30, fontSize:30}}/>}>
          </Button>
          <Options />
        </div>
      </div>
    );
  }
}