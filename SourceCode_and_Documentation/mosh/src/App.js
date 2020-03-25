import React from 'react';
import logo from './logo.svg';
//import { Router, Link } from "@reach/router";
import './App.css';
import YoutubeResult from './YoutubeResult';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        
        <YoutubeResult />
      </header>
    </div>
  );
}

export default App;
