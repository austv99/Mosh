import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

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
  achievements: {
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    justifyContent: "space-between",
  }
}));

const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

//TODO: This page should be linked to a database query
export default function AchievementsModal(props) {
  const classes = useStyles();

    let checked = <CheckIcon style = {{marginLeft : "2%" ,color: "green"}}/>
    let crossed = <ClearIcon style = {{marginLeft : "2%" ,color: "red"}}/>

    const renderCompleted = (achievements, id) => {
        if (achievements == null) {
            return crossed;
        }

        if (achievements[id] === false) {
            return crossed;
        } else {
            return checked;
        }
    }

    const renderMotivation = (achievements) => {
        if (achievements == null) {
            return "Complete one more task to unlock a Bronze medal!!"
        }
        
        let numAchieved = 0;

        Object.keys(achievements).forEach(key => {
            if (achievements[key] === true) {
                numAchieved += 1;
            }
        });
        
        if (numAchieved === 0) {
            return "Complete one more task to unlock a Bronze medal!!"
        } else if (numAchieved === 1) {
            return "Complete one more task to unclock a Silver medal!!"
        } else if (numAchieved === 2) {
            return "Complete one more task to unlock a Gold medal!!"
        } else {
            return "Congrats!! You have completed all tasks!!!"
        }
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
                        <h2 style = {{color: "#fff"}}>My Achievements</h2>
                        <div className = {classes.achievements}>
                            <p> Make a Post </p>
                            {/* <CheckIcon style = {{marginLeft : "2%" , color: "green"}}/> */}
                            {renderCompleted(props.achievements, "post")}
                        </div>
                        <div className = {classes.achievements}>
                            <p> Connect With 5 Users </p>
                            {/* <CheckIcon style = {{marginLeft : "2%" ,color: "green"}}/> */}
                            {renderCompleted(props.achievements, "connections")}
                        </div>
                        <div className = {classes.achievements}>
                            <p> Comment on another user's post </p>
                            {/* <ClearIcon style = {{marginLeft : "2%" ,color: "red"}}/> */}
                            {renderCompleted(props.achievements, "comment")}
                        </div>
                        <h4> {renderMotivation(props.achievements)} </h4> 
                    </ThemeProvider>
                </div>
            </Fade>
        </Modal>
        </div>
    );
}
