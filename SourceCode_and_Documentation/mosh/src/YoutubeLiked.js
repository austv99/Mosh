import React, { useState, useEffect } from 'react';
// Google's OAuth 2.0 endpoint for requesting an access token
var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
var clientId = '542831090816-lvee4kg89nat6q1bsefe2n2itoup4su2.apps.googleusercontent.com';
var redirectUri = 'https://localhost:3000'
var userKey = 'AIzaSyBhklDEhDYrLwf5mMkLKsA34Btqjpj8S7k';
var GoogleAuth;
var SCOPE = 'https://www.googleapis.com/auth/youtube.readonly';

const YoutubeLiked= (params) => {
    
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    //gapi.load('client:auth2', initClient);
    const [result,setResult] = useState("");

    
    useEffect(() => {
        
        
        var access_token = document.getElementById("channel-data").innerHTML
        console.log(params)
        var videoOptions = {
            access_token:access_token,
            key:userKey, 
            part:'snippet',
            maxResults:10,
            myRating:'like'
        }
        const likedQuery = Object.keys(videoOptions).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(videoOptions[k])).join('&');
        var likedURL = 'https://www.googleapis.com/youtube/v3/videos?' + likedQuery;
        fetch(likedURL)
        .then(response => response.json())
        .then(responseData => {
            //console.log(responseData);
            if (responseData.items == null){
                console.log(responseData)
            } else {
                var videotags = (responseData.items).map(a => a.snippet.tags);
                console.log(videotags);
                console.log(responseData)
                setResult(videotags)
            }
        })
        
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    },[params]);
    return (
        <div className="liked_videos">
            {result.length === 0 ? (
				<h1>Type in something to see liked vids ;)</h1>
			) : (result)}
        </div>
    );
};
export default YoutubeLiked;