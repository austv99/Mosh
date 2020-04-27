import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button"
import ImageAvatar from "../avatar"

import {fire} from "../../config/fire"
import * as firebase from 'firebase/app';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "#292b2a",
    color: "rgba(255, 255, 255, 0.7)",
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
  },
}));

// const FieldValue = require('firebase-admin').firestore.FieldValue;


//TODO: This page should be linked to a database query
export default function ProfileModal(props) {
  const classes = useStyles();


  const handleConnect = (e, id) => {
    // console.log(id);
    
    let db = fire.firestore();
    let userRef = db.collection("users").doc(fire.auth().currentUser.uid);
    let targetRef = db.collection("users").doc(id);

    userRef.update({
      connections: firebase.firestore.FieldValue.arrayUnion(id),
    });

    targetRef.update({
      connections: firebase.firestore.FieldValue.arrayUnion(fire.auth().currentUser.uid),
    });
  }

  const handleDisconnect = (e, id) => {
    let db = fire.firestore();
    let userRef = db.collection("users").doc(fire.auth().currentUser.uid);
    let targetRef = db.collection("users").doc(id);

    userRef.update({
      connections: firebase.firestore.FieldValue.arrayRemove(id),
    });

    targetRef.update({
      connections: firebase.firestore.FieldValue.arrayRemove(fire.auth().currentUser.uid),
    });
  }

  return (
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
                <ImageAvatar img = {props.img} /> 
                <h2 style = {{color: "#fff"}}>{props.title}</h2>
                <p><b>Interests</b> : {props.interests} </p>
                <p><b>Favourite Album</b> : {props.favAlbum} </p>
                <p><b>Favourite Artist</b> : {props.favArtist} </p>
                <p><b>Resides In</b> : Australia </p>
                <p><b>Connected Platforms</b> : Facebook, Spotify, Apple Music</p>
                <Button variant="contained" color={props.connected ? "secondary" : "primary"} onClick = {props.connected ? (e) => handleDisconnect(e, props.id) : (e) => handleConnect(e, props.id)}>
                    {props.connected ? "Disconnect" : "Connect"}
                </Button>
            </div>
          </Fade>
      </Modal>
  );
}
