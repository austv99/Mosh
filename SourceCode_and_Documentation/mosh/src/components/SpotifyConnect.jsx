import React from 'react';
import * as SpotifyFunctions from '../spotifyFunctions.js'
import Button from '@material-ui/core/Button'

class SpotifyConnect extends React.Component {
    render() {
        return (
          <div className="ConnectSpotify">
            <a href={SpotifyFunctions.spotifyLogin()}>
                <Button>Connect to Spotify</Button>
            </a>
          </div>
        );
      }
}

export default SpotifyConnect;