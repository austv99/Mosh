import React from "react"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Box, ListSubheader } from "@material-ui/core";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AlbumIcon from '@material-ui/icons/Album';
import PeopleIcon from '@material-ui/icons/People';
import ShareIcon from '@material-ui/icons/Share';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

import {Link} from 'react-router-dom';

export class DiscPri extends React.Component {    
    renderButton(title) {
        var icon, button_text;
            
        if (title === "music") {
            icon = <MusicNoteIcon/>
            button_text = "Music"
        } else if (title === "concerts") {
            icon = <AlbumIcon/>
            button_text = "Concerts";
        } else if (title === "people") {
            icon = <GroupAddIcon/>
            button_text = "People";
        } else if (title === "shared") {
            icon = <ShareIcon/>
            button_text = "Shared With Me"
        }
        return ( 
            <Link to = {"/discover/" + title.toLowerCase() + "/" + this.props.token} key = {title} style = {{textDecoration: 'none', color: "inherit"}}>
                <ListItem button onClick = {(event) => this.props.handleSelection(event,title)} selected = {this.props.selectedTag === title}> 
                    <ListItemIcon style={{ color: "inherit" }}>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary = {button_text} style={{ color: "inherit" }}/>
                </ListItem>
            </Link>
        )
    }

    renderButtons() {
        let buttons = this.props.primaryTags.map(title => this.renderButton(title));
        
        return buttons;
    }

    render () {
        
        return (
            <List component="nav" aria-label="main list" style = {{flexGrow : 1}}>
                <ListSubheader style = {{textAlign : "center", paddingBottom: "2%", color: "inherit"}}>
                    <ListItemText primary = "Discover"/>
                </ListSubheader>
                <Divider />                
                {this.renderButtons()}
            </List>
        )
    }   
}

export class DiscSec extends React.Component {
    render () {
        return (
            <Box style={{color: "inherit"}}>
                <Divider />
                <List component="nav" aria-label="secondary list">
                    <Link to = "/discover/connections" style = {{textDecoration: 'none', color: "inherit"}}>
                        <ListItem button onClick = {(event) => this.props.handleSelection(event,"connections")} selected = {this.props.selectedTag === "connections"}>
                            <ListItemIcon style={{ color: "inherit" }}>
                                <PeopleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Your Connections" />
                        </ListItem>
                    </Link>
                </List>
            </Box>
        )
    }  
}
