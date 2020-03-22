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
import Grid from "@material-ui/core/Grid"

class PrimaryList extends React.Component {
    render () {
        return (
            <Grid item>
                <List component="nav" aria-label="main list">
                    <ListSubheader style = {{textAlign : "center", color: "white", paddingBottom: "2%"}}>
                        <ListItemText primary = "Discover"/>
                    </ListSubheader>
                    <Divider/>
                    <ListItem button>
                        <ListItemIcon>
                            <MusicNoteIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Music" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <AlbumIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Concerts" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <GroupAddIcon/>
                        </ListItemIcon>
                        <ListItemText primary="People" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ShareIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Shared With Me" />
                    </ListItem>
                </List>
            </Grid>
        )
    }   
}

class SecondaryList extends React.Component {
    render () {
        return (
            <Grid item>
                <Divider />
                <List component="nav" aria-label="secondary list">
                    <ListItem button>
                        <ListItemIcon>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Your Connections" />
                    </ListItem>
                </List>
            </Grid>
        )
    }  
}


class DiscoverBar extends React.Component {
    render () { 
        return (
            <Box style = {{color : 'white', backgroundColor: "grey"}}> 
                <Grid container direction = "column" justify = 'space-between' style = {{height: 'inherit'}}>
                    <PrimaryList/>
                    <SecondaryList/>
                </Grid>
            </Box>
        )
    }
}

export default DiscoverBar;