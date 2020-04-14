import React from "react"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Box, ListSubheader } from "@material-ui/core";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PeopleIcon from '@material-ui/icons/People';

import {Link} from 'react-router-dom';

export class HomePri extends React.Component {    
    renderButton(title) {
        
        return ( 
            <Link to = {`/home/${title.replace(/\s+/g, '')}`} key = {title} style = {{textDecoration: 'none', color: "inherit"}}>
                <ListItem button onClick = {(event) => this.props.handleSelection(event,title)} selected = {this.props.selectedTag === title} style = {{paddingLeft: "20px"}}> 
                    <ListItemText primary = {title}/>
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
