import React from "react"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Box, ListSubheader } from "@material-ui/core";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PeopleIcon from '@material-ui/icons/People';
import Spotify from 'spotify-web-api-js';
import {Link} from 'react-router-dom';

const spotifyApi = new Spotify();

export class HomePri extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.primaryTags,
            list: [],
        }
        if (this.state.token) {
          spotifyApi.setAccessToken(this.state.token);
      }
      this.getTopArtists();
      
    }
    getTopArtists() {
        spotifyApi.getMyTopArtists()
                .then((response) => {
                    response.items.map(obj => this.setState(prevState=> ({
                        list: [...prevState.list,obj.name]
                        
                      })))
                }, (err) => {
                    console.error(err);
            })
    }
    renderButton(title) {
        // console.log(title);
        return ( 
            <Link to = {`/home/artist/${title.replace(/\s+/g, '')}`} key = {title} style = {{textDecoration: 'none', color: "inherit"}}>
                <ListItem button onClick = {(event) => this.props.handleSelection(event,title)} selected = {this.props.selectedTag === title}> 
                    {/* <ListItemIcon>
                        {icon}
                    </ListItemIcon> */}
                    <ListItemText primary = {title}/>
                </ListItem>
            </Link>
        )
    }

    renderButtons() {
        let buttons = this.state.list.map(title => this.renderButton(title));
        
        return buttons;
        
        
    }

    render () {
        
        return (
            <List component="nav" aria-label="main list" style = {{flexGrow : 1}}>
                <ListSubheader style = {{textAlign : "center", paddingBottom: "2%", color : "inherit"}}>
                    <ListItemText primary = "Your Interests"/>
                </ListSubheader>
                <Divider/>         
                {this.renderButtons()}
            </List>
        )
    }   
}

export class HomeSec extends React.Component {
    render () {
        return (
            <Box>
                <Divider />
                <List component="nav" aria-label="secondary list">
                    <Link to = "/discover/connections" style = {{textDecoration: 'none', color: "inherit"}}>
                        <ListItem button onClick = {(event) => this.props.handleSelection(event,"connections")} selected = {this.props.selectedTag === "connections"}>
                            <ListItemIcon style = {{color: "inherit"}}>
                                <PeopleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Your Interests" />
                        </ListItem>
                    </Link>
                </List>
            </Box>
        )
    }  
}
