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
    // componentDidMount = async () => {
    //     var x = await 
    //     console.log("x is ",x)
    // }
    getTopArtists = async () => {
        //var rerenderCallback = this.props.rerenderCallback
        //console.log(this.props.rerenderCallback)
        //console.log(this.props.handleSelection)

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
            var x = await handleIsSignedIn(false)

            async function callAsync2() {
                var YoutubeData = await getYoutubeData("tags")
                console.log(YoutubeData)
                return YoutubeData
            }
            return callAsync2()
        }
        var x = await callAsync().then(YoutubeData => {
            console.log(YoutubeData)
            if (YoutubeData === undefined){
                YoutubeData = []
            }
            console.log(this.props)
            YoutubeData.map(obj => this.props.rerenderCallback(obj))
            //console.log(this.state.list)
            //console.log("updated")
            return YoutubeData
        }).then(YoutubeData => {
            if (this.state.token != "undefined" && this.state.token){
                spotifyApi.getMyTopArtists()
                .then((response) => {
                    response.items.map(obj => this.state.list.push(obj.name))
                    this.props.rerenderCallback(this.state.list)
                }, (err) => {
                    console.error(err);
                })
            }
            
        })
        //this.setState({finished:true})        
        console.log(this.props.state)
        //this.props.rerenderCallback()
        //.then(() =>{
            //this.setState({finished:true})
            //this.props.rerenderCallback();
            //this.forceUpdate();
        //})
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
        //first filter and remove dupes
        console.log(this)
        var UniqueList = this.props.state.artists.filter((a, b) => this.props.state.artists.indexOf(a) === b)
        let buttons = UniqueList.map(title => this.renderButton(title));
        console.log("butons are",buttons)
        console.log(UniqueList)
        return buttons;
        
        
    }

    render () {
         console.log("HOMEBAR")
        // var divdd = <div>what</div>
        //console.log(this.state.list[0])
        return (
            <List component="nav" aria-label="main list" style = {{flexGrow : 1}}>
                <ListSubheader style = {{textAlign : "center", paddingBottom: "2%", color : "inherit"}}>
                    <ListItemText primary = "Your Interests"/>
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
                            <ListItemText primary="Your Interests" />
                        </ListItem>
                    </Link>
                </List>
            </Box>
        )
    }  
}
