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
  // let didMount = false;

  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = React.useState({});

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

  return (
    <div>
        <Modal
            // aria-labelledby="transition-modal-title"
            // aria-describedby="transition-modal-description"
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
                    <ImageAvatar img = {user.photoURL} /> 
                    <h2 style = {{color: '#fff'}}>{user.displayName}</h2>
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
    </div>
  );
}
