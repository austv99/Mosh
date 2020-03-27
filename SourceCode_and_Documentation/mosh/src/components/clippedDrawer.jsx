// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import AppBar from '@material-ui/core/AppBar';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';

// import {PrimaryList, SecondaryList} from "./discoverBar"
// import NavBar from"./navBar"

// const drawerWidth = 240;

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     marginLeft: drawerWidth,
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   contentShift: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     marginLeft: 0,
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   // necessary for content to be below app bar
//   toolbar: theme.mixins.toolbar,
// }));


// class ClippedDrawer extends React.Component {
//   handleDrawerClose = () => {
//     this.setState((state) => ({
//       open: !state.open
//     }))
//   }

//   render () {
//     return (
//       <Drawer
//         className={this.props.drawer}
//         variant="persistent"
//         classes={{
//           paper: this.props.drawerPaper,
//         }}
//         open = {this.props.open}
//       >
//         <div className={this.props.toolbar} />
//         <PrimaryList/>
//         <SecondaryList/>
//       </Drawer>
//     )
//   }
// }

// class NavSideBar extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       open : true
//     }
//   }

//   handleClick = () => {
//     this.setState((state) => ({
//       open: !state.open
//     }))
//   }
  
//   render() {
//     return (
//       <div>
//         <AppBar position="fixed" className={this.props.appBar}>
//           <NavBar handleClick = {this.handleClick}/>
//         </AppBar>
//         <ClippedDrawer drawer = {this.props.drawer} toolbar = {this.props.toolbar} drawerPaper = {this.props.drawerPaper} open = {this.state.open}/>
//         <MainContent content = {this.props.content} contentShift = {this.props.contentShift} toolbar = {this.props.toolbar} open = {this.state.open}/>
//       </div>
//     )
//   }
// }

// class MainContent extends React.Component {
//   render() {
//     return (
//       <main className={this.props.open ? this.props.content: this.props.contentShift}> 
//         <div className={this.props.toolbar} />
//         <Typography paragraph>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
//           ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
//           facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
//           gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
//           donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
//           adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
//           Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
//           imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
//           arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
//           donec massa sapien faucibus et molestie ac.
//         </Typography>
//       </main>
//     )
//   }
// }



// export default function CustomBar() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <NavSideBar appBar = {classes.appBar} drawer = {classes.drawer} toolbar = {classes.toolbar} drawerPaper = {classes.drawerPaper} 
//       content = {classes.content} contentShift = {classes.contentShift}/>
//     </div>
//   );
// }
