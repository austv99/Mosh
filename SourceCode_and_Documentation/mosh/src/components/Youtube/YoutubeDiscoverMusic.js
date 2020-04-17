/* global gapi */

import React, { Component } from 'react';
import firebase from 'firebase';
var count = 0;
const API_KEY = 'AIzaSyBhklDEhDYrLwf5mMkLKsA34Btqjpj8S7k';
const AUTH_SCOPES = [
    'email',
    'profile',
    'https://www.googleapis.com/auth/analytics.readonly',
  ]

  /***************************************************************************
   * Initialize Firebase
   */
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAeREgt3YM_FPtwhYnMWF_AijkdYwyykR0",
    authDomain: "mosh-37501.firebaseapp.com",
    databaseURL: "https://mosh-37501.firebaseio.com",
    projectId: "mosh-37501",
    storageBucket: "mosh-37501.appspot.com",
    messagingSenderId: "806342003387",
    appId: "1:806342003387:web:f508ba713ee85e2683f79e",
    measurementId: "G-QVRJRKC8QL"
}
const CLIENT_ID = '542831090816-nvuicfih0d0ulh87cjinkfrmg1tlfciq.apps.googleusercontent.com'

function handleIsSignedIn(isSignedIn) {
    if (isSignedIn) {
        const fb=''
        console.log('loaded firebase',count)
        //if (!firebase.apps.length) { 
            fb=firebase.initializeApp(FIREBASE_CONFIG)
        //}
        const auth2 = gapi.auth2.getAuthInstance()
        auth2.signIn()
        .then(() => {
            const currentUser = auth2.currentUser.get()
            const profile = currentUser.getBasicProfile()
            console.log('gapi: user signed in!', {
                name: profile.getName(),
                imageURL: profile.getImageUrl(),
                email: profile.getEmail(),
            })
            const authResponse = currentUser.getAuthResponse(true)
            const credential = firebase.auth.GoogleAuthProvider.credential(
                authResponse.id_token,
                authResponse.access_token
            )
            console.log(fb)
            fb.auth().signInWithCredential(credential)
            .then(({ user }) => {
                console.log('firebase: user signed in!', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                })
            })

            // Try to make a request to Google Analytics!
            gapi.client.analytics.management.accounts.list()
            .then((response) => {
                console.log('Google Analytics request successful!')
                if (response.result.items && response.result.items.length) {
                const accountNames = response.result.items.map(account => account.name)
                alert('Google Analytics account names: ' + accountNames.join(' '))
                }
            })
        })
    } else {
        console.log('gapi: user is not signed in')
    }
}
/*
.then(() => { console.log('gapi: client:auth2 loaded', gapi.client) })
            .then(() => {
                return gapi.client.init({
                    apiKey: FIREBASE_CONFIG.apiKey,
                    clientId: CLIENT_ID,
                    scope: AUTH_SCOPES.join(' '),
                })
            })
            .then(() => { console.log('gapi: client initialized') })
            .then(() => { return gapi.client.load('analytics', 'v3') })
            .then(() => { console.log('gapi: analytics v3 loaded', gapi.client.analytics)})
            .then(() => {
                const auth2 = gapi.auth2.getAuthInstance()
                auth2.isSignedIn.listen(handleIsSignedIn)
                handleIsSignedIn(auth2.isSignedIn.get())
                });
         */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = ({
          gapiReady: false,
          run:false
        });
        //this.authListener = this.authListener.bind(this);
      }
    loadYoutubeApi() {
        
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";

        script.onload = () => {
            gapi.load('client:auth2', () => {
                gapi.client.setApiKey(API_KEY);
                gapi.client.load('youtube', 'v3', () => {
                this.setState({ gapiReady: true });
                })
            });
        }


        document.body.appendChild(script);
    }

    componentDidMount() {
        this.loadYoutubeApi();
    }

    render() {
        if (this.state.gapiReady) {
            console.log('gapi: client:auth2 loaded', gapi.auth2.getAuthInstance())
            gapi.client.init({
                apiKey: FIREBASE_CONFIG.apiKey,
                clientId: CLIENT_ID,
                scope: AUTH_SCOPES.join(' '),
              })
            if (this.state.run=== false){
                handleIsSignedIn(true)
                this.setState(true)
            }
            // const auth2 = gapi.auth2.getAuthInstance()
            // const currentUser = auth2.currentUser.get()
            // const profile = currentUser.getBasicProfile()
            // console.log('gapi: user signed in!', {
            //     name: profile.getName(),
            //     imageURL: profile.getImageUrl(),
            //     email: profile.getEmail(),
            // })
            // const authResponse = currentUser.getAuthResponse(true)
            // console.log(authResponse)
            //const credential = firebase.auth.GoogleAuthProvider.credential(
            //    authResponse.id_token,
            //    authResponse.access_token
            //)
            return (
            <h1>GAPI is loaded and ready to use.</h1>
            );
        } else return (
            <h1> Not loaded</h1>
        )
    }

}
export default App;