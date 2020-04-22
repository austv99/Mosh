import React from 'react'
import {Grid} from '@material-ui/core'
import MusicCard from "./discoverCards/musicCard"
import Spotify from 'spotify-web-api-js';
import {fire} from "../../config/fire"


const spotifyApi = new Spotify();

const cardStyles = {
    marginBottom : "3%"
}

class discoverShared extends React.Component {
    constructor(props) {
        super(props);
        let currToken;
        if (window.location.pathname.startsWith("/discover/token/")) {
            currToken = window.location.pathname.replace("/discover/token/", "");
        } else {
            currToken = window.location.pathname.replace("/discover/shared/", "");
        }
        this.state = {
            token: currToken,
            list: [],
            songIds: [],
            connections: [],
        }
        if (this.state.token) {
          spotifyApi.setAccessToken(this.state.token);
      }

      this.getTracks();
      this.unSubConnections = null;
      this.unSubSongs = null;
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
    
            console.log(userList);
            this.setState({
              connections: userList,
            })
        })


        this.unSubSongs = db.collection("shares").where("reciever", "==", fire.auth().currentUser.uid).onSnapshot(snapShot => {
            let songList = [];

            snapShot.forEach(doc => {
                songList.push(doc.data().spotifyID);
            })

            this.setState({
                songIds: songList,
            })
        })
    }
    
    componentWillUnmount() {
        this.unSubConnections();
        this.unSubSongs();
    }


    getTracks() {
        spotifyApi.getTracks(this.state.songIds)
                .then((response) => {
                    console.log(response);
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
    }

    renderButton(obj) {
        return ( 
            <Grid style = {cardStyles}>
                <MusicCard id={obj.id} title ={obj.songName} artist = {obj.songArtists} album = {obj.albumName} img = {obj.albumArt} link={obj.link} 
                connections = {this.state.connections}/>
            </Grid>
        )
    }

    renderCards() {
        let musicCards = this.state.list.map(obj => this.renderButton(obj));
        return musicCards;
    }
    
    render() {
        console.log(this.state.list);
        return (
            <div style = {{display: "flex", flexDirection: "column"}}> 
                {this.renderCards()}
            </div>
        );
    }
}

export default discoverShared;