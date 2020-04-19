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
import App from './Youtube/YoutubeDiscoverMusic';
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
    getTopArtists() {
        var rerenderCallback = this.props.rerenderCallback
        //console.log(this.props.rerenderCallback)
        //console.log(this.props.handleSelection)

        async function callAsync() {
            var x = await handleIsSignedIn(false)
            async function callAsync2() {
                var YoutubeData = await getYoutubeData("tags")
                console.log(YoutubeData)
                return YoutubeData
            }
            return callAsync2()
        }

        callAsync().then(YoutubeData => {
            console.log(YoutubeData)
            //var list = [...this.state.list]
            // YoutubeData.forEach(item => {
            //     this.state.list.push(item)
            // })
            YoutubeData.map(obj => this.setState(prevState=> ({
                youtubelist: [...prevState.youtubelist,obj]
                
            })))
            console.log(this.state.youtubelist)
        })
        //.then(() =>{
            //this.setState({finished:true})
            //this.props.rerenderCallback();
            //this.forceUpdate();
        //})
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
        //console.log(title);
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
        let buttons = this.state.youtubelist.map(title => this.renderButton(title));
        console.log("butons are",buttons)
        console.log(this.state)
        return buttons;
        
        
    }

    render () {
         console.log("HOMEBAR")
        // var divdd = <div>what</div>
        //console.log(this.state.list[0])
        var returnval = (<List component="nav" aria-label="main list" style = {{flexGrow : 1}}>
                            <ListSubheader style = {{textAlign : "center", paddingBottom: "2%", color : "inherit"}}>
                                <ListItemText primary = "Your Interests"/>
                            </ListSubheader>
                            <Divider/>      
                            <div>
                                {/* {this.state.list[0]} */}
                                {this.renderButtons()}
                            </div>   
                            {/* <App type={"tags"}></App> */}
                        </List>)
        //console.log(returnval)
        return (returnval)
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
