import {fire} from './config/fire';
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Discover from "./containers/Discover";
import Homescreen from "./containers/Homescreen";
import Landing from "./containers/Landing";
import Connect from "./containers/Connect";
import Share from "./containers/Share";
import firebase from 'firebase';

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
        console.log(firebase.auth.AuthCredential.toJSON);
        console.log(user);
        this.setState({ user });
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
            {this.state.user === null ? <Landing/> : <Redirect to="/connect"/>}
          </Route>
          <Route path="/discover">
            {this.state.user !== null ? <Discover/> : <Redirect to="/"/>}
          </Route>
          <Route path="/home">
            {/* <Homescreen/> */}
            {this.state.user !== null ? <Homescreen/> : <Redirect to="/"/>}
          </Route>
          <Route path="/connect">
            {/* //<Connect/> */}
            <Connect/>
            {/* {this.state.user !== null ? <Connect/> : <Redirect to="/"/>} */}
          </Route>
          <Route path="/share">
            {this.state.user !== null ? <Share/> : <Redirect to="/"/>}
          </Route>
        </Router>
      </div>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <Router>
//       <Route exact path="/">
//             <Landing/>
//         </Route>
//         <Route path="/discover">
//             <Discover/>
//         </Route>
//         <Route path="/home/token">
//             <Homescreen/>
//         </Route>
//         <Route path="/connect">
//           <Connect />
//         </Route>
//         <Route path="/share/token">
//           <Share />
//         </Route>
//       </Router>
//     </div>
//   );
// }

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
