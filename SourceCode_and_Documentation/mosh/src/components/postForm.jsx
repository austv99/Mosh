import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {fire} from "../config/fire"
import { makeStyles } from '@material-ui/core/styles';
import * as firebase from 'firebase/app';

const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: '25ch',
    },
  }));

export default function PostForm(props) {
    const classes = useStyles();

    const [newContent, setContent] = useState("");
    const [tag, setTag] = useState("");
    const db = fire.firestore();
    
    const handleChange = (e) => {
        setContent(e.target.value);
    }

    const handleTagChange = (e) => {
        // console.log(e.target.value);
        setTag(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //Submit to firebase
        let newPost = {
            content: newContent,
            likedBy: [],
            tag: tag,
            uid: fire.auth().currentUser.uid,
        }


        db.collection("posts").add(newPost).then((doc) => {
            setContent("");
            setTag("");

            db.collection("users").doc(fire.auth().currentUser.uid).update({
                posts: firebase.firestore.FieldValue.arrayUnion(doc.id),
            })
        }).catch(err => {
            alert(err.message);
        })
    }
    
    return ( 
        <form onSubmit = {handleSubmit} style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>  
            <TextField
                id="filled-full-width"
                label="What's on your mind?"
                style={{ margin: 8 }}
                placeholder="Share your thoughts..."
                helperText=""
                fullWidth
                margin="normal"
                multiline={true}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
                variant="filled"
                value={newContent}
            />
            <TextField 
                id="filled-search" 
                label="Add an optional tag" 
                type="search" 
                variant="filled" 
                className={classes.textField}  
                value = {tag}
                onChange = {handleTagChange}
            />
            <div style = {{display: "flex", justifyContent: "center", marginBottom: "10px"}}>
                <Button variant="contained" color="primary" type = "submit">
                    Post!
                </Button>
            </div>
        </form>
    );
}