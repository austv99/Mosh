import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from "../components/navBar"
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import newsFeed from '../components/newsFeed'
import artistPage from '../components/artistPage'
import { Switch, Route } from 'react-router-dom'
import { DesktopDrawer, MobileDrawer } from "../components/drawers";

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
    backgroundColor: "#292b2a",
    color: "white",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class Homescreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mobileOpen : false, 
            primaryTags : ["Drake", "Travis Scott", "Lil Uzi Vert", "The Weeknd"],
            selectedTag: ""
        }
    }

    // componentDidMount() {
    //   let db = fire.firestore();

    //   db.collection('posts').get().then(snapshots => {
    //     snapshots.forEach(doc => {
    //       console.log(doc.data());
    //     });
    //   }).catch(err => {
    //     alert(err.message);
    //   })
    // }

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
        
        return  (
            <div className={classes.root}>
                <CssBaseline />

                {/* Navbar Goes Here */}
                <NavBar appBar = {classes.appBar} menuButton = {classes.menuButton} handleDrawerToggle = {this.handleDrawerToggle}/>
                
                <nav className={classes.drawer}>

                    <MobileDrawer type="home" container = {classes.container} open = {this.state.mobileOpen} handleDrawerToggle = {this.handleDrawerToggle} 
                    drawerPaper = {classes.drawerPaper} primaryTags = {this.state.primaryTags} handleSelection = {this.handleSelection}
                    selectedTag = {this.state.selectedTag}/>
                    
                    <DesktopDrawer type="home" drawerPaper = {classes.drawerPaper} toolbar = {classes.toolbar} primaryTags = {this.state.primaryTags}
                    handleSelection = {this.handleSelection} selectedTag = {this.state.selectedTag}/>
                </nav>


                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    
                    {/* Main Body of page goes here */}
                    <Switch>
                        <Route path = "/home" exact component = {newsFeed}/>
                        <Route path = "/home/Drake" component= {artistPage}/>
                        <Route path = "/home/TravisScott" component= {artistPage}/>
                        <Route path = "/home/LilUziVert" component= {artistPage}/>
                        <Route path = "/home/TheWeeknd" component= {artistPage}/>  
                    </Switch>
                </main>
            </div>
        )
    }
}

Homescreen.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
};


// const discoverText = () => {
//   return (
//     <Typography>
//         Please select something from the side bar
//     </Typography>
//   )
// }


export default withStyles(styles, {withTheme : true}) (Homescreen);
