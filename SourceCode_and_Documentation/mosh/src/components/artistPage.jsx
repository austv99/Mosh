import React from 'react'
import Typography from "@material-ui/core/Typography";
import PostCard from './postCard';
import {Grid} from '@material-ui/core'

class artistPage extends React.Component {
    
    render() {
        const cardStyles = {
            marginBottom : "3%"
            }
        var artist = window.location.pathname;
        artist = artist.split("/");
        var name = artist[3];
        console.log(name)

        name = name.replace(/([A-Z])/g, ' $1').trim()
        return(
            <>
            <Typography variant="h2">{name}</Typography>
            <div style = {{display: "flex", flexDirection: "column"}}> 
            <Grid style = {cardStyles}>
            <PostCard title = "Donald Trump" tag={"Tag: " + name}  content = {name + " is great!"} img = "http://highlighthollywood.com/wp-content/uploads/2015/09/donald-trump-incapable-of-embarrassment-r.jpg"/>
        </Grid>
        <Grid style = {cardStyles}>
            <PostCard title = "Sco Mo" tag={"Tag: " + name} content = {"Stay inside, listen to " + name + "!"} img = "https://pbs.twimg.com/profile_images/1116081523394891776/AYnEcQnG_400x400.png"/>
        </Grid>
            </div> 
            </>
        );
    }
}

export default artistPage;