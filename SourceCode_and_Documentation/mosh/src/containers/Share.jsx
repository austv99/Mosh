import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MusicCard from '../components/discoverComponents/discoverCards/musicCard';
import NavBarShare from "../components/navBarShare";
import CssBaseline from '@material-ui/core/CssBaseline';


import NavBar from '../components/navBar';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
// import SearchIcon from '@material-ui/icons/Search';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import MusicCard from '../components/musicCard';
import Spotify from 'spotify-web-api-js';
import Button from '@material-ui/core/Button';

const spotifyApi = new Spotify(); 
const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));

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
  }
  const cardStyles = {
    margin : "10px",
    width: "80vw",
}
// const classes = useStyles();

class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        token: window.location.pathname.replace("/share/token/", ""),
        list: [],
        searchQuery: ""
    }
    if (this.state.token) {
      spotifyApi.setAccessToken(this.state.token);
  }
  // this.getSearch();
  this.getSearch = this.getSearch.bind(this);
  }

  getSearch() {
    this.setState(prevState => ({
      list:[]
    }));
    spotifyApi.search(this.state.searchQuery,["track"])
            .then((response) => {
                console.log(response);
                response.tracks.items.map(obj => this.setState(prevState=> ({
                  list: [...prevState.list,{
                    albumArt: obj.album.images[0].url,
                    albumName: obj.album.name,
                    songArtists: obj.artists[0].name, 
                    songName: obj.name, 
                    link: obj.external_urls.spotify,
                  }]
                  
                })))
            })
        console.log(this.state.list);
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
    <>
        {/* <CssBaseline/>
        <NavBarShare /> */}
        <NavBar token={this.state.token}/> 
        <div style={styles.divContainer}>
          <div style={{paddingBottom: "2vh"}}>
          <FormControl>
            <InputLabel htmlFor="input-with-icon-adornment" style={{color: "inherit"}}>Search for Music to Share</InputLabel>
            <Input
              id="input-with-icon-adornment"
              style={{color: "inherit"}}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              onChange = {(e) => {
                this.state.searchQuery = e.target.value;
                console.log(this.state.searchQuery);
            }}
            />
          </FormControl>
          <Button onClick={() => this.getSearch()} style={{color: 'inherit'}}>
            Search
          </Button>
          </div>
            {this.renderCards()}
        </div>
    </>
    );
  }

}

export default Share;