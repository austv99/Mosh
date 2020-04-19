import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import MainApp from "./mainApp"
import * as serviceWorker from './serviceWorker';
import App from "./components/Youtube/YoutubeDiscoverMusic"
/*global gapi */
ReactDOM.render(<MainApp/>, document.getElementById('root'));
const script = document.createElement("script");
script.src = "https://apis.google.com/js/api.js";
script.onload = () => {
    gapi.load('client:auth2', () => {
        gapi.client.setApiKey("AIzaSyBhklDEhDYrLwf5mMkLKsA34Btqjpj8S7k");
        gapi.client.load('youtube', 'v3', () => {
        })
    });

}
document.body.appendChild(script);
// import * as firebase from 'firebase';
// import firebaseconfig from './firebase.config';
// firebase.initializeApp(firebaseconfig);

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
