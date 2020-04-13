import React from 'react';
import NavBar from './ConnectBar';
import Button from '@material-ui/core/Button';
import SpotifyIcon from './spotify.svg';
import YoutubeIcon from './youtube.svg';

const styles = {
    divContainer: {
        fontFamily: "Lato",
        display: "flex", 
        flexDirection: "column",
        justifyContent: "flex-start",
        color: "#FFFFFF",
        paddingTop: "15vh",
        alignItems: "center",
    },
    buttons: {
        display: "flex",
        flexDirection: "column",
    }
}


export default function Connect () {
    return(
        <>
        <div style={styles.divContainer}>
        <NavBar />
        <h1>MOSH</h1>
        <h3 style={{fontFamily: "Lato"}}>Connect your favourite streaming platforms for a more personal experience</h3>
        <div style={styles.buttons}>
            <Button color="inherit" style={{textTransform: 'none', backgroundColor:"#000000", width: "40vw", margin: "10px",}} >
            <div style={{display: "flex"}}>
                <img src={SpotifyIcon} alt="" style={{paddingRight:"5vw"}}/>
                <h3 style={{color: "#2D8642"}}>Connect with Spotify</h3>
            </div>
            </Button>
            <Button color="inherit" style={{textTransform: 'none', backgroundColor:"#000000", width: "40vw", margin: "10px"}} >
            <div style={{display: "flex"}}>
                <img src={YoutubeIcon} alt="" style={{paddingRight:"5vw"}}/>
                <h3 style={{color: "#E4321A"}}>Connect with YouTube</h3>
            </div>
            </Button>
        </div>
        <div style={{margin: "10px", display: "flex"}}>
        <Button color="inherit" style={{textTransform: 'none', backgroundColor:"#000000", width: "20vw", margin: "10px"}} >
        Skip for now
        </Button>
        <Button color="inherit" style={{textTransform: 'none', backgroundColor:"#000000", width: "20vw", margin: "10px"}} >
        Continue
        </Button>
        </div>
        

        </div>
        </>
    );
}