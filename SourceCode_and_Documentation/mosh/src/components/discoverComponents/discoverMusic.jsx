import React from 'react'
import {Grid } from '@material-ui/core'
import MusicCard from "./discoverCards/musicCard"
//import MusicCard from "../musicCard"
import Spotify from 'spotify-web-api-js';
import {handleIsSignedIn,getYoutubeData} from '../Youtube/YoutubeFunctions';
import albumArt from 'album-art'
import {fire} from "../../config/fire"
const spotifyApi = new Spotify();
const cardStyles = {
    marginBottom : "3%"
}

class discoverMusic extends React.Component {
    constructor(props) {
        super(props);
        let currToken;
        if (window.location.pathname.startsWith("/discover/token/")) {
            currToken = window.location.pathname.replace("/discover/token/", "");
        } else {
            currToken = window.location.pathname.replace("/discover/music/", "");
        }
        this.state = {
            token: currToken,
            list: [],
            connections: [],
        }
        if (this.state.token) {
          spotifyApi.setAccessToken(this.state.token);
      }
      this.getRecom();
      this.unSubConnections = null;
      
      
    }
    componentDidMount() {
        let db = fire.firestore();
        let user = fire.auth().currentUser;
        
        this.unSubConnections = db.collection("users").where("connections", "array-contains", user.uid).onSnapshot(snapShot => {
            let userList = [] 
    
            snapShot.forEach(doc => {
                let data = {};
                data["displayName"] = doc.data()["displayName"];
                data["uid"] = doc.id;
    
                userList.push(data);
            });

            this.setState({
              connections: userList,
            })
        })
    }
    componentWillUnmount() {
        this.unSubConnections();
        // this.unSubSongs();
    }


    getTopArtists() {
        let artists = [];
        
        return artists;
    }
      
    async getRecom() {
        let result = [];
        

        var callInstance = spotifyApi.getMyTopArtists({
            limit: 5,
        })
                .then((response) => {
                    response.items.map(obj => result.push(obj.id));
                }, (err) => {
                    console.error(err);
            })

        try {
            let response = await callInstance;
            spotifyApi.getRecommendations({
                seed_artists: result,
            })
                    .then((response) => {
                        response.tracks.map(obj => this.setState(prevState=> ({
                            list: [...prevState.list,{
                            id: obj.id,
                            albumArt: obj.album.images[0].url,
                            albumName: obj.album.name,
                            songArtists: obj.artists[0].name, 
                            songName: obj.name, 
                            link: obj.external_urls.spotify,
                            }]
                            
                        })))
                    }, (err) => {
                        console.error(err);
                })
        } catch (err) {
            console.error(err);
        }
        //DO YOUTUBE NOW
        async function callAsync() {
            if (!window.gapi){
                return
            }
            if (!window.gapi.auth2.getAuthInstance()){
                return
            }
            if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()){
                return
            }
            var x = await handleIsSignedIn(false)

            async function callAsync2() {
                var YoutubeData = await getYoutubeData()
                return YoutubeData
            }
            return callAsync2()
        }
        var x = await callAsync().then(async (YoutubeData) => {
            if (YoutubeData === undefined){
                YoutubeData = []
            }
            //can just use the title and its fine
            albumArt( 'Rush' ).then( console.log )
            const functionWithPromise = item => { //a function that returns a promise
                return Promise.resolve('ok')
            }
              
            const anAsyncFunction = async obj => {
                var album = await albumArt(obj.snippet.title.split(' -')[0], ( error, response ) => {
                    return response
                    })
                var album_backup = await albumArt(obj.snippet.channelTitle, ( error, response ) => {
                    return response
                    })
                var  album_backup_backup= obj.snippet.thumbnails.default.url
                if (!album){
                    album = album_backup
                    if (!album){
                        album = album_backup_backup
                    }
                }
                // console.log(album)

                this.setState(prevState =>({
                    list: [...prevState.list,{
                    albumArt: album,
                    albumName: '',
                    songArtists: obj.snippet.channelTitle, 
                    songName: obj.snippet.title.split('- ').pop(), 
                    link: `https://www.youtube.com/watch?v=${obj.id.videoId}`,
                    }]
                }))
                return functionWithPromise(obj)
            }
              
            const getData = async () => {
            return Promise.all(YoutubeData.map(item => anAsyncFunction(item)))
            }
            
            let x = await getData()
            return YoutubeData
        })
    }
    renderButton(obj) {
        return ( 
            <Grid style = {cardStyles}>
                <MusicCard connections={this.state.connections} id={obj.id} key = {obj.songName} title ={obj.songName} artist = {obj.songArtists} album = {obj.albumName} img = {obj.albumArt} link={obj.link}/>
            </Grid>
        )
    }
    renderCards() {
        let musicCards = this.state.list.map(obj => this.renderButton(obj));
        return musicCards;
    }
    render() {
        
    return (
        <div style = {{display: "flex", flexDirection: "column"}}> 
            {this.renderCards()}
        </div>
    );
    }
}

export default discoverMusic;