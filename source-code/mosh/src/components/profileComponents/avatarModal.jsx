import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button"

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { TextField } from '@material-ui/core';
import {fire} from "../../config/fire"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "#292b2a",
    // color: "rgba(255, 255, 255, 0.7)",
    // backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
  },
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
}));

const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

//TODO: This page should be linked to a database query
export default function AvatarModal(props) {
    const classes = useStyles();
    const [url, setUrl] = React.useState("");

    const handleChange = (e) => {
        setUrl(e.target.value);
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      let db = fire.firestore();
      let auth = fire.auth();

      auth.currentUser.updateProfile({
        photoURL: url
      }).then(() => {
        let dbUpdate = db.collection("users").doc(auth.currentUser.uid).update({
          photoURL: url
        })

        dbUpdate.then(() => {
          setUrl("");
          props.handleClose();
        }).catch( err => {
          alert(err.message);
        })
      }).catch(err=> {
        alert(err.message);
      })
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
            <div className={classes.paper} style = {{textAlign : "center", display : "flex", flexDirection: "column"}}>
                <ThemeProvider theme = {theme}>
                    <h2 style = {{color: "#fff"}}>Profile Settings</h2>

                    <form className = {classes.root} onSubmit = {handleSubmit}>
                      <TextField helperText = "Enter URL Here" required value = {url} onChange = {handleChange} />
                      
                      <Button variant = "contained" color = "primary" type = "submit">
                          Update Avatar
                      </Button>
                    </form>
                </ThemeProvider>
            </div>
        </Fade>
    </Modal>
    </div>
  );
}
