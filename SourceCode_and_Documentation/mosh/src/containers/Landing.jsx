import React from 'react';
import NavBar from './navBarLand';
import Image from './landing_back.png';
import Heart from './heart.svg';
import Sync from './sync.svg';
import Track from './track.svg';

const styles = {
    background: {
        backgroundImage: `url(${Image})`,
        height: '1200px',
        width: '100%',
        textAlign: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center', 
    },
    divContainer: {
        fontFamily: "Lato",
        display: "flex", 
        flexDirection: "column",
        justifyContent: "flex-start",
        color: "#FFFFFF",
        // wordBreak: "break-word",
        // paddingLeft: "100vw",
        // padding: "10vw",
        paddingTop: "15vh",
    },
    block: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#000000",
        background: "rgba(196, 196, 196, 0.3)",
        borderRadius: "10px",
        width: "307px",
        height: "248px",
        left: "152px",
        top: "578px",
        paddingLeft: "2vw",
        paddingRight: "2vw",
        textAlign: "center",
        margin: "10px",
    },
    blockText: {
        margin:"2px",
    },
    blockRow: {
        display: "flex",
        flexWrap: 'wrap',
        margin: "5vh",
        justifyContent: "center",
    },
    image: {
        width: "100px",
        height: "100px",
    }
};
const Landing = (props) => {
    
    return (
        <>
        <NavBar />
        <div style={styles.background}>
            <div style={styles.divContainer}>
                <div>
                <h1>Be with the crowd</h1>
                <h1>anywhere, anytime</h1>
                <h3>A social media focussed on connecting</h3> 
                <h3>you to people through music</h3>
                </div>
                
                <div style={styles.blockRow}>
                <div style={styles.block}>
                    <img style={styles.image} src={Heart} alt="" />
                    <div style={styles.blockText}>
                    <h4>A community built and growing through our love for music</h4>
                    </div>
                </div>
                <div style={styles.block}>
                    <img style={styles.image} src={Track} alt="" />
                    <div style={styles.blockText}>
                    <h4>Keeps track of what you listen to and recommends, for your eyes only</h4>
                    </div>
                </div>
                <div style={styles.block}>
                    <img style={styles.image} src={Sync} alt="" />
                    <div style={styles.blockText}>
                    <h4>Connect your streaming accounts. Enjoy a cross-platform experience with your mates</h4>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Landing;