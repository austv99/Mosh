import React, { useState, useEffect } from 'react';
// Google's OAuth 2.0 endpoint for requesting an access token
//var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
//var clientId = '542831090816-lvee4kg89nat6q1bsefe2n2itoup4su2.apps.googleusercontent.com';
//var redirectUri = 'https://localhost:3000'
var userKey = 'AIzaSyBhklDEhDYrLwf5mMkLKsA34Btqjpj8S7k';
///var GoogleAuth;
//var SCOPE = 'https://www.googleapis.com/auth/youtube.readonly';



const YoutubeLiked= (paramsObj) => {
    //console.log(accessTokenObject)
    //console.log(accessTokenObject.access_token)
    const params = paramsObj.params
    const access_token = params.access_token
    const YoutubeType = params.type
    var auth = params.isSignedIn
    console.log(params,params.type)
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    //gapi.load('client:auth2', initClient);
    const [result,setResult] = useState("");
    //const [auth,setAuth] = useState();
    // function handleChange(e){
    //     setAuth("Authorised")
    //     //console.log("AUTHORISED???")
    // }
    function useDidMount() {
        const [didMount, setDidMount] = useState(false)
        useEffect(() => setDidMount(true), [])
        //handleChange()
        return didMount
      }
      // Define the new element
    const didMount = useDidMount()
    console.log(didMount, auth)
    useEffect(() => {
        var videoId=''
        if(didMount && auth ){
            //var access_token = document.getElementById("token").innerHTML
            console.log("UWU")
            var videoOptions = {
                access_token:access_token,
                key:userKey, 
                part:'snippet,id',
                maxResults:10,
                myRating:'like'
            }
            const likedQuery = Object.keys(videoOptions).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(videoOptions[k])).join('&');
            var likedURL = 'https://www.googleapis.com/youtube/v3/videos?' + likedQuery;
            fetch(likedURL)
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                if (responseData.items == null){
                    console.log(responseData)
                } else {
                    //only grab music from liked list
                    videoId = (responseData.items).filter(a => a.snippet.categoryId === "10").map(a => a.id);
                    console.log(videoId);
                    console.log(responseData)
                    //setResult(videoId[0])
                }
            }).then(() =>{
                //https://developers.google.com/youtube/v3/docs/search/list
                //relatedToVideoId
                //fetch();
                var relatedOptions = {
                    key:userKey, 
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
                fetch(relatedURL)
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
                            var output = '<br>'
                            recommendedTitles.forEach(item => {
                                console.log(item.split('-'))
                                output += `
                                    <div>${item.split('-')[0]}, ${item.split('-')[1]}</div>
                                `;
                            });
                            //var recommendedArtists = recommendedTitles.split('-')[0]
                            console.log(output); 
                            setResult(output)
                        } else {
                            var recommendedTitles = (responseData.items).map(a => a.snippet);
                            console.log(recommendedTitles);
                            var recommendedTitlesId = (responseData.items).map(a => a.id.videoId);
                            console.log(recommendedTitlesId);
    
                            //setResult(recommendedTitles.join(" , "))
                            let output = '<br><h4 class="center-align">Recommended Videos</h4>';
                        
                            // Loop through videos and append output
                            recommendedTitlesId.forEach(item => {
                                output += `
                                    <iframe width="auto" height="auto" src="https://www.youtube.com/embed/${item}" frameborder="0" allowfullscreen></iframe>
                                `;
                            });
                            setResult(output)
                        
                            // // Output videos
                            // videoContainer.innerHTML = output;
                        }

                    }
                })
            });

        }; 
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    },[auth,access_token,didMount]);
    //console.log(auth)
    
    return (
        <div className="liked_videos" >
            
            {/* <div> Recommended Titles:</div> */}
            {result.length === 0 ? (
				<div></div>
			) : (
                <div className="row" id="video-container">
                    <div dangerouslySetInnerHTML={{__html:result}}></div>
                </div>
            )}
            <div id="token" style={{display: "none"}}></div>
            <br/>
            {/* //<button onClick={handleChange}>Click to View Recommended Titles</button> */}
        </div>
    );
};
export default YoutubeLiked;