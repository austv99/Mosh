import React from 'react'
import {Grid} from '@material-ui/core'
import MusicCard from "./discoverCards/musicCard"
import Spotify from 'spotify-web-api-js';

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
            songIds: ["4g0ff0cUCbX6bWcBJVnCyg", "1sOW4PuG5X3Ie3EXUhAopJ"],
        }
        if (this.state.token) {
          spotifyApi.setAccessToken(this.state.token);
      }
      this.getTracks();
      
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
        // console.log(obj);
        return ( 
            // <Link to = {`/home/artist/${title.replace(/\s+/g, '')}`} key = {title} style = {{textDecoration: 'none', color: "inherit"}}>
            <Grid style = {cardStyles}>
                <MusicCard id={obj.id} title ={obj.songName} artist = {obj.songArtists} album = {obj.albumName} img = {obj.albumArt} link={obj.link}/>
            </Grid>
            // </Link>
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
                {/* <Grid style = {cardStyles}>
                    <MusicCard title = "Stolen" artist = "Talia Mar" album = "Stolen" img = "https://t2.genius.com/unsafe/220x0/https%3A%2F%2Fimages.genius.com%2Fad7566342b1b782f8a18d69ed2bb2572.960x960x1.jpg"/>
                </Grid>
                <Grid style = {cardStyles}>
                    <MusicCard title = "Bille Jean" artist = "Michael Jackson" album = "Thriller" img = "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png"/>
                </Grid>
                <Grid style = {cardStyles}>
                    <MusicCard title = "Don't Start Now" artist = "Dua Lipa" album = "Future Nostalgia" img = "https://t2.genius.com/unsafe/220x220/https%3A%2F%2Fimages.genius.com%2Fe4c769de3006686a03da334039bd13a8.600x600x1.png"/>
                </Grid> */}
                {this.renderCards()}
            </div>
        );
    }
}

export default discoverShared;