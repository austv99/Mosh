import fire from './config/fire';
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Discover from "./containers/Discover";
import Homescreen from "./containers/Homescreen";
import Landing from "./containers/Landing";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from "firebase"
//


class App extends Component {
  constructor() {
    super();
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
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }
  render() {
    return(
      <div className="App">
          <Router>
            <Route exact path="/"><Landing/></Route>
            <Route path="/discover"><Discover/></Route>
            <Route path="/home"><Homescreen/></Route>
            <Route path="/signin"><SignIn/></Route>
            <Route path="/signup"><SignUp/></Route>
          </Router>

      </div>

    )
  }
}
 export default App;
 // <Router>
 //   <Route path="/signin"><SignIn/></Route>
 //   <Route path="/signup"><SignUp/></Route>
 // </Router>
 //   <Router>
 //     <Route exact path="/"><Landing/></Route>
 //     <Route path="/discover"><Discover/></Route>
 //     {this.state.user ?(<Homescreen/>) :(<Landing/>)}
 //   </Router>

//
// uiConfig = {
//   signInFlow: "popup",
//   signinOptions: [
//     firebase.auth.FacebookAuthProvider.Provider_ID
//   ],
//   callbacks: {
//     signInSuccess : () => false
//   }
// }


  // render(){
  //   return (
  //     <div className="App">

  //     </div>
  //   );
  // }
