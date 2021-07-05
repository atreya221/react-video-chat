 
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import Registration from "./Registration";

function AppMain() {
  return (
    <Router>
      <Route path="/registration" exact render={(props) => <Registration />} />
      <Route path="/app">
        <App />
      </Route>
    </Router>
  );
}

export default AppMain;