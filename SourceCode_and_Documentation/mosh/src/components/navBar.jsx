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


 let avatar_url = "https://scontent.fsyd4-1.fna.fbcdn.net/v/t1.0-9/p960x960/83084529_2426902500959534_3911554766622162944_o.jpg?_nc_cat=111&_nc_sid=09cbfe&_nc_oc=AQllXWmPqGoO6LfqqdQXj3li1iED8jgdjzvkZpYuheTtHyu36Z6s40d69qRY94r_bx4&_nc_ht=scontent.fsyd4-1.fna&_nc_tp=6&oh=37b6656b3e75b655ea06f9a44eb9c2e9&oe=5EBAD30E";

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
{/* class NavBar extends React.Component {
    
    render() {
        return (
            <AppBar position="fixed" className={this.props.appBar} style={{ background:'#000000', opacity:'0.8', boxShadow: 'none'}}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={this.props.handleDrawerToggle}
                    className={this.props.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" style = {{ flexGrow : 1 }}>
                    <Link to={"/home/token/" + this.props.token} style={{ textDecoration: 'none', color: 'inherit '}}>
                    Mosh
                    </Link>
                </Typography>
                <div style={{display: "flex", flexDirection:"row", alignItems:"center"}}>
                    <Link style={{ textDecoration: 'none', color: 'inherit ', margin: "5px"}}>
                    <PersonIcon />
                    </Link>
                    <Link to={"/discover/token/" + this.props.token} style={{ textDecoration: 'none', color: 'inherit ', margin: "5px"}}>
                    <SearchIcon />
                    </Link>
                    <Link to={"/share/token/" + this.props.token} style={{ textDecoration: 'none', color: 'inherit', margin: "5px"}}>
                    <ShareIcon />
                    </Link>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit', margin: "5px"}}>
                        <ExitToAppIcon />
                    </Link>
                </div> */}
                <Link to="/discover" style={{ textDecoration: 'none', color: 'inherit ', margin: "5px"}}>
                    <IconButton className = {classes.iconButton}>
                        <SearchIcon />
                    </IconButton>
                </Link>
                <Link to="/share" style={{ textDecoration: 'none', color: 'inherit', margin: "5px"}}>
                    <IconButton className = {classes.iconButton}>
                        <ShareIcon />
                    </IconButton>
                </Link>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit', margin: "5px"}}>
                    <IconButton className = {classes.iconButton} onClick = {handleSignOut}>
                        <ExitToAppIcon />
                    </IconButton>
                </Link>
            </div>
            </Toolbar>
            <UserProfileModal open = {open} handleOpen = {handleOpen} handleClose = {handleClose} img = {avatar_url} title = "Austin Vuong"/>
        </AppBar>
        )
}
export default NavBar;
