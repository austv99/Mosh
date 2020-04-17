import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShareIcon from '@material-ui/icons/Share';
import PersonIcon from '@material-ui/icons/Person';


class NavBar extends React.Component {
    
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
                </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default NavBar;