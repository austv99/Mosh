import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


class NavBar extends React.Component {
    
    render() {
        return (
            <AppBar position="fixed" className={this.props.appBar}>
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
                    Mosh
                </Typography>
                <Button color="inherit">Log out</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default NavBar;