import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Duo } from '@material-ui/icons';

import VideoPlayer from './components/VideoPlayer';
import Notifications from './components/Notifications';
import ButtonBar from './components/ButtonBar';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
}));

const App = () => {
  const classes = useStyles();  

  return (
    <div className={classes.wrapper}>
      <h1 style={{fontSize:'60px', color: '#FFFFFF', fontFamily: 'Akaya Kanadaka'}}><strong><center>HOWZDATT
      <Button
        style={{ 
          margintop: '10px', 
          paddingLeft : '18px', 
          minWidth: '30px', 
          width: '50px', 
          height: '50px', 
          marginLeft: '20px', 
          marginRight: '20px', 
          backgroundColor: '#000000',   
          color: '#FFFFFF', 
          borderRadius: '50px',
          float: 'left',
          position: 'absolute',
          top: '8px',
          left: '0px',
        }}
        disabled={true}
        startIcon={<Duo style={{fontSize:50}}/>} >
      </Button>
      </center>
      </strong></h1>
      <Notifications />
      <VideoPlayer />
      <ButtonBar />
    </div>
  );
}

export default App;
