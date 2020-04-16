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

import fire from '../config/fire'

const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

export default function SignInModal(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(email);
        // console.log(password);

        fire.auth().signInWithEmailAndPassword(email, password).then((u)=>{
            //Nothing to do here            
        }).catch((error) => {
            alert(error.message);
        });
    }

    return (
        <Dialog open={props.inOpen} onClose={props.handleInClose} aria-labelledby="form-dialog-title" maxWidth='xl'>
            <ThemeProvider theme = {theme}>   
            <DialogTitle id="form-dialog-title" style = {{backgroundColor: "#292b2a", color: "#ffffff"}}>Mosh</DialogTitle>
            <form style = {{backgroundColor: "#292b2a"}} onSubmit = {handleSubmit}>
                <DialogContent>
                    <DialogContentText>
                        Log in to Mosh.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
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
                        onChange = {(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={props.handleInClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" type = "submit">
                        Log In
                    </Button>
                </DialogActions>
            </form>
            </ThemeProvider>
        </Dialog>
    )
}
