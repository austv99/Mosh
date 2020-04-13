import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Mosh from './mosh.png';


export default function NavBar () {
    const [inOpen, setInOpen] = React.useState(false);
    const [upOpen, setUpOpen] = React.useState(false);

    const handleClickUpOpen = () => {
        setUpOpen(true);
    };

    const handleUpClose = () => {
        setUpOpen(false);
    };

    const handleClickInOpen = () => {
        setInOpen(true);
    };

    const handleInClose = () => {
        setInOpen(false);
    };
    
        return (
            <>
            <AppBar position="fixed" style={{ background:'#000000', opacity:'0.8', boxShadow: 'none'}}>
                <Toolbar>
                <Typography variant="h6" style = {{ flexGrow : 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit '}}>
                    {/* <img src={Mosh} alt="" style = {{paddingTop: "2vh", width: "20vw", height: "20vh"}}/> */}
                    Mosh
                    </Link>
                </Typography>
                <Button color="inherit" style={{textTransform: 'none'}} onClick={handleClickInOpen}>Sign In</Button>
                <Button color="inherit" style={{textTransform: 'none'}} onClick={handleClickUpOpen}>Sign Up</Button>
                </Toolbar>
            </AppBar>
             <Dialog open={inOpen} onClose={handleInClose} aria-labelledby="form-dialog-title" maxWidth='xl'>
             <DialogTitle id="form-dialog-title">Mosh</DialogTitle>
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
               />
               <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                />
             </DialogContent>
             <DialogActions>
               <Button onClick={handleInClose} color="primary">
                 Cancel
               </Button>
               <Button onClick={handleInClose} color="primary">
                 Log In
               </Button>
             </DialogActions>
           </Dialog>
           <Dialog open={upOpen} onClose={handleUpClose} aria-labelledby="form-dialog-title" maxWidth='xl'>
             <div style={{backgroundColor:"#292b2a", color:"#ffffff"}}>
             <DialogTitle id="form-dialog-title">Mosh</DialogTitle>
             <DialogContent>
               <DialogContentText style={{color:"#ffffff"}}>
                We're excited to have you here.
                Sign Up to unlock a new music community.
               </DialogContentText>
               <DialogContentText style={{color:"#ffffff"}}>
                Sign Up to unlock a new music community.
               </DialogContentText>
               <TextField
                 autoFocus
                 margin="dense"
                 id="standard-required"
                 label="Name"
                 type="name"
                 fullWidth
               />
               <TextField
                 margin="dense"
                 id="email"
                 label="Email Address"
                 type="email"
                 fullWidth
               />
               <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                fullWidth
                />
                <TextField
                id="standard-password-input"
                label="Retype Password"
                type="password"
                autoComplete="current-password"
                fullWidth
                />
             </DialogContent>
             <DialogActions>
               <Button onClick={handleUpClose} color="primary">
                 Cancel
               </Button>
               <Button onClick={handleUpClose} color="primary">
                 Sign Up
               </Button>
             </DialogActions>
        
             </div>
           </Dialog>
           </>
        )
    
}