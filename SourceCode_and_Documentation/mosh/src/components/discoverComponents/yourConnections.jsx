import React from 'react'
import {Grid} from '@material-ui/core'
import PersonCard from "./discoverCards/personCard"
import {fire} from "../../config/fire"
import {useEffect} from 'react'

export default function YourConnections() {
    let db = fire.firestore();
    let user = fire.auth().currentUser;

    const [users, setUsers] = React.useState([]); 

    useEffect(() => {
        
        var unsub = db.collection("users").where("connections", "array-contains", user.uid).onSnapshot(snapShot => {
            let userList = [] 

            snapShot.forEach(doc => {
                let connectionData = doc.data();

                connectionData["id"] = doc.id;
                userList.push(connectionData);
            });

            setUsers(userList);
        })

        return () => {
            unsub();
        }
    }, [db, user])

    const formatInterests = (interests) => {
        if (interests == null) {
          return "";
        }
        
        let output = "";
    
        interests.forEach(interest => {
          output += interest + " ";
        });
    
        return output;
      }
    
    const cardStyles = {
        marginBottom : "3%"
    }
    
    return (
        <div style = {{display: "flex", flexDirection: "column"}}> 
            {users.map(user => 
                <Grid style = {cardStyles} key = {user.id}>
                    <PersonCard title = {user.displayName} likes = {formatInterests(user.interests)} connected = {true} img = {user.photoURL} favArtist = {user.favArtist} 
                        favAlbum = {user.favAlbum} id = {user.id}/>
                </Grid> 
            )}
    </div>
    )
}