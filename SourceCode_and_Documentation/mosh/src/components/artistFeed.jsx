import React from 'react'
import NewsFeed from "./newsFeed"

export default class ArtistFeed extends React.Component {
    render() {
        var artist = window.location.pathname;
        artist = artist.split("/");
        var name = artist[2];
        name = name.replace(/([A-Z])/g, ' $1').trim()
        
        return(
            <NewsFeed artist = {name}/>
        );
    }
}