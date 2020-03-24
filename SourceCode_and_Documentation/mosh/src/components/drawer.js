import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import {PrimaryList, SecondaryList} from "./discoverBar"

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
                    <PrimaryList primaryTags = {this.props.primaryTags} handleSelection = {this.props.handleSelection} selectedTag = {this.props.selectedTag}/>
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
                <PrimaryList primaryTags = {this.props.primaryTags} handleSelection = {this.props.handleSelection} selectedTag = {this.props.selectedTag}/>
                <SecondaryList/>
                </Drawer>
            </Hidden>
        )
    }
}

export {MobileDrawer, DesktopDrawer}