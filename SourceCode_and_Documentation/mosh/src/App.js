import React from 'react';
import logo from './logo.svg';
//import { Router, Link } from "@reach/router";
import './App.css';
import YoutubeSearch from './YoutubeSearch';
import ScriptsLoad from './ScriptsLoad';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        
        <YoutubeSearch />
      </header>
      <ScriptsLoad/>
    </div>
  );
}

export default App;
