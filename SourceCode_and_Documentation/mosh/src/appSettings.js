// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import MainApp from "./main"

// const drawerWidth = 240;

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//   },
//   drawer: {
//     [theme.breakpoints.up('sm')]: {
//       width: drawerWidth,
//       flexShrink: 0,
//     },
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up('sm')]: {
//       display: 'none',
//     },
//   },
//   // necessary for content to be below app bar
//   toolbar: theme.mixins.toolbar,
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
// }));

// export default function App(props) {
//     const { container } = props;
//     const classes = useStyles();
//     // const theme = useTheme();
  
//     return (
//       <MainApp classes = {classes} container = {container} />
//     );
//   }
  
//   App.propTypes = {
//     /**
//      * Injected by the documentation to work in an iframe.
//      * You won't need it on your project.
//      */
//     container: PropTypes.any,
//   };
