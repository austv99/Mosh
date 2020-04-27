import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button"
import {fire} from "../../config/fire"
import {useEffect} from "react"

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Divider, TextField } from '@material-ui/core';

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
  button: {
    margin: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

//TODO: This page should be linked to a database query
export default function CommentsModal(props) {
    const classes = useStyles();
    const [comment, setComment] = React.useState("");

    const [comments, setComments] = React.useState([]);

    const renderComment = (author, content, id) => {
        return (
            <div key = {id}>
                <h4 style = {{color: "white", marginBottom: "0.5em"}}> <b>{author}</b> </h4>
                <p style = {{marginTop : "0.5em"}}> {content} </p>
            <Divider/>
            </div>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let db = fire.firestore();

        db.collection("comments").add({
            content: comment,
            postId: props.id,
            userRef: db.doc("users/" + fire.auth().currentUser.uid),
        }).then((doc) => {
            setComment("");
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        let db = fire.firestore();

        var unsub = db.collection("comments").where("postId", "==", props.id).onSnapshot(snapShot => {
            let commentsList = [];
            let promises = []
            
            snapShot.forEach(doc => {
                let commentData = {};
                commentData["id"] = doc.id;
                commentData["content"] = doc.data().content;

                commentsList.push(commentData);

                let promise = doc.data().userRef.get();
                promises.push(promise);
            });


            Promise.all(promises).then(promises => {
                for (let i = 0; i < promises.length; i++) {
                    commentsList[i]["author"] = promises[i].data().displayName;
                }
            })

            // console.log(commentsList);
            setComments(commentsList);
        }) 

        return () => {
            unsub();
        }
    }, [props.id])
    
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
                <div className={classes.paper} style = {{textAlign : "center", display : "flex", flexDirection: "column"}}>
                    <ThemeProvider theme = {theme}>
                        <h2 style = {{color: "#fff"}}>Comments</h2>
                        <div style = {{textAlign : "left"}}>
                            {comments.map(comment => 
                                renderComment(comment.author, comment.content, comment.id)
                            )}
                        </div>


                        <form style = {{display: "flex", flexDirection: "column", alignItems: "center"}} onSubmit = {handleSubmit}>
                            <TextField
                                id="standard-multiline-static"
                                label="Add comment"
                                multiline
                                style = {{marginBottom: "4%", marginTop: "4%"}}
                                variant = "outlined"
                                onChange = {(e) => {
                                    setComment(e.target.value);
                                }}
                                value = {comment}
                            />
                            <Button variant="contained" color="secondary" type = "submit">
                                Add Comment
                            </Button>
                        </form>
                    </ThemeProvider>
                </div>
            </Fade>
        </Modal>
        </div>
    );
}
