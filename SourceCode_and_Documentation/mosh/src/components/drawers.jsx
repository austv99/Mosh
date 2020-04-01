import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import {DiscPri, DiscSec} from "./discoverComponents/discoverBar"
import {HomePri , HomeSec} from "./homescreenBar"

class MobileDrawer extends React.Component {
    render() {
        console.log(window.location.pathname);
        var discoverTags = ["music", "concerts", "people", "shared"];
        var artistTags = ["Drake", "Travis Scott", "Lil Uzi Vert", "The Weeknd"];
        var renderBars;
        if (window.location.pathname.startsWith("/discover")) {
            renderBars = [
                <>
                <DiscPri primaryTags = {discoverTags} handleSelection = {this.props.handleSelection} selectedTag = {this.props.selectedTag}/>
                <DiscSec selectedTag = {this.props.selectedTag} handleSelection = {this.props.handleSelection}/>
                </>
            ];
        } else {
            renderBars = [
            <>
            <HomePri primaryTags = {artistTags} handleSelection = {this.props.handleSelection} selectedTag = {this.props.selectedTag}/>
            <HomeSec selectedTag = {this.props.selectedTag} handleSelection = {this.props.handleSelection}/>
            </>
            ];
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
                <div>
                {renderBars}}
                </div>
                </Drawer>
            </Hidden>
            </>
        )
    }
}

class DesktopDrawer extends React.Component {
    render () {
        console.log(window.location.pathname);
        var discoverTags = ["music", "concerts", "people", "shared"];
        var artistTags = ["Drake", "Travis Scott", "Lil Uzi Vert", "The Weeknd"];
        var renderBars;
        if (window.location.pathname.startsWith("/discover")) {
            renderBars = [
                <>
                <DiscPri primaryTags = {discoverTags} handleSelection = {this.props.handleSelection} selectedTag = {this.props.selectedTag}/>
                <DiscSec selectedTag = {this.props.selectedTag} handleSelection = {this.props.handleSelection}/>
                </>
            ];
        } else {
            renderBars = [
            <>
            <HomePri primaryTags = {artistTags} handleSelection = {this.props.handleSelection} selectedTag = {this.props.selectedTag}/>
            <HomeSec selectedTag = {this.props.selectedTag} handleSelection = {this.props.handleSelection}/>
            </>
            ];
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