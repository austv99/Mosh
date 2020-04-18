import React from 'react'
import {Grid } from '@material-ui/core'
import MusicCard from "./discoverCards/musicCard"
//import MusicCard from "../musicCard"
import Spotify from 'spotify-web-api-js';

const spotifyApi = new Spotify();
const cardStyles = {
    marginBottom : "3%"
}

class discoverMusic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: window.location.pathname.replace("/discover/token/", ""),
            list: [],
        }
        if (this.state.token) {
          spotifyApi.setAccessToken(this.state.token);
      }
      this.getRecom();
      
      
    }
      
    getRecom() {
        let artists = ["0Y5tJX1MQlPlqiwlOH1tJY", "5K4W6rqBFWDnAN6FQUkS6x"];
        // let artists = [];
        // spotifyApi.getMyTopArtists({
        //     limit: 4
        // })
        //         .then((response) => {
        //             console.log(response);
        //             response.items.map(obj => artists.push(obj.id));
        //         }, (err) => {
        //             console.error(err);
        //     })
        // console.log(artists);
        spotifyApi.getRecommendations({
            // seed_artists: //CHANGE TO TOP ARTISTS
            seed_artists: artists,
        })
                .then((response) => {
                    console.log(response);
                    response.tracks.map(obj => this.setState(prevState=> ({
                        list: [...prevState.list,{
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
                <MusicCard title ={obj.songName} artist = {obj.songArtists} album = {obj.albumName} img = {obj.albumArt} link={obj.link}/>
            </Grid>
            // </Link>
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