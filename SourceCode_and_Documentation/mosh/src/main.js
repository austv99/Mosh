import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import NavBar from "./components/navBar"
import {DesktopDrawer, MobileDrawer} from "./components/drawer"

class MainApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mobileOpen : false, 
            primaryTags : ["Music", "Concerts", "People", "Shared With Me"],
            secondaryTags : ["Your Connections"],
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
        return  (
            <div className={this.props.classes.root}>
                <CssBaseline />
      
                <NavBar appBar = {this.props.classes.appBar} menuButton = {this.props.classes.menuButton} handleDrawerToggle = {this.handleDrawerToggle}/>
                
                <nav className={this.props.classes.drawer}>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <MobileDrawer container = {this.props.container} open = {this.state.mobileOpen} handleDrawerToggle = {this.handleDrawerToggle} 
                    drawerPaper = {this.props.classes.drawerPaper} primaryTags = {this.state.primaryTags} handleSelection = {this.handleSelection}
                    selectedTag = {this.state.selectedTag}/>
                    
                    <DesktopDrawer drawerPaper = {this.props.drawerPaper} toolbar = {this.props.classes.toolbar} primaryTags = {this.state.primaryTags}
                    handleSelection = {this.handleSelection} selectedTag = {this.state.selectedTag}/>
                </nav>


                <main className={this.props.classes.content}>
                    <div className={this.props.classes.toolbar} />
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

export default MainApp;
