import React from 'react';
// import NavBar from './ConnectBar';
import Button from '@material-ui/core/Button';
import SpotifyIcon from './spotify.svg';
import YoutubeIcon from './youtube.svg';
import Image from './landing_back.png';
import { Link, Route, Switch } from 'react-router-dom';
import Spotify from 'spotify-web-api-js';
import Homescreen from './Homescreen';
import App from '../components/Youtube/YoutubeDiscoverMusic'
const spotifyApi = new Spotify();

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


class Connect extends React.Component {
    constructor() {
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        // console.log(params);
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        this.state = {
            loggedIn: token ? true : false,
            token: token,
            showLogin: false
        }

    }
    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }
    handleGoogleLogin = (e) => {
        e.preventDefault();
        this.setState({showLogin:true})
    }
    renderGoogleBackgroundLogin = () => {
        if (!this.state.showLogin) return '';
        return (
            <App />
        );
    }
    render() {
        // console.log(this.state.showLogin)
    return(
        <>
        <div style={styles.background}>
        <div style={styles.divContainer}>
        <h1>MOSH</h1>
        <h3 style={{fontFamily: "Lato"}}>Connect your favourite streaming platforms for a more personal experience</h3>
        <div style={styles.buttons}>
            <div style={{display: "flex", alignItems: "center"}}>
            <Button color="inherit" style={{textTransform: 'none', backgroundColor:"#000000", width: "40vw", margin: "10px",}} >
                <a href="http://localhost:8888" style={{textDecoration: 'none'}}> 
                <div style={{display: "flex"}}>
                    <img src={SpotifyIcon} alt="" style={{paddingRight:"5vw"}}/>
                    <h3 style={{color: "#2D8642"}}>Connect with Spotify</h3>
                </div>
                </a>
            </Button>
            </div>
            <Button color="inherit" onClick={this.handleGoogleLogin} style={{textTransform: 'none', backgroundColor:"#000000", width: "40vw", margin: "10px"}} >
            <div style={{display: "flex"}}>
                <img src={YoutubeIcon} alt="" style={{paddingRight:"5vw"}}/>
                <h3 style={{color: "#E4321A"}}>Connect with YouTube</h3>
                {(this.state.showLogin === true) ? (
				    <App/>
                ) : (
                    // <YoutubeLiked params={this.state} ></YoutubeLiked>
                    <div></div>
                )}
            </div>
            </Button>
        </div>
        <div style={{margin: "10px", display: "flex"}}>
        <Button color="inherit" style={{textTransform: 'none', backgroundColor:"#000000", width: "20vw", margin: "10px"}} >
            <Link to={"/home/token/"} style={{textDecoration:'none', color:'inherit'}}>
            Skip for now
            </Link>
        </Button>
        
        <Button color="inherit" style={{textTransform: 'none', backgroundColor:"#000000", width: "20vw", margin: "10px"}} >
            <Link to={"/home/token/" + this.state.token} style={{textDecoration:'none', color:'inherit'}}>
            Continue
            </Link>
        </Button>
        <Switch>
            <Route path="/home/token/" component={Homescreen} />
        </Switch>
        </div>
        </div>
        </div>
        </>
    );
    }
}

export default Connect;