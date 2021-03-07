import React from 'react';
class Spotify extends React.Component {
constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
        spotifyApi.setAccessToken(token);
    }
    this.state = {
        loggedIn: token ? true : false,
        top: []
    }
}
getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

getTopTracks() {
    spotifyApi.getMyTopArtists()
        .then((response) => {
            response.items.map(obj => this.setState(prevState => ({
                top: [...prevState.top, [obj.name, obj.images[0].url, obj.external_urls.spotify, obj.genres]]
            })))
            // console.log(this.state.top);
        })
}

}

export default Spotify;