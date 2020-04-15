import React from 'react'
import PersonCard from "./discoverCards/personCard"

function discoverPeople() {
    const cardStyles = {
        marginBottom : "3%"
    }
    
    return (
        <div style = {{display: "flex", flexDirection: "column"}}> 
            <div style = {cardStyles}>
                <PersonCard title = "Sco Mo" likes = "Shaking Hands, Pauline Hansen" connected = {true} img = "https://pbs.twimg.com/profile_images/1116081523394891776/AYnEcQnG_400x400.png"/>
            </div>
            <div style = {cardStyles}>
                <PersonCard title = "Donald Trump" likes = "Making America Great Again" connected = {true} img = "http://highlighthollywood.com/wp-content/uploads/2015/09/donald-trump-incapable-of-embarrassment-r.jpg"/>
            </div>
        </div>
    )
}

export default discoverPeople