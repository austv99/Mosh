import React, { Component } from 'react';
import NavBar from './ConnectBar';
import Button from '@material-ui/core/Button';
import SpotifyIcon from './spotify.svg';
import YoutubeIcon from './youtube.svg';
import Image from './landing_back.png';
import * as SpotifyFunctions from '../spotifyFunctions.js';
import DoneIcon from '@material-ui/icons/Done';
import { Link } from 'react-router-dom';

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
    },
    background: {
        backgroundImage: `url(${Image})`,
        height: '1200px',
        width: '100%',
        textAlign: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center', 
    }
}


class Connect extends Component {
    constructor(props) {
		super(props)
		this.state = {
			loggedInToSpotify: false,
			accessToken: null
		}
	}

	componentDidMount(){
	//will check URL for accessToken hash. If it's not there, it will show the connect-spotify-button as a link
	//which will then redirect back to your site with the hash. If there is a hash, then we will jump right into the player
        const accessToken = SpotifyFunctions.parseLogin();
        const token = accessToken.access_token;
        console.log(token);
		token ? this.setState(() => ({loggedInToSpotify: true, accessToken: token})) : this.setState(() => ({loggedInToSpotify: false, accessToken: null}));
	}
    render() {
    return(
        <>
        <div style={styles.background}>
        <div style={styles.divContainer}>
        <NavBar />
        <h1>MOSH</h1>
        <h3 style={{fontFamily: "Lato"}}>Connect your favourite streaming platforms for a more personal experience</h3>
        <div style={styles.buttons}>
            <div style={{display: "flex", alignItems: "center"}}>
            <Button color="inherit" style={{textTransform: 'none', backgroundColor:"#000000", width: "40vw", margin: "10px",}} >
                <a href={SpotifyFunctions.spotifyLogin()} style={{textDecoration: 'none'}}> 
                <div style={{display: "flex"}}>
                    <img src={SpotifyIcon} alt="" style={{paddingRight:"5vw"}}/>
                    <h3 style={{color: "#2D8642"}}>Connect with Spotify</h3>
                </div>
                </a>
            </Button>
            {this.state.loggedInToSpotify ? 
            <div style={{backgroundColor:"#000000", height:"25px", width:"25px", borderRadius:"50%" }}>
                <DoneIcon />
            </div>
            : 
            <div></div>}
            </div>
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
        <Link to={{
            pathname: '/home',
            state: {
                spotifyToken: this.state.accessToken
            }
        }} style={{textDecoration: 'none', color: 'inherit'}}>
        <Button color="inherit" style={{textTransform: 'none', backgroundColor:"#000000", width: "20vw", margin: "10px"}} >
        Continue
        </Button>
        </Link>
        </div>
        </div>
        </div>
        </>
    );
    }
}

export default Connect;