import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button"

import {PrimaryList, SecondaryList} from "./discoverBar"

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


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

class MobileDrawer extends React.Component {
    render() {
        return (
            <Hidden smUp implementation="css">
                <Drawer
                container={this.props.container}
                variant="temporary"
                anchor="left"
                open={this.props.open}
                onClose={this.props.handleDrawerToggle}
                classes={{
                    paper: this.props.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                >
                <div>
                    <PrimaryList/>
                    <SecondaryList/>
                </div>
                </Drawer>
            </Hidden>
        )
    }
}

class DesktopDrawer extends React.Component {
    
    render () {
        return (
            <Hidden xsDown implementation="css">
                <Drawer
                classes={{
                    paper: this.props.drawerPaper,
                }}
                variant="permanent"
                open
                >
                <div className={this.props.toolbar} />
                <PrimaryList/>
                <SecondaryList/>
                </Drawer>
            </Hidden>
        )
    }
}

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <NavBar appBar = {classes.appBar} menuButton = {classes.menuButton} handleDrawerToggle = {handleDrawerToggle}/>
      
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <MobileDrawer container = {container} open = {mobileOpen} handleDrawerToggle = {handleDrawerToggle} drawerPaper = {classes.drawerPaper}/>
        <DesktopDrawer drawerPaper = {classes.drawerPaper} toolbar = {classes.toolbar}/>
      </nav>


      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
};

export default ResponsiveDrawer;
