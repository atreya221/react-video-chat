import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { Call, CallEnd } from '@material-ui/icons';

import { SocketContext } from '../SocketContext';

const Notifications = () => {
  const { answerCall, call, callAccepted, declineCall } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1 style={{ paddingTop: '30px', color: '#FFFFFF', fontFamily: 'Courgette'}}>{call.name || 'Unknown'} is calling: </h1>
          <Button variant="contained" startIcon={<Call fontSize="40px" />} style={{ marginTop: '25px', paddingLeft : '25px', minWidth: '32px', width: '50px', height: '50px', marginLeft: '20px', backgroundColor: '#12824C', color: '#FFFFFF', borderRadius: '50px'}} onClick={answerCall}></Button>
          <Button variant="contained" startIcon={<CallEnd fontSize="40px" />} style={{ marginTop: '25px', paddingLeft : '25px', minWidth: '32px', width: '50px', height: '50px', marginLeft: '20px', backgroundColor: '#d32f2f', color: '#FFFFFF', borderRadius: '50px'}} onClick={declineCall}></Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
