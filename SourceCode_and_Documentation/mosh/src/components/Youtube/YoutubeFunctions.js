/* global gapi */
//https://github.com/lacymorrow/album-art USE THIS FOR ALBUM ART
import firebase from 'firebase';
import {fire} from '../../config/fire'

var count = 0;
//var fb=fire;
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

async function handleIsSignedIn(isSignedIn) {
    if (!isSignedIn) {
        var gapi = window.gapi
        if (gapi === undefined){
            return "undefined"
        }
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: AUTH_SCOPES.join(' '),
        })
        console.log('loaded firebase',count)
        const auth2 = gapi.auth2.getAuthInstance()
        console.log(auth2.isSignedIn.get())
        if (auth2.isSignedIn.get()){
            const currentUser = auth2.currentUser.get()
            const authResponse = currentUser.getAuthResponse(true)
            console.log("already Signed In")
            return "SignedIn"
        } else {
            let r1 = await auth2.signIn()
            .then( async () => {
                console.log("SIGNING IN")
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
                let rr1 = await fire.auth().signInWithCredential(credential)
                .then(({ user }) => {
                    console.log('firebase: user signed in!', {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    })
                }).then(() => {
                    console.log("rerender")

                });
                //console.log(rr1)
                //make api calls from here
            })
            console.log(r1)
            return "SignedIn"
        }
        

    } else {
        console.log('gapi: user is not signed in')
    }
    return "finished"
}
async function getYoutubeData(type){
    var output = []
    var videoId;
    var gapi = window.gapi;
    console.log(gapi)
    if (gapi === undefined){
        return 
    }
    console.log(gapi.auth2.getAuthInstance().currentUser.get())
    const access_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true).access_token
    const YoutubeType = type
    let videoTitles;
    var videoOptions = {
        access_token:access_token,
        key:API_KEY, 
        part:'snippet,id',
        maxResults:10,
        myRating:'like'
    }
    const likedQuery = Object.keys(videoOptions).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(videoOptions[k])).join('&');
    var likedURL = 'https://www.googleapis.com/youtube/v3/videos?' + likedQuery;
    let r2 = await fetch(likedURL)
    .then(response => response.json())
    .then(responseData => {
        console.log(responseData);
        if (responseData.items == null){
            console.log(responseData)
            return "error"
        } else {
            //only grab music from liked list
            videoId = (responseData.items).filter(a => a.snippet.categoryId === "10").map(a => a.id);
            videoTitles = (responseData.items).filter(a => a.snippet.categoryId === "10").map(a => a.snippet.title);
            console.log(videoId);
            console.log(videoTitles)
            console.log(responseData)
            //setResult(videoId[0])
        }
    }).then(async (err) =>{
        let r3;
        //https://developers.google.com/youtube/v3/docs/search/list
        //relatedToVideoId
        //fetch();
        if (err){
            return err
        }
        if (YoutubeType === "tags"){
            async function tags() {
                var output = [];
                // var output = '<br>'
                videoTitles.forEach(item => {
                    output.push(item.split(' -')[0])
                });
                console.log(output)
                return output;
            }
            r3 = tags()
        } else {
            var relatedOptions = {
                key:API_KEY, 
                part:'snippet',
                maxResults:10,
                type:'video',
                relatedToVideoId:videoId[0],
                topicId:'/m/04rlf',
                q:'Official Music Video'
            }
            console.log(videoId[0])
            const relatedQuery = Object.keys(relatedOptions).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(relatedOptions[k])).join('&');
            var relatedURL = 'https://www.googleapis.com/youtube/v3/search?' + relatedQuery;
            r3 = await fetch(relatedURL)
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                if (responseData.items == null){
                    console.log(responseData)
                } else {
                    console.log(YoutubeType)
                    if (YoutubeType === "tags"){
                        var recommendedTitles = (responseData.items).map(a => a.snippet.title);
                        //loop through
                        var output = [];
                        // var output = '<br>'
                        recommendedTitles.forEach(item => {
                            //console.log(item.split(' -'))
                            output.push(item.split(' -')[0])
                            // output += `
                            //     <div>${item.split('-')[0]}, ${item.split('-')[1]}</div>
                            // `;
                        });
                        //var recommendedArtists = recommendedTitles.split('-')[0]
    
                        //remove dupes
                        var uniqueOutput = output.filter((a, b) => output.indexOf(a) === b)
                        console.log(uniqueOutput); 
                        output = uniqueOutput
                        return output
                        //setResult(output)
                    } else {
                        var recommendedTitles = (responseData.items).map(a => a.snippet);
                        console.log(recommendedTitles);
                        var recommendedTitlesId = (responseData.items).map(a => a.id.videoId);
                        console.log(recommendedTitlesId);
                        
                        //setResult(recommendedTitles.join(" , "))
                        //let output = '<br><h4 class="center-align">Recommended Videos</h4>';
                        var output = [];
                        // Loop through videos and append output
                        // recommendedTitlesId.forEach(item => {
                        //     output.push('https://www.youtube.com/watch?v='+item)
                        //     // output += `
                        //     //     <iframe width="auto" height="auto" src="https://www.youtube.com/embed/${item}" frameborder="0" allowfullscreen></iframe>
                        //     // `;
                        // });
                        output = responseData.items
                        return output
                        //setResult(output)
                        // // Output videos
                        // videoContainer.innerHTML = output;
                    }
        
                }
            })
        }
        
        console.log(r3)
        output = r3
    });
    return output
}

export {handleIsSignedIn,getYoutubeData};