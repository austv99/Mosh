import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import {DiscPri, DiscSec} from "./discoverComponents/discoverBar"
import {HomePri , HomeSec} from "./homescreenBar"

class MobileDrawer extends React.Component {
    render() {
        //console.log(window.location.pathname);
        var discoverTags = ["music", "concerts", "people", "shared"];
        var renderBars;
        if (window.location.pathname.startsWith("/discover")) {
            renderBars = 
                <>
                <DiscPri primaryTags = {discoverTags} token={this.props.token} handleSelection = {this.props.handleSelection} selectedTag = {this.props.selectedTag}/>
                <DiscSec selectedTag = {this.props.selectedTag} token={this.props.token} handleSelection = {this.props.handleSelection}/>
                </>
            ;
        } else {
            renderBars = 
            <>
            <HomePri primaryTags = {this.props.primaryTags} rerenderCallback = {this.props.rerenderCallback} handleSelection = {this.props.handleSelection} selectedTag = {this.props.selectedTag}/>
            <HomeSec selectedTag = {this.props.selectedTag} handleSelection = {this.props.handleSelection}/>
            </>
            ;
        }
        return (
            <>
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
                <div className={this.props.toolbar} />
                {renderBars}
                </Drawer>
            </Hidden>
            </>
        )
    }
}

class DesktopDrawer extends React.Component {
    render () {
        //console.log(window.location.pathname)
        var discoverTags = ["music", "concerts", "people", "shared"];
        var renderBars;
        // console.log(this.props.primaryTags);
        
        if (window.location.pathname.startsWith("/discover")) {
            renderBars = 
                <>
                <DiscPri primaryTags = {discoverTags} token={this.props.token} handleSelection = {this.props.handleSelection} selectedTag = {this.props.selectedTag}/>
                <DiscSec selectedTag = {this.props.selectedTag} token={this.props.token} handleSelection = {this.props.handleSelection}/>
                </>
            ;
        } else {
            //console.log(window.gapi)
            renderBars = 
            <>
            <HomePri primaryTags = {this.props.primaryTags} rerenderCallback = {this.props.rerenderCallback} handleSelection = {this.props.handleSelection} selectedTag = {this.props.selectedTag}/>
            <HomeSec selectedTag = {this.props.selectedTag}  handleSelection = {this.props.handleSelection}/>
            </>
            ;
        }
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
                {renderBars}
                </Drawer>
            </Hidden>
        )
    }
}

export {MobileDrawer, DesktopDrawer}