import Spotify from "spotify-web-api-js";
const spotifyApi = new Spotify();
let globalAccessToken = "";
export function spotifyLogin() {
	const CLIENT_ID = '401c98418bb443c7a5ac8ba2a39dca0a';
	const REDIRECT_URI = 'http://localhost:3000/connect';
	const scopes = [
		"user-modify-playback-state",
		"user-library-read",
		"user-library-modify",
		"playlist-read-private",
		"playlist-modify-public",
        "playlist-modify-private",
        "user-top-read",
        "user-read-recently-played",
        "user-follow-read"
	];
	return (
		"https://accounts.spotify.com/authorize?client_id=" +
		CLIENT_ID +
		"&redirect_uri=" +
		encodeURIComponent(REDIRECT_URI) +
		"&scope=" +
		encodeURIComponent(scopes.join(" ")) +
		"&response_type=token"
	);
}

export function parseLogin() {
	var query = {};
	var e,
		r = /([^&;=]+)=?([^&;]*)/g,
		q = window.location.hash.substring(1);
	// eslint-disable-next-line
	while ((e = r.exec(q))) {
		query[e[1]] = decodeURIComponent(e[2]);
	}
	return query;
}

export function checkAccessToken() {
	const params = parseLogin();
	const accessToken = params.access_token;
	if (!accessToken) {
		return false;
	} else {
		return accessToken;
	}
}

export function setAccessToken(accessToken) {
	//since using spotifyApi as helper library you can set the access code once
	//you get it and then not have to include it in every request
	spotifyApi.setAccessToken(accessToken);
	globalAccessToken = accessToken;
}