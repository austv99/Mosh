import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button"

import ImageAvatar from "../avatar"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    // outline: 'none',
  },
}));

//TODO: This page should be linked to a database query
export default function ProfileModal(props) {
  const classes = useStyles();

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
                <ImageAvatar img = {props.img} /> 
                <h2>{props.title}</h2>
                <p>Interests : Sample Interests</p>
                <p>Favourite Album: Place Holder Artist</p>
                <p>Favourite Artist : Some Wierd and unknown artist</p>
                <p>Resides In: Some Country</p>
                <p>Connected Platforms: Facebook, Spotify, Apple Music</p>
                <Button variant="contained" color={props.connected ? "primary" : "secondary"}>
                    {props.connected ? "Connect" : "Disconnect"}
                </Button>
            </div>
        </Fade>
    </Modal>
    </div>
  );
}
