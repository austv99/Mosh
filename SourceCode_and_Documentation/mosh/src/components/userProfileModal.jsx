import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SettingsIcon from '@material-ui/icons/Settings';
import ImageAvatar from "./avatar"
import { IconButton } from '@material-ui/core';
import SettingsModal from "./discoverComponents/settingsModal"
import {fire} from "../config/fire"
import {useEffect} from "react";
import ProgressBar from './progressBar';

import SilverMedal from "./gamification/silver-medal.png"
import GoldMedal from "./gamification/gold-medal.png"
import BronzeMedal from "./gamification/bronze-medal.png"
import EmptyMedal from "./gamification/empty-medal.png"

import CloseIcon from '@material-ui/icons/Close';

import AchievementsModal from './achievementsModal';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "#292b2a",
    color: "rgba(255, 255, 255, 0.7)",
    // backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
  },
}));

//TODO: This page should be linked to a database query
export default function UserProfileModal(props) {
  const classes = useStyles();
  var user = fire.auth().currentUser;
  var db = fire.firestore();

  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  
  const [achievementsOpen, setAchievementsOpen] = React.useState(false);
  const [achievements, setAchievements] = React.useState(null);

  const handleAchievementsOpen = () => {
    setAchievementsOpen(true);
    props.handleClose();
  }

  const handleAchievementsClose = () => {
    setAchievementsOpen(false);
    props.handleOpen();
  }

  const handleSettingsOpen = () => {
    setOpen(true);
    props.handleClose();
  };

  const handleSettingsClose = () => {
    setOpen(false);
    props.handleOpen();
  };

  useEffect(() => {
    if (user.uid != null) {
      // console.log("Getting data")
      var unsub = db.collection("users").doc(user.uid).onSnapshot(doc => {
        if (doc != null) {
          setUserData(doc.data());
        }
      })

      return (()=> {
        unsub();
      })
    } 
  }, [user, db])

  const formatInterests = (interests) => {
    if (interests == null) {
      return "";
    }
    
    let output = "";

    interests.forEach(interest => {
      output += interest + " ";
    });

    return output;
  }
  
  

  const getProgress = (achievements) => {
    if (achievements == null) {
      return 0;
    }
    
    let numAchieved = 0;
    let numKeys = 0;

    Object.keys(achievements).forEach(key => {
      if (achievements[key] === true) {
        numAchieved += 1;
      }
      numKeys += 1;
    });

    let result = Math.ceil((numAchieved/numKeys) * 100);
    return result;
  }

  const renderMedal = (achievements) => {
    if (achievements == null) {
      return <img src = {EmptyMedal} style = {{marginBottom: "2%"}} alt = ""/>
    }
    
    let numAchieved = 0;

    Object.keys(achievements).forEach(key => {
      if (achievements[key] === true) {
        numAchieved += 1;
      }
    });

    if (numAchieved === 0) {
      return <img src = {EmptyMedal} style = {{marginBottom: "2%"}} alt = ""/>
    } else if (numAchieved === 1) {
      return <img src = {BronzeMedal} style = {{marginBottom: "2%"}} alt = ""/>
    } else if (numAchieved === 2) {
      return <img src = {SilverMedal} style = {{marginBottom: "2%"}} alt = ""/> 
    } else {
      return <img src = {GoldMedal} style = {{marginBottom: "2%"}} alt = ""/>
    }
  }
  
  useEffect(() => {
    const calculateAchievements = () => {
      let completed = {};
      
      if (userData == null) {
        console.log("Nothing happened");
        return completed;
      } else {
        //Check if post has been made
        if (userData.posts.length >= 1) {
          completed["post"] = true;
        } else {
          completed["post"] = false;
        }
  
        //Check if >= 5 connections
        if (userData.connections.length >= 5) {
          completed["connections"] = true;
        } else {
          completed["connections"] = false;
        }
  
        if (userData.comments.length >= 1) {
          completed["comment"] = true;
        } else {
          completed["comment"] = false;
        }

        return completed;
      }
    }
    
    setAchievements(calculateAchievements());
  }, [userData])

  return (
    <div>
        <Modal
            className={classes.modal}
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open}>
                <div className={classes.paper} style = {{textAlign : "center"}}>
                    <div style = {{display : "flex", justifyContent: "flex-end"}}>
                      <IconButton onClick = {() => {
                        props.handleClose();
                        // console.log("test");
                      }}>
                        <CloseIcon style = {{color: "white"}}/>
                      </IconButton>
                    </div>

                    <ImageAvatar img = {user.photoURL} /> 
                    <h2 style = {{color: '#fff', marginBottom: "0"}}>{user.displayName}</h2>
                    <h3 style = {{marginBottom: "0"}}> My Achievement Progress </h3>
                    <IconButton onClick = {handleAchievementsOpen}>
                      {renderMedal(achievements)}
                    </IconButton>
                    <ProgressBar progress = {getProgress(achievements)}/>
                    
                    <p><b>Interests</b> : {formatInterests(userData == null ? null : userData.interests)} </p>
                    <p><b>Favourite Album</b> : {userData != null ? userData.favAlbum : ""} </p>
                    <p><b>Favourite Artist</b> : {userData != null ? userData.favArtist : ""} </p>
                    <p><b>Other Info</b> : Placeholder Text</p>
                    <IconButton onClick = {handleSettingsOpen} style = {{color: "inherit"}}>
                        <SettingsIcon/>
                    </IconButton>
                </div>
            </Fade>
        </Modal>
        <SettingsModal open = {open} handleClose = {handleSettingsClose}/>
        <AchievementsModal open = {achievementsOpen}  handleClose = {handleAchievementsClose} achievements = {achievements}/>
    </div>
  );
}
