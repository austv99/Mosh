import React, { useState } from 'react';
import PostCard from './postCard';
import {Grid} from '@material-ui/core'
import {fire} from "../config/fire"
import {useEffect} from "react"

export default function NewsFeed(props) {
    const [posts, setPosts] = useState([]);
    const db = fire.firestore();

    const cardStyles = {
        marginBottom : "3%",
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
        var unsub;
        // console.log("Mounting news feed");
        
        if (props.artist != null) {
            unsub = db.collection("posts").where("tag", "==", props.artist).onSnapshot(snapshot => {                
                let newPosts = [];
                    
                    snapshot.forEach(doc => {
                    let post = doc.data();
                    // console.log(post);

                    post["id"] = doc.id;

                    newPosts.push(post);
                })

                setPosts(newPosts);
            })
        } else {
            unsub = db.collection("posts").onSnapshot(snapshot => {                
                let newPosts = [];
                    
                    snapshot.forEach(doc => {
                    let post = doc.data();
                    // console.log(post);

                    post["id"] = doc.id;

                    newPosts.push(post);
                })

                setPosts(newPosts);
            })
        }

        return () => {
            // console.log("Unmounting newsfeed")
            unsub();
        };
    }, [db, props.artist])

    
    return(
    <>
        <div style = {{display: "flex", flexDirection: "column"}}> 
            {posts.map((post) => 
                <Grid key = {post.id} style = {cardStyles}>
                    <PostCard title = {post.author} content = {post.content} img = {post.img} count = {post.likedBy.length} 
                    tag = {post.tag} handleLike = {(e) => handleLike(e, post.id)}/>
                </Grid>
            )}
        </div>
    </>
    );
    
}