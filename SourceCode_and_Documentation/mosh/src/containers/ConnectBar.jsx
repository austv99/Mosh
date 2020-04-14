import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';


export default function NavBar () {
    
        return (
            <>
            <AppBar position="fixed" style={{ background:'#303030', boxShadow: 'none'}}>
                <Toolbar>
                <Typography variant="h6" style = {{ flexGrow : 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit '}}>
                    {/* <img src={Mosh} alt="" style = {{paddingTop: "2vh", width: "20vw", height: "20vh"}}/> */}
                    Mosh
                    </Link>
                </Typography>
                </Toolbar>
            </AppBar>

           </>
        )
    
}