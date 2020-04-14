import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MusicCard from '../components/discoverComponents/discoverCards/musicCard';
import NavBarShare from "../components/navBarShare";
import CssBaseline from '@material-ui/core/CssBaseline';


const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));

  const styles = {
    divContainer: {
        fontFamily: "Lato",
        display: "flex", 
        flexDirection: "column",
        justifyContent: "flex-start",
        color: "#FFFFFF",
        paddingTop: "15vh",
        alignItems: "center",
    },
  }
  const cardStyles = {
    margin : "10px",
    width: "80vw",
}
  

export default function Share () {
    const classes = useStyles();
    
    return (
    <>
        <CssBaseline/>
        <NavBarShare />
        <div style={styles.divContainer}>
        <div style={{paddingBottom: "7vh"}}>
            <Paper component="form" className={classes.root} style={{magrin: "5px"}}>
            <InputBase
                className={classes.input}
                placeholder="Search for Music to Share"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            </Paper>
        </div>
        <Grid style = {cardStyles}>
                <MusicCard title = "Stolen" artist = "Talia Mar" album = "Stolen" img = "https://t2.genius.com/unsafe/220x0/https%3A%2F%2Fimages.genius.com%2Fad7566342b1b782f8a18d69ed2bb2572.960x960x1.jpg"/>
        </Grid>
        </div>
    </>
    );

}