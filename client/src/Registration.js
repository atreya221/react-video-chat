import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import "./styles.css";

export default function Registration() {
  let history = useHistory();
  const [nameReg, setNameReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  //const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const register = () => {
    //console.log(usernameReg);
    Axios.post("http://localhost:5000/register", {
      name: nameReg,
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
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
        history.push("/app");
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
        console.log(response.data);
        window.location.pathname = "/app";
        history.push("/app");
      }
    });
  }, [history]);

  return (
    <div className="App">
      <h2><strong><center>Chat-Mate</center></strong></h2>
        <div class="container container-modi">
          <div class="row row-style">
            <div class="col-md-6 registration">
              <center>
              <h2><strong>SIGN UP</strong></h2>

              <div class="form-group">
                <input
                  type="text"
                  placeholder="Name..."
                  onChange={(e) => {
                    setNameReg(e.target.value);
                  }}
                />
              </div>

              <div class="form-group">
                <input
                  type="text"
                  placeholder="Username..."
                  onChange={(e) => {
                    setUsernameReg(e.target.value);
                  }}
                />
              </div>

              <div class="form-group">
                <input
                  type="Password"
                  placeholder="Password..."
                  onChange={(e) => {
                    setPasswordReg(e.target.value);
                  }}
                />
              </div>

              <div class="form-group">
                <button variant="contained" style={{backgroundColor: '#212121', color: '#FFFFFF', fontSize: '16px', height: '40px', width: '80px', class: "btn btn-primary"}} onClick={register}> Register </button>
              </div>
              </center>
            </div>

            <div className="col-md-6">
            <center>
            <h2><strong>LOG IN</strong></h2>
            <div class="form-group">
              <input
                type="text"
                placeholder="Username..."
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              </div>
              <div class="form-group">
              <input
                type="password"
                placeholder="Password..."
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              </div>
              <div class="form-group">
                <button variant="contained" style={{backgroundColor: '#212121', color: '#FFFFFF', fontSize: '16px', height: '40px', width: '80px', class: "btn btn-primary"}} onClick={login}> Login </button>
              </div>
              </center>
            </div>
            <h1>{loginStatus}</h1>
          </div>
        </div>
    </div>
  );
}