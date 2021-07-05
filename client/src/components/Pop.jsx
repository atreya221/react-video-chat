import React from 'react';
import PopUp from "./PopUp";
import { Button } from '@material-ui/core'
import { ContactPhone } from '@material-ui/icons';

export default class Pop extends React.Component {
  state = {
    seen: false
  };
  togglePop = () => {
    this.setState({
      seen: !this.state.seen
    });
  };

  render() {
    return (
      <div style={{display:'inline-block'}}>
      <div className="btn" onClick={this.togglePop}>
      <Button variant='contained' style={{ margintop: '5px', paddingLeft : '26px', minWidth: '30px', width: '50px', height: '50px', marginLeft: '20px', backgroundColor: '#000000', color: '#FFFFFF', borderRadius: '50px'}} startIcon={<ContactPhone style={{fontSize:25}} />} ></Button>
      </div>
      {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
      </div>
    );
  }
}