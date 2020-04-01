import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Discover from "./containers/Discover";
import Homescreen from "./containers/Homescreen";
import Landing from "./containers/Landing";


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
        <Route path="/home">
            <Homescreen/>
        </Route>
        
      </Router>
    </div>
  );
}

export default App;