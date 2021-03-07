import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from "../components/navBar"
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
} from "react-router-dom";
import { DesktopDrawer, MobileDrawer } from "../components/drawers";
import Spotify from 'spotify-web-api-js';
import ArtistFeed from '../components/feedComponents/artistFeed'
import DefaultFeed from "../components/feedComponents/defaultFeed"

const spotifyApi = new Spotify();
const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#292b2a",
    color: "white",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class Homescreen extends React.Component {
    constructor(props) {
        super(props);
        let path = window.location.pathname.replace("/home/", "");
        let token;
        this.rerenderCallback = this.rerenderCallback.bind(this);
        if (path.startsWith("token/")) {
          token = path.replace("token/", "");
        }
        this.state = {
            mobileOpen : false, 
            // primaryTags : ["Drake", "Travis Scott", "Lil Uzi Vert", "The Weeknd"],
            selectedTag: "",
            artists: [],
            token: token,
            rerendering: false,
        }
        if (this.state.token) {
          spotifyApi.setAccessToken(this.state.token);
          
        }
    }

    handleDrawerToggle = () => {
        this.setState((state) => ({
            mobileOpen : !state.mobileOpen
        }))
    }; 
    
    rerenderCallback = (artists) => {
      this.setState(prevState=> ({
        artists: prevState.artists.concat(artists)
    }))
    };
    
    handleSelection = (event, title) => {
        this.setState(() => ({
            selectedTag : title
        }), () => {
          if (this.state.mobileOpen === true) {
            this.handleDrawerToggle();
          }
        })
    }
    
    render () {
        const {classes} = this.props;
        return  (
            <div className={classes.root}>
                <CssBaseline />

                {/* Navbar Goes Here */}
                <NavBar appBar = {classes.appBar} token={this.state.token} menuButton = {classes.menuButton} handleDrawerToggle = {this.handleDrawerToggle}/>
                
                <nav className={classes.drawer}>

                    <MobileDrawer type="home" container = {classes.container} open = {this.state.mobileOpen} handleDrawerToggle = {this.handleDrawerToggle} 
                    drawerPaper = {classes.drawerPaper} primaryTags = {this.state.token} handleSelection = {this.handleSelection}
                    rerenderCallback = {this.rerenderCallback}  state = {this.state} selectedTag = {this.state.selectedTag}/>
                    
                    <DesktopDrawer type="home"  drawerPaper = {classes.drawerPaper} toolbar = {classes.toolbar} primaryTags = {this.state.token}
                    handleSelection = {this.handleSelection} rerenderCallback = {this.rerenderCallback} state = {this.state} selectedTag = {this.state.selectedTag}/>
                </nav>


                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    
                    {/* Main Body of page goes here */}
                    <Switch>
                        <Route path = {["/home/token"]}  component = {DefaultFeed}/>
                        <Route path = "/home/artist/" component= {ArtistFeed}/>
                    </Switch>
                </main>
            </div>
        )
    }
}

Homescreen.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
    // token: PropTypes.string
};


export default withStyles(styles, {withTheme : true}) (Homescreen);
