import React from 'react'
import {Grid} from '@material-ui/core'
import PersonCard from "../personCard"

function yourConnections() {
    const cardStyles = {
        marginBottom : "3%"
    }
    
    return (
        <div style = {{display: "flex", flexDirection: "column"}}> 
            <Grid style = {cardStyles}>
                <PersonCard title = "Sco Mo" likes = "Shaking Hands, Pauline Hansen" img = "https://pbs.twimg.com/profile_images/1116081523394891776/AYnEcQnG_400x400.png"/>
            </Grid>
            <Grid style = {cardStyles}>
                <PersonCard title = "Donald Trump" likes = "Making America Great Again" img = "http://highlighthollywood.com/wp-content/uploads/2015/09/donald-trump-incapable-of-embarrassment-r.jpg"/>
            </Grid>
            <Grid style = {cardStyles}>
                <PersonCard title = "Aang" likes = "Not being the last airbender lolz" img = "https://vignette.wikia.nocookie.net/avatar/images/7/79/Pilot_-_Aang.png/revision/latest/top-crop/width/360/height/360?cb=20120311133235"/>
            </Grid>
            <Grid style = {cardStyles}>
                <PersonCard title = "Sun Wukong" likes = "The World's Biggest Migraine Relief" img = "https://journeytothewest3.files.wordpress.com/2011/05/55258641-1255926094-luc-tieu-linh-dong-3.jpg"/>
            </Grid>
    </div>
    )
}

export default yourConnections