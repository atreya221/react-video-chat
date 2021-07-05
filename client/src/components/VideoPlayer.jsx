import React, { useContext } from 'react'
import { Grid, Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { SocketContext } from '../SocketContext'

const useStyles = makeStyles((theme) => ({
    video: {
      [theme.breakpoints.down('xs')]: {
        width: '300px',
      },
    },
    gridContainer: {
      display: 'flex',
      position: 'absolute',
      top: '100px',
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
      margin: '20px',
    },
    paper: {
      padding: '10px',
      border: '2px solid black',
      margin: '10px',
    },
  })
);

  
const VideoPlayer = () => {
  const { callAccepted, myVideo, userVideo, myMedia, userMedia, callEnded, stream, mediaStream, call, screenSwitch } = useContext(SocketContext);
  const classes = useStyles();
  const name = window.localStorage.getItem("user");
  
  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
          <Paper className={classes.paper}>
              <Grid item>
                <center>
                  <Typography style={{ fontFamily: 'Courgette', textAlign: 'center', midWidth: '0'}} variant="h5" gutterBottom>{ name || 'Me' }</Typography>
                </center>
                <video onContextMenu="return false;" controls playsInline muted ref={myVideo} autoPlay className={classes.video} />
              </Grid>
          </Paper>
        )
      }
      
      {callAccepted && !callEnded && (
          <Paper className={classes.paper}>
              <Grid item>
                <center>
                  <Typography style={{ fontFamily: 'Courgette' }} variant="h5" gutterBottom>{ call.name || call.to || 'Unknown' }</Typography>
                </center>  
                <video onContextMenu="return false;" controls playsInline ref={userVideo} autoPlay className={classes.video} />
              </Grid>
          </Paper>
         )
      }

      {mediaStream && screenSwitch && (
          <Paper className={classes.paper}>
              <Grid item>
                <center>
                  <Typography style={{ fontFamily: 'Courgette', textAlign: 'center', midWidth: '0'}} variant="h5" gutterBottom>{ name + 's Screen' }</Typography>
                </center>
                <video onContextMenu="return false;" controls playsInline muted ref={myMedia} autoPlay className={classes.video} />
              </Grid>
          </Paper>
        )
      }

      {mediaStream && callAccepted && !callEnded && (
          <Paper className={classes.paper}>
              <Grid item>
                <center>
                  <Typography style={{ fontFamily: 'Courgette', textAlign: 'center', midWidth: '0'}} variant="h5" gutterBottom>{ (call.name|| 'Unknown') + 's Screen' }</Typography>
                </center>
                <video onContextMenu="return false;" controls playsInline muted ref={userMedia} autoPlay className={classes.video} />
              </Grid>
          </Paper>
        )
      } 
    </Grid>
  );
};

export default VideoPlayer;

