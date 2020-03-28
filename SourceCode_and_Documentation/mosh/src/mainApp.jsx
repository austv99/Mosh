import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Discover from "./containers/Discover";
import Homescreen from "./containers/Homescreen";


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/discover">
            <Discover/>
        </Route>
        <Route path="/" exact>
            <Homescreen/>
        </Route>
      </Router>
    </div>
  );
}

export default App;