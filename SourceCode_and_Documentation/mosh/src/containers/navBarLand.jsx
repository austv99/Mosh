import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import SignInModal from "./SignInModal"
import SignUpModal from "./SignUpModal"

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
             
            <SignInModal inOpen = {inOpen} handleInClose = {handleInClose}/> 
            <SignUpModal upOpen = {upOpen} handleUpClose = {handleUpClose}/>
           </>
        )
    
}
