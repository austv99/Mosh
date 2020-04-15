import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PostCard from './postCard';
import {Grid} from '@material-ui/core'


export default function NewsFeed(props) {
        const [post, setPost] = useState("");
        
        const cardStyles = {
            marginBottom : "3%",
            }
        
            const handleChange = content => event => {
            setPost({ ...post, [content]: event.target.value });
        };
        
        var posts = 
            <>
                <Grid style = {cardStyles}>
                    <PostCard title = "Donald Trump" tag="Tag: General" content = "Make music great again!" img = "http://highlighthollywood.com/wp-content/uploads/2015/09/donald-trump-incapable-of-embarrassment-r.jpg"/>
                </Grid>
                <Grid style = {cardStyles}>
                    <PostCard title = "Sco Mo" tag="Tag: General" content = "Stay inside, listen to music" img = "https://pbs.twimg.com/profile_images/1116081523394891776/AYnEcQnG_400x400.png"/>
                </Grid>
            </>
        ;
        
        const addPost = (content) => {
            posts.push(
                <Grid style = {cardStyles}>
                    <PostCard title = "Sco Mo" content = {post} img = "https://pbs.twimg.com/profile_images/1116081523394891776/AYnEcQnG_400x400.png"/>
                </Grid>
            )
            console.log(posts);
        }
        console.log(post);
        
        return(
        <>

            <TextField
                id="filled-full-width"
                label="What's on your mind?"
                style={{ margin: 8 }}
                placeholder="Share your thoughts..."
                helperText=""
                fullWidth
                margin="normal"
                multiline={true}
                onChange={handleChange('post')}
                InputLabelProps={{
                    shrink: true,
                }}
                variant="filled"
            />
            <div style = {{display: "flex", justifyContent: "center", marginBottom: "10px"}}>
                <Button variant="contained" color="primary" onClick={() => addPost(post)}>
                    Post!
                </Button>
            </div>

            <div style = {{display: "flex", flexDirection: "column"}}> 
                {posts}
            </div>
            
        </>
        

        );
    
}