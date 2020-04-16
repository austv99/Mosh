import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


class NavBar extends React.Component {

    render() {
        return (
            <AppBar position="fixed" className={this.props.appBar}>
                <Toolbar>
                {/* <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={this.props.handleDrawerToggle}
                    className={this.props.menuButton}
                >
                    <MenuIcon />
                </IconButton> */}
                <Typography variant="h6" style = {{ flexGrow : 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit '}}>
                    Mosh
                    </Link>
                </Typography>
                <Link to="/signin" style={{ textDecoration: 'none', color: 'inherit '}}>
                <Button color="inherit">Sign In</Button>
                </Link>
                <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit '}}>
                <Button color="inherit">Sign Up</Button>
                </Link>
                </Toolbar>
            </AppBar>
        )
    }
}

export default NavBar;
