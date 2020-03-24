import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import NavBar from "./components/navBar"
import {DesktopDrawer, MobileDrawer} from "./components/drawers"
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const drawerWidth = 240;

const styles = theme => ({
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
});

class MainApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mobileOpen : false, 
            primaryTags : ["Music", "Concerts", "People", "Shared With Me"],
            selectedTag: "Music"
        }
    }

    handleDrawerToggle = () => {
        this.setState((state) => ({
            mobileOpen : !state.mobileOpen
        }))
    }; 

    handleSelection = (event, title) => {
        this.setState(() => ({
            selectedTag : title
        }))
    }
    
    render () {
        const {classes} = this.props;
        
        return  (
            <div className={classes.root}>
                <CssBaseline />
      
                <NavBar appBar = {classes.appBar} menuButton = {classes.menuButton} handleDrawerToggle = {this.handleDrawerToggle}/>
                
                <nav className={classes.drawer}>

                    <MobileDrawer container = {classes.container} open = {this.state.mobileOpen} handleDrawerToggle = {this.handleDrawerToggle} 
                    drawerPaper = {classes.drawerPaper} primaryTags = {this.state.primaryTags} handleSelection = {this.handleSelection}
                    selectedTag = {this.state.selectedTag}/>
                    
                    <DesktopDrawer drawerPaper = {classes.drawerPaper} toolbar = {classes.toolbar} primaryTags = {this.state.primaryTags}
                    handleSelection = {this.handleSelection} selectedTag = {this.state.selectedTag}/>
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
        )
    }
}

MainApp.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
};

export default withStyles(styles, {withTheme : true}) (MainApp);
