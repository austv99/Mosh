import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PostCard from './postCard';
import {Grid} from '@material-ui/core'
import {fire} from "../config/fire"
import {useEffect} from "react"
// import {fire} from "../config/fire"

export default function NewsFeed(props) {
        const [posts, setPosts] = useState([]);
        const [newContent, setContent] = useState("");
        const db = fire.firestore();

        const cardStyles = {
            marginBottom : "3%",
        }
        
        const handleChange = (e) => {
            setContent(e.target.value);
        }

        const handleSubmit = (e) => {
            e.preventDefault();

            //Submit to firebase
            let newPost = {
                author: fire.auth().currentUser.displayName,
                content: newContent,
                img: fire.auth().currentUser.photoURL,
                likedBy: [],
            }


            db.collection("posts").add(newPost).then(() => {
                setContent("");
            }).catch(err => {
                alert(err.message);
            })
        }

        const handleLike = (event, postid) => {
            let uid = fire.auth().currentUser.uid;

            db.collection('posts').doc(postid).get().then(doc => {
                if (doc !== null) {
                    let likes = doc.data().likedBy;
                    // console.log(likes);

                    for (let i = 0; i < likes.length; i++) {
                        if (likes[i] === uid) {
                            // console.log("Already liked")
                            return;
                        }
                    }
                    
                    likes.push(uid);

                    db.collection("posts").doc(postid).update({
                        likedBy: likes,
                    }).catch(err => {
                        alert(err.message);
                    })
                }
            }).catch(err => {
                alert(err.msg);
            })
        }
                
        useEffect(() => {
            var unsub = db.collection("posts").onSnapshot(snapshot => {                
                let newPosts = [];
                 
                 snapshot.forEach(doc => {
                    let post = doc.data();
                    // console.log(post);

                    post["id"] = doc.id;

                    newPosts.push(post);
                })

                setPosts(newPosts);
            })

            return () => {
                unsub();
            };
        }, [db])

        
        return(
        <>
            <form onSubmit = {handleSubmit}>  
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
                <div style = {{display: "flex", justifyContent: "center", marginBottom: "10px"}}>
                    <Button variant="contained" color="primary" type = "submit">
                        Post!
                    </Button>
                </div>
            </form>
           

            <div style = {{display: "flex", flexDirection: "column"}}> 
                {posts.map((post) => 
                    <Grid key = {post.id} style = {cardStyles}>
                        <PostCard title = {post.author} tag="Tag: General" content = {post.content} img = {post.img} count = {post.likedBy.length} handleLike = {(e) => handleLike(e, post.id)}/>
                    </Grid>
                )}
            </div>
            
        </>
        

        );
    
}