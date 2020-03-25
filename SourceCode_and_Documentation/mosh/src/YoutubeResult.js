import React, { useState, useEffect } from 'react';

const YoutubeResult= () => {

    const [result,setResult] = useState("");
    //var playlistID = "PLzMXToX8Kzqggrhr-v0aWQA2g8pzWLBrR";
    var userKey = 'AIzaSyBhklDEhDYrLwf5mMkLKsA34Btqjpj8S7k';

    //working playlist url
    //const URL = ` https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${userKey}&playlistId=${playlistID}`;
    //note cannot add new line within url
    var InputTitle="DDU DDU"
    const options = {
        part:'snippet',
        key:userKey,
        regionCode:'AU',
        q:`${InputTitle} Official Music Video`,
        maxResults:10,
        $videoCategoryId:10,
    }
    const query = Object.keys(options).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(options[k])).join('&');
    //?part=snippet&key=${userKey}&regionCode=AU&q=music&maxResults='10'$videoCategoryId=10
    //working search url
    const URL = ' https://www.googleapis.com/youtube/v3/search?' + query;
    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch(URL)
            .then(response => response.json())
            .then(responseData => {
                var title = (responseData.items).map(a => a.snippet.title);
                console.log(title);
                //title is an array
                
                setResult(title[0])
            })
            ;
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [URL]);
    return (
        <div className="search-params">
            {result}
        </div>
    );
};
export default YoutubeResult;