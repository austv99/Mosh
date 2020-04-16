import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAeREgt3YM_FPtwhYnMWF_AijkdYwyykR0",
  authDomain: "mosh-37501.firebaseapp.com",
  databaseURL: "https://mosh-37501.firebaseio.com",
  projectId: "mosh-37501",
  storageBucket: "mosh-37501.appspot.com",
  messagingSenderId: "806342003387",
  appId: "1:806342003387:web:f508ba713ee85e2683f79e",
  measurementId: "G-QVRJRKC8QL"
};

const fire = firebase.initializeApp(config);
export default fire;



 // {this.state.user ? (<Homescreen/>) : (<SignIn/>)}
// this line is for checking log in state
// <Router>
//   <Route exact path="/"><Landing/></Route>
//   <Route path="/discover"><Discover/></Route>
//   <Route path="/home"><Homescreen/></Route>
//   <Route path="/signin"><SignIn/></Route>
//   <Route path="/signup"><SignUp/></Route>
// </Router>
