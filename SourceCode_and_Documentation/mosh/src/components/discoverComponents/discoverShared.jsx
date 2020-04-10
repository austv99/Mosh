import React from 'react'
import {Grid} from '@material-ui/core'
import MusicCard from "./discoverCards/musicCard"

function discoverShared() {
    const cardStyles = {
        marginBottom : "3%"
    }

    return (
        <div style = {{display: "flex", flexDirection: "column"}}> 
            <Grid style = {cardStyles}>
                <MusicCard title = "Stolen" artist = "Talia Mar" album = "Stolen" img = "https://t2.genius.com/unsafe/220x0/https%3A%2F%2Fimages.genius.com%2Fad7566342b1b782f8a18d69ed2bb2572.960x960x1.jpg"/>
            </Grid>
            <Grid style = {cardStyles}>
                <MusicCard title = "Bille Jean" artist = "Michael Jackson" album = "Thriller" img = "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png"/>
            </Grid>
            <Grid style = {cardStyles}>
                <MusicCard title = "Don't Start Now" artist = "Dua Lipa" album = "Future Nostalgia" img = "https://t2.genius.com/unsafe/220x220/https%3A%2F%2Fimages.genius.com%2Fe4c769de3006686a03da334039bd13a8.600x600x1.png"/>
            </Grid>
        </div>
    )
}

export default discoverShared