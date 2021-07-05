import React, { useContext, useState } from 'react';
import { AppBar } from '@material-ui/core';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone } from '@material-ui/icons';

import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '100%',
    margin: '0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid black',
  },
 }));

const Options = ( { children } ) => {
  const { me, callAccepted, callEnded, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const classes = useStyles();
  const name = window.localStorage.getItem("name");

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography style= {{ fontFamily: 'Courgette', backgroundColor: '#212121', color: '#FFFFFF'}} variant="h3" align="center">ChatMate</Typography>
      </AppBar>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item className={classes.padding}>
              <Typography style= {{ display: "inline-block", padding: "10px", backgroundColor: '#FFFFFF', color: '#000000'}} gutterBottom variant="h6">Welcome {name}</Typography>
              <CopyToClipboard text={me} className={classes.margin}>
                <Button variant="contained" color="primary" fullWidth startIcon={<Assignment />}>
                  Copy your username
                </Button>
              </CopyToClipboard>
            </Grid>

            <Grid item className={classes.padding}>
              <Typography style= {{ display: "inline-block", padding: "10px", backgroundColor: '#212121', color: '#FFFFFF'}} gutterBottom variant="h6">Make a Call</Typography>
              <TextField label="user to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              {!callEnded && callAccepted ? (
                <Button variant="contained" style={{backgroundColor: '#388e3c', color: '#FFFFFF'}}  fullWidth className={classes.margin}>
                  Connected
                </Button>
              ) : (
                <Button  variant="contained" style={{backgroundColor: '#388e3c', color: '#FFFFFF'}} startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)} className={classes.margin}>
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
          {children}
        </form>
      </Paper>
    </Container>
  )
}

export default Options;