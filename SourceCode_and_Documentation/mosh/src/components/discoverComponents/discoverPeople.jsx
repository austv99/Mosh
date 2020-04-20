import React from 'react'
import PersonCard from "./discoverCards/personCard"
import {useEffect} from 'react'
import {fire} from "../../config/fire"

export default function DiscoverPeople() {
    let db = fire.firestore();
    let user = fire.auth().currentUser;

    const [users, setUsers] = React.useState([]); 
    // const [open, setOpen] = React.useState(false);   

    const cardStyles = {
        marginBottom : "3%"
    }

    useEffect(() => {
        var unsub = db.collection("users").onSnapshot(snapShot => {
            let userList = [] 
            
            // console.log("Got data");
            
            snapShot.forEach(doc => {
                if (doc.id !== user.uid && !doc.data().connections.includes(user.uid)) {
                    let userData = doc.data();
                    userData["id"] = doc.id;

                    // console.log(userData);
                    userList.push(userData);
                }
            });
            // console.log(userList);
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
    
    return (
        <div style = {{display: "flex", flexDirection: "column"}}> 
            {users.map(user => 
                <div style = {cardStyles} key = {user.id}>
                    <PersonCard title = {user.displayName} likes = {formatInterests(user.interests)} connected = {false} img = {user.photoURL} favArtist = {user.favArtist} 
                    favAlbum = {user.favAlbum} id = {user.id}
                    />
                </div>
            )}
        </div>
    )
}