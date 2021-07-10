import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import { Duo } from '@material-ui/icons';
import Axios from "axios";
import "./styles.css";

export default function Registration() {
  let history = useHistory();
  const [nameReg, setNameReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [RegistrationStatus, setRegistrationStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:5000/register", {
      name: nameReg,
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      if (response.data.message) {
        setRegistrationStatus(response.data.message);
      }
    });
  };
  

  const login = () => {
    Axios.post("http://localhost:5000/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
        window.localStorage.setItem('user', response.data[0].username);
        window.localStorage.setItem('name', response.data[0].name);
        window.location.pathname = "/app";
        /*history.replace("/app");*/
        window.location.href = "/app";
      }
    });
  };

  let logoutStatus = 'false';
  const queryParams = new URLSearchParams(window.location.search);
  logoutStatus = queryParams.get('logout');
  //console.log(logoutStatus);
  useEffect(() => {
    
    Axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn === true && logoutStatus !== 'true') {
        setLoginStatus(response.data.user[0].username);
        console.log(response.data);
        window.location.pathname = "/app";
        /*history.replace("/app");*/
        window.location.href = "/app";
      }
      
    });

    
  }, [history, logoutStatus]);

  return (
    <div className="App">
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

        <div>
          <div class="row row-style" style={{width: '100%', display: 'flex', marginTop: '100px'}}>
            <div class="col-md-6 registration" style={{width: '50%'}}>        
            <center>
              <h2 style={{fontSize:'20px', color: '#FFFFFF', fontFamily: 'Varela Round', marginBottom: '10px'}}><strong>New to the app?</strong></h2>
              <h2 style={{fontSize:'35px', color: '#FFFFFF', fontFamily: 'Varela Round', marginBottom: '30px'}}><strong>SIGN UP</strong></h2>

              <div class="form-group" style={{margin: '10px'}}>
                <input
                  type="text"
                  placeholder="Name..." 
                  onChange={(e) => {
                    setNameReg(e.target.value);
                  }}
                />
              </div>

              <div class="form-group" style={{margin: '10px'}}>
                <input
                  type="text"
                  placeholder="Username..."
                  onChange={(e) => {
                    setUsernameReg(e.target.value);
                  }}
                />
              </div>

              <div class="form-group" style={{margin: '10px'}}>
                <input
                  type="Password"
                  placeholder="Password..."
                  onChange={(e) => {
                    setPasswordReg(e.target.value);
                  }}
                />
              </div>

              <div class="form-group" style={{margin: '10px'}}>
                <Button variant="contained" style={{backgroundColor: '#9e9e9e', color: '#000000', fontSize: '16px', height: '40px', width: '100px', class: "btn btn-primary"}} onClick={register}> Register </Button>
              </div>
              <h1 style={{fontSize:'25px', color: '#FFFFFF', fontFamily: 'Varela Round'}}>{RegistrationStatus}</h1>
              </center>
            </div>
            

            <div className="col-md-6 login" style={{width: '50%'}}>
            <center>
            <h2 style={{fontSize:'20px', color: '#FFFFFF', fontFamily: 'Varela Round', marginBottom: '10px'}}><strong>Already have an account?</strong></h2>
            <h2 style={{fontSize:'35px', color: '#FFFFFF', fontFamily: 'Varela Round', marginBottom: '30px'}}><strong>LOG IN</strong></h2>
            <div class="form-group" style={{margin: '10px'}}>
              <input
                type="text"
                placeholder="Username..."
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              </div>
              <div class="form-group" style={{margin: '10px'}}>
              <input  
                type="password"
                placeholder="Password..."
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              </div>
              <div class="form-group" style={{margin: '10px'}}>
                <Button variant="contained" style={{backgroundColor: '#9e9e9e', color: '#000000', fontSize: '16px', height: '40px', width: '80px', class: "btn btn-primary"}} onClick={login}> Login </Button>
              </div>
              <h1 style={{fontSize:'25px', color: '#FFFFFF', fontFamily: 'Varela Round'}}><center>{loginStatus}</center></h1>
              </center>
            </div>
          </div>
        </div>
    </div>
  );
}