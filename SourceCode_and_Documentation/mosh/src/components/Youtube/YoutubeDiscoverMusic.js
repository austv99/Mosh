/* global gapi */

import React, { Component } from 'react';
import firebase from 'firebase';
import {fire,uiconfig} from '../../config/fire'
import YoutubeLiked from './YoutubeLiked'
var count = 0;
var fb=fire;
var db = fire.firestore();


const API_KEY = 'AIzaSyBhklDEhDYrLwf5mMkLKsA34Btqjpj8S7k';
const CLIENT_ID = '542831090816-nvuicfih0d0ulh87cjinkfrmg1tlfciq.apps.googleusercontent.com'
const AUTH_SCOPES = [
    'email',
    'profile',
    'https://www.googleapis.com/auth/youtube.readonly',
]

const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
];
  /***************************************************************************
   * Initialize Firebase
   */


class App extends Component {
    constructor(props) {
        super(props);
        this.state = ({
          gapiReady: false,
          isSignedIn: false,
          access_token: ''
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

    handleIsSignedIn(isSignedIn) {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: AUTH_SCOPES.join(' '),
        })
        if (isSignedIn) {
            console.log('loaded firebase',count)
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
                //sign in to firebase
                fb.auth().signInWithCredential(credential)
                .then(({user}) => {
                    console.log(user);
                    
                    //Add user data to firebase
                    db.collection("users").doc(user.uid).set({
                        connections: [],
                        displayName: user.displayName,
                        favAlbum: "Placeholder Text for fav album",
                        favArtist: "Placeholder for user's fav artist",
                        interests: ["Placholder 1", "Placeholder 2"],
                        photoURL: user.photoURL,
                        posts: [],
                        comments: [],
                    }, {merge: true}).catch(err => {
                        console.log(err.message);
                    })
                })
                //make api calls from here
                this.setState({isSignedIn:true})
                this.setState({access_token:authResponse.access_token})

            })
        } else {
            console.log('gapi: user is not signed in')
        }
    }

    componentDidMount() {
        this.loadYoutubeApi();
    }

    render() {
        if (this.state.gapiReady) {
            console.log('gapi: client:auth2 loaded', gapi.auth2.getAuthInstance())

            
            if(this.state.isSignedIn === false){
                this.handleIsSignedIn(true)
            }
            //console.log(this.state.access_token)
            // return (
            // <div style={{ color: 'white' }}>
            //     <h1>GAPI is loaded and ready to use.</h1>
            //     {this.state.isSignedIn === false ? (
			// 	    <h2>Not Logged In Yet</h2>
            //     ) : (
            //         <YoutubeLiked access_token={this.state.access_token}></YoutubeLiked>
            //     )
            //     }
                
            // </div>
            // );
            return(
                <div></div>
            );
        } else return (
            //<h1 style={{ color: 'white' }}> Not loaded</h1>
            <div></div>
        )
    }

}
export default App;