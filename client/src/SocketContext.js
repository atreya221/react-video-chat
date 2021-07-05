import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:5000/');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [idToCall, setIdToCall] = useState('');

  let [peer, setPeer] = useState({});
  //let [peer2, setPeer2] = useState({});

  const location = window.location;
  let myVideo = useRef();
  let userVideo = useRef();
  const connectionRef = useRef();
  //const userStream = useRef();

  //let micSwitch = true;
  const [videoSwitch, setVideoSwitch] = useState();
  const [screenSwitch, setScreenSwitch] = useState();
  const username = window.localStorage.getItem("user");
  //console.log(username);
 
  socket.emit('send-username', username);

  function shareScreenOn() {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then(mediaStream => {
      const screenTrack = mediaStream.getTracks()[0];
      mediaStream.current = screenTrack;
      myVideo.current.srcObject = mediaStream;
      setStream(mediaStream);
      setScreenSwitch(true);
      if(callAccepted && !callEnded){
        peer.addStream(mediaStream);
        socket.emit("screenShare", {userToCall : idToCall});
      }
    })
  }

  function shareScreenOff() {
    stream.getTracks().forEach(track => track.stop());
    
    if(videoSwitch){
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        const screenTrack = stream.getVideoTracks()[0];
        stream.current = screenTrack;
        myVideo.current.srcObject = stream;
        setStream(stream);
      })
    }
    else{
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        const screenTrack = stream.getVideoTracks()[0];
        stream.current = screenTrack;
        myVideo.current.srcObject = stream;
        stream.getVideoTracks()[0].enabled = false;
        setStream(stream);
      })
    }
    setScreenSwitch(false);
  }

  function switchVideoOff(){
    if(!screenSwitch) stream.getVideoTracks()[0].enabled = false;
    setVideoSwitch(false);
  }
  
  function switchVideoOn(){
    if(!screenSwitch) stream.getVideoTracks()[0].enabled = true;
    setVideoSwitch(true);
  }

  function switchMicOff(){
    if(stream != null && stream.getAudioTracks().length > 0){
      stream.getAudioTracks()[0].enabled = false;
    }  
  }
  
  function switchMicOn(){
    if(stream != null && stream.getAudioTracks().length > 0){
      stream.getAudioTracks()[0].enabled = true;
    }  
  }
  
  useEffect(() => {
    if(location.pathname === '/app'){
      if(!screenSwitch){
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((currentStream) => {
            setStream(currentStream);
            myVideo.current.srcObject = currentStream;
          });
      }

      socket.on('me', (id) => setMe(id));

      socket.on('callUser', ({ from, name: callerName, signal }) => {
        window.localStorage.removeItem("state");
        setCall({ isReceivingCall: true, from, name: callerName, signal });
      });

      socket.on("screenShare", () => {
        setScreenSwitch(true);
        console.log(`hemlo`);
      });

      if(callAccepted && !callEnded && screenSwitch)
      {
        console.log(`bai bai`);
        peer.on("mediaStream", (stream) => {
          userVideo.current.srcObject = stream;
        });
      }
    }
  }, [location, peer, callAccepted, callEnded, screenSwitch]);

  const answerCall = () => {
    setCallAccepted(true);

    peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
    setPeer(peer);
  };

  const callUser = (id) => {
    peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name: username });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', ({signal, name}) => {
      window.localStorage.removeItem("state");
      setCallAccepted(true);
      setCall({to: id});
      setIdToCall(id);
      peer.signal(signal);
    });

    connectionRef.current = peer;
    setPeer(peer);
  };

  const leaveCall = () => {
    window.localStorage.removeItem("state");
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
    
  };
  const declineCall = () => {
    window.location.reload();
  }

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      switchVideoOff,
      switchVideoOn,
      switchMicOn,
      switchMicOff,
      declineCall,
      shareScreenOn,
      shareScreenOff,
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
/*
import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [mediaStream, setMediaStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  let myVideo = useRef();
  let userVideo = useRef();
  let myMedia = useRef();
  let userMedia = useRef();
  const connectionRef = useRef();

  let micSwitch = true;
  const [videoSwitch, setVideoSwitch] = useState();
  const [screenSwitch, setScreenSwitch] = useState(false);
  
  function shareScreenOn() {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then(mediaStream => {
      setMediaStream(mediaStream);
      setScreenSwitch(true);
      myMedia.current.srcObject = mediaStream;
    })
  } 

  function shareScreenOff() {
    mediaStream.getTracks().forEach(track => track.stop());
    setScreenSwitch(false);
  }

  function switchVideoOff(){
    stream.getVideoTracks()[0].enabled = false;
    setVideoSwitch(false);
  }
  
  function switchVideoOn(){
    stream.getVideoTracks()[0].enabled = true;
    setVideoSwitch(true);
  }

  function switchMicOff(){
    if(stream != null && stream.getAudioTracks().length > 0){
      stream.getAudioTracks()[0].enabled = false;
    }  
  }
  
  function switchMicOn(){
    if(stream != null && stream.getAudioTracks().length > 0){
      stream.getAudioTracks()[0].enabled = true;
    }  
  }
  
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream, mediaStream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
        userVideo.current.srcObject = currentStream;
    });

    peer.on('mediaStream', (currentMediaStream) => {
        userVideo.current.srcObject = currentMediaStream;
  });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream, mediaStream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.on('mediaStream', (currentMediaStream) => {
      userMedia.current.srcObject = currentMediaStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    
    connectionRef.current.destroy();
    window.location.reload();
    
  };

  const declineCall = () => {
    window.location.reload();
  }

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      myMedia,
      userMedia,
      stream,
      mediaStream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      switchVideoOff,
      switchVideoOn,
      switchMicOn,
      switchMicOff,
      declineCall,
      shareScreenOn,
      shareScreenOff,
      screenSwitch,
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };*/