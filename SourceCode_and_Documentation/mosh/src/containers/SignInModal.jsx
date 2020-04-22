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
import { fire , uiConfig} from "../config/fire"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
//Youtube/Google
import App from "../components/Youtube/YoutubeDiscoverMusic"

const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

export default function SignInModal(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showLogin,setShowLogin] = React.useState(false)
    
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
    
    
    const handleGoogleLogin = (e) => {
        e.preventDefault();
        setShowLogin(true)
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
                <DialogContent>
                    <div id="firebaseui_container" lang="en">
                        <div className="firebaseui-container firebaseui-page-provider-sign-in firebaseui-id-page-provider-sign-in firebaseui-use-spinner">
                            <div className="firebaseui-card-content">
                                <ul className="firebaseui-idp-list">
                                    <li className="firebaseui-list-item">
                                        <button className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button" onClick={handleGoogleLogin} data-provider-id="google.com" style={{backgroundColor: "#ffffff"}} data-upgraded=",MaterialButton">
                                            <span className="firebaseui-idp-icon-wrapper">
                                                <img className="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"/>
                                            </span>
                                            <span className="firebaseui-idp-text firebaseui-idp-text-long">Sign in with Google</span>
                                            <span className="firebaseui-idp-text firebaseui-idp-text-short">Google</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <StyledFirebaseAuth uiCallback=
                        {ui => {
                                    console.log(ui)
                                    ui.disableAutoSignIn()
                                }
                        } uiConfig={uiConfig} firebaseAuth={fire.auth()}
                    />
                    {showLogin === true ? <App/> : <div></div>}
                </DialogContent>
                
            </form>
            </ThemeProvider>
        </Dialog>
    )
}
