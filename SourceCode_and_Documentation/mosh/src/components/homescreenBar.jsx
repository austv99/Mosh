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
import {handleIsSignedIn,getYoutubeData} from './Youtube/YoutubeFunctions';


const spotifyApi = new Spotify();

export class HomePri extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.primaryTags,
            list: [],
            youtubelist:[],
            gapi:window.gapi,
            finished:false,
        }
        if (this.state.token) {
          spotifyApi.setAccessToken(this.state.token);
        }
        this.getTopArtists();
    }

    getTopArtists = async () => {
        //var rerenderCallback = this.props.rerenderCallback
        if (this.state.token !== "undefined" && this.state.token){
            spotifyApi.getMyTopArtists()
            .then((response) => {
                response.items.map(obj => this.state.list.push(obj.name))
                this.props.rerenderCallback(this.state.list)
            }, (err) => {
                console.error(err);
            })
        }
        async function callAsync() {
            if (!window.gapi){
                return
            }
            if (!window.gapi.auth2.getAuthInstance()){
                return
            }
            if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()){
                return
            }
            
            await handleIsSignedIn(false)

            async function callAsync2() {
                var YoutubeData = await getYoutubeData("tags")
                return YoutubeData
            }
            return callAsync2()
        }
        await callAsync().then(YoutubeData => {
            if (YoutubeData === undefined){
                YoutubeData = []
            }
            YoutubeData.map(obj => this.props.rerenderCallback(obj))
            return YoutubeData;
        })
    }

    renderButton(title) {
        return ( 
            <Link to = {`/home/artist/${title.replace(/\s+/g, '')}`} key = {title} style = {{textDecoration: 'none', color: "inherit"}}>
                <ListItem button onClick = {(event) => this.props.handleSelection(event,title)} selected = {this.props.selectedTag === title}> 
                    <ListItemText primary = {title}/>
                </ListItem>
            </Link>
        )
    }

    renderButtons() {
        //first filter and remove dupes
        var UniqueList = this.props.state.artists.filter((a, b) => this.props.state.artists.indexOf(a) === b)
        let buttons = UniqueList.map(title => this.renderButton(title));

        // console.log(UniqueList)
        return buttons;
        
        
    }

    render () {
        //console.log(this.state.list[0])
        return (
            <List component="nav" aria-label="main list" style = {{flexGrow : 1}}>
                <ListSubheader style = {{textAlign : "center", paddingBottom: "2%", color : "inherit"}}>
                    <ListItemText primary = "Your Top Artists"/>
                </ListSubheader>
                <Divider/>      
                <div>
                    {/* {this.state.list[0]} */}
                    {this.renderButtons()}
                </div>   
                {/* <App type={"tags"}></App> */}
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
                            <ListItemText primary="Your Top Artists" />
                        </ListItem>
                    </Link>
                </List>
            </Box>
        )
    }  
}
