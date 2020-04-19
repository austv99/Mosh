import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import { fire } from '../config/fire'

const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

export default function SignUpModal(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        fire.auth().createUserWithEmailAndPassword(email, password).then(user => {
          fire.auth().currentUser.updateProfile({
            displayName: name,
            photoURL: "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png",
          })

          fire.firestore().collection("users").doc(fire.auth().currentUser.uid).set({
            connections: [],
            displayName: name,
            favAlbum: "Placeholder Text for fav album",
            favArtist: "Placeholder for user's fav artist",
            interests: ["Placholder 1", "Placeholder 2"],
            photoURL: "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png",
          }, {merge: true}).catch( err => {
            console.log(err.message);
          })
        })
        .catch((err) => {
            console.log(err.message);
        })
        
    }

    return (
        <Dialog open={props.upOpen} onClose={props.handleUpClose} aria-labelledby="form-dialog-title" maxWidth='xl'>
            <ThemeProvider theme = {theme}>
             <form style = {{backgroundColor: "#292b2a"}} onSubmit = {handleSubmit}>
             <DialogTitle id="form-dialog-title" style = {{color: "#ffffff"}}>Mosh</DialogTitle>


             <DialogContent>

              <DialogContentText>
              We're excited to have you here.
              Sign Up to unlock a new music community.
              </DialogContentText>

              <DialogContentText>
              Sign Up to unlock a new music community.
              </DialogContentText>

              <TextField
                  autoFocus
                  id="standard-required"
                  label="Name"
                  type="name"
                  fullWidth
                  onChange = {(e) => {
                      setName(e.target.value);
                  }}
              />
              <TextField
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                onChange = {(e) => {
                    setEmail(e.target.value);
                }}
              />
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                fullWidth
                onChange = {(e) => {
                    setPassword(e.target.value);
                }}
              />
              {/* <TextField
                id="standard-password-input"
                label="Retype Password"
                type="password"
                autoComplete="current-password"
                fullWidth
              /> */}
              </DialogContent>
             <DialogActions>
               <Button onClick={props.handleUpClose} color="primary">
                 Cancel
               </Button>
               <Button onClick={handleSubmit} color="primary" type = "submit">
                 Sign Up
               </Button>
             </DialogActions>

             </form>
             </ThemeProvider>
        </Dialog>
    )
}
