import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Discover from "./containers/Discover";
import Homescreen from "./containers/Homescreen";
import Landing from "./containers/Landing";
import Connect from "./containers/Connect";
import Share from "./containers/Share";


function App() {
  return (
    <div className="App">
      <Router>
      <Route exact path="/">
            <Landing/>
        </Route>
        <Route path="/discover">
            <Discover/>
        </Route>
        <Route path="/home/:token">
            <Homescreen/>
        </Route>
        <Route path="/connect">
          <Connect />
        </Route>
        <Route path="/share/:token">
          <Share />
        </Route>
      </Router>
    </div>
  );
}

export default App;