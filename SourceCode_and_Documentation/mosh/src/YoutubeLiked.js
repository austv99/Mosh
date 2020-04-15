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

    //AUTHENTICATION
    
    // return (<div >
    //             <button className="googleBtn" type="button">
    //                 Sign in With Google
    //             </button>
    //         </div>);

    

    const options = {
        part:'contentDetails',
        key:userKey,
        client_id:clientId,
        mine:true
    }
    const query = Object.keys(options).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(options[k])).join('&');
    const URL = ' https://www.googleapis.com/youtube/v3/channels?' + query;
    var options2 = {
        part:'contentDetails',
        key:userKey,
        access_token:'',
        playlistId:'',
        maxResults:10
    }
    useEffect(() => {
        var access_token = document.getElementById("channel-data").innerHTML
        options2.access_token=access_token
        console.log(params)
        // GET request using fetch inside useEffect React hook
        
        fetch(URL)
        .then(response => response.json())
        .then(responseData => {
            //console.log(responseData);
            if (responseData.items == null){
                console.log(responseData)
            } else {
                var likedPlaylist = (responseData.items).map(a => a.contentDetails.relatedPlaylists.likes);
                console.log(likedPlaylist);
                
                options2.playlistId = likedPlaylist;
            }
        }).then(() =>{
            var query1 = Object.keys(options2).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(options2[k])).join('&');
            var URL1 = ' https://www.googleapis.com/youtube/v3/playlistItems?' + query1;
            console.log(URL1)
            fetch(URL1)
            .then(response => response.json())
            .then(responseData => {
                if (responseData.items == null){
                    console.log(responseData)
                } else {
                    var likedVideos = (responseData.items).map(a => a.contentDetails.videoId);
                    console.log(likedVideos);  
                    setResult(likedVideos[0]) 
                    
                }
            })
        });
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    },[params]);
    return (
        <div className="liked_videos">
            {result.length === 0 ? (
				<h1>Nothing to see here ;)</h1>
			) : (result)}
        </div>
    );
};
export default YoutubeLiked;