import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShareIcon from '@material-ui/icons/Share';
import PersonIcon from '@material-ui/icons/Person';
import UserProfileModal from "./userProfileModal"
import { makeStyles } from '@material-ui/core/styles';
import { fire } from '../config/fire'

const useStyles = makeStyles((theme) => ({
    iconButton: {
        color: 'inherit',
        paddingLeft: theme.spacing(0.25),
        paddingRight: theme.spacing(0.25),
    }
  }));

function NavBar(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSignOut = () => {
        fire.auth().signOut().then(() => {
            console.log("user signed out")

        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <AppBar position="fixed" className={props.appBar} style={{ background:'#303030', boxShadow: 'none'}}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={props.handleDrawerToggle}
                className={props.menuButton}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" style = {{ flexGrow : 1 }}>
                <Link to="/home" style={{ textDecoration: 'none', color: 'inherit '}}>
                    Mosh
                </Link>
            </Typography>
            <div style={{display: "flex", flexDirection:"row", alignItems:"center"}}>
                <div style={{ textDecoration: 'none', color: 'white ', margin: "5px"}} onClick = {handleOpen}>
                    <IconButton className = {classes.iconButton}>
                        <PersonIcon/>
                    </IconButton>
                </div>
                <Link to="/discover" style={{ textDecoration: 'none', color: 'inherit ', margin: "5px"}}>
                    <IconButton className = {classes.iconButton}>
                        <SearchIcon/>
                    </IconButton>
                </Link>
                <Link to="/share" style={{ textDecoration: 'none', color: 'inherit', margin: "5px"}}>
                    <IconButton className = {classes.iconButton}>
                        <ShareIcon/>
                    </IconButton>
                </Link>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit', margin: "5px"}}>
                    <IconButton className = {classes.iconButton} onClick = {handleSignOut}>
                        <ExitToAppIcon/>
                    </IconButton>
                </Link>
            </div>
            </Toolbar>
            <UserProfileModal open = {open} handleOpen = {handleOpen} handleClose = {handleClose}/>
        </AppBar>
    )
}

export default NavBar;
