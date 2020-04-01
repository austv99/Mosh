import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import NavBar from "../components/navBar"
import {DesktopDrawer, MobileDrawer} from "../components/drawers"
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import {Switch, Route} from 'react-router-dom'
import discoverConcerts from '../components/discoverComponents/discoverConcerts'
import discoverPeople from "../components/discoverComponents/discoverPeople"
import discoverShared from "../components/discoverComponents/discoverShared"
import discoverMusic from "../components/discoverComponents/discoverMusic"
import yourConnections from "../components/discoverComponents/yourConnections"

const drawerWidth = 200;

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

class Discover extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mobileOpen : false, 
            primaryTags : ["music", "concerts", "people", "shared"],
            selectedTag: "music"
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
        }), () => {
          if (this.state.mobileOpen === true) {
            this.handleDrawerToggle();
          }
        })
    }
    render () {
        const {classes} = this.props;
        // console.log(this.state.primaryTags);
        return  (
            <div className={classes.root}>
                <CssBaseline />

                {/* Navbar Goes Here */}
                <NavBar appBar = {classes.appBar} menuButton = {classes.menuButton} handleDrawerToggle = {this.handleDrawerToggle}/>
                
                <nav className={classes.drawer}>

                    <MobileDrawer type="discover" container = {classes.container} open = {this.state.mobileOpen} handleDrawerToggle = {this.handleDrawerToggle} 
                    drawerPaper = {classes.drawerPaper} primaryTags = {this.state.primaryTags} handleSelection = {this.handleSelection}
                    selectedTag = {this.state.selectedTag}/>
                    
                    <DesktopDrawer type="discover" drawerPaper = {classes.drawerPaper} toolbar = {classes.toolbar} primaryTags = {this.state.primaryTags}
                    handleSelection = {this.handleSelection} selectedTag = {this.state.selectedTag}/>
                </nav>


                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    
                    {/* Main Body of page goes here */}
                    <Switch>
                        <Route path = "/discover" exact component = {discoverMusic}/>
                        <Route path = "/discover/music"  component = {discoverMusic}/>
                        <Route path = '/discover/concerts'  component = {discoverConcerts}/>
                        <Route path = '/discover/people' component = {discoverPeople}/>
                        <Route path = '/discover/shared' component = {discoverShared}/>
                        <Route path = '/discover/connections' component = {yourConnections}/>
                    </Switch>
                </main>
            </div>
        )
    }
}

Discover.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
};


const discoverText = () => {
  return (
    <Typography>
        Please select something from the side bar
    </Typography>
  )
}


export default withStyles(styles, {withTheme : true}) (Discover);
