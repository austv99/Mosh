import firebase from 'firebase/app';
// import auth from 'firebase/auth'
import 'firebase/auth'
import 'firebase/firestore'

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

const uiConfig ={
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks:{ signInSuccessWithAuthResult: () => false }
}

const fire = firebase.initializeApp(config);

export {fire,uiConfig}
