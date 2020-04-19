import {fire} from './config/fire';
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Discover from "./containers/Discover";
import Homescreen from "./containers/Homescreen";
import Landing from "./containers/Landing";
import Connect from "./containers/Connect";
import Share from "./containers/Share";
// import firebase from 'firebase';

import {Redirect} from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log(firebase.auth.AuthCredential.toJSON);
        //console.log(user);
        
        localStorage.setItem('user', user.uid);
        
        this.setState({ user });  
      } else {
        console.log("No user");
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
        <Route exact path="/">
            {this.state.user === null ? <Landing/> : <Redirect to="/home"/>}
          </Route>
          <Route path="/discover">
            {this.state.user !== null ? <Discover/> : <Redirect to="/"/>}
          </Route>
          <Route path="/home">
            {this.state.user !== null ? <Homescreen/> : <Redirect to="/"/>}
          </Route>
          <Route path="/connect">
            {this.state.user !== null ? <Connect/> : <Redirect to="/"/>}
          </Route>
          <Route path="/share">
            {this.state.user !== null ? <Share/> : <Redirect to="/"/>}
          </Route>
        </Router>
      </div>
    )}
}

export default App;