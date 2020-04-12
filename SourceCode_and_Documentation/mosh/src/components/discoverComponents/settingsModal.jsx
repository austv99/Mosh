import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

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
  button: {
    margin: theme.spacing(1),
  },
}));

//TODO: This page should be linked to a database query
export default function SettingsModal(props) {
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
            <div className={classes.paper} style = {{textAlign : "center", display : "flex", flexDirection: "column"}}>
                <h2>Profile Settings</h2>
                <Button
                    variant="outlined"
                    className={classes.button}
                    endIcon={<ArrowForwardIcon/>}
                >
                    Privacy Settings
                </Button>
                <Button
                    variant="outlined"
                    className={classes.button}
                    endIcon={<ArrowForwardIcon/>}
                >
                    Connected Accounts
                </Button>
                <Button
                    variant="outlined"
                    className={classes.button}
                    endIcon={<ArrowForwardIcon/>}
                >
                    Upload New Profile Picture
                </Button>
                <div style = {{marginTop : "20%"}}>
                </div>

                <Button
                    variant="contained"
                    color = "secondary"
                    className={classes.button}
                    endIcon={<ArrowForwardIcon/>}
                >
                    Deactivate Account
                </Button>
            </div>
        </Fade>
    </Modal>
    </div>
  );
}
