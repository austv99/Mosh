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


class DiscoverBar extends React.Component {
    render () { 
        return (
            <Box style = {{backgroundColor : 'grey'}}> 
                <List component="nav" aria-label="main list">
                    <ListSubheader style = {{textAlign : "center"}}>
                        <ListItemText primary = "Discover"/>
                    </ListSubheader>
                    
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
                <Divider />
                <List component="nav" aria-label="secondary list">
                    <ListItem button>
                        <ListItemIcon>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Your Connections" />
                    </ListItem>
                </List>
            </Box>
        )
    }
}

export default DiscoverBar;