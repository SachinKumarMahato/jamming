

const CLIENT_ID = '74c96dcd96a34e608f83f1479fe7dc47'; // Replace with your Spotify API client ID
const REDIRECT_URI = 'http://localhost:5173'; // Replace with your redirect URI

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // Check if the access token is in the URL
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      // Clear the access token after it expires
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);

      // Clear the parameters from the URL
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    } else {
      // Redirect the user to Spotify login
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
      window.location = accessUrl;
    }
  },

  // Use the access token to make a request to the Spotify API
  async search(term) {
    const accessToken = Spotify.getAccessToken();
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}` ,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if(!response.ok) {
        throw new Error(`HTTP error! Status: ${accessToken.status}`);
      }
      const jsonResponse = await response.json();
      if(!jsonResponse.tracks) return [];

      return jsonResponse.tracks.item.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }))

    }catch(e){
      console.error(e)
    }
  },
  
  // Other Spotify API methods can be added here

  // Example: Save playlist to the user's Spotify account
  savePlaylist(name, trackUris) {
    if(!name || !trackUris.length){
      return;
    }
    const accessToken = Spotify.getAccessToken;
    const headers = {Authorization: `Bearer ${accessToken}`};
    let userId;
    return fetch(`https://api.spotify.com/v1/me`, {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }
      ).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        })
      })
    })
  }
};

const {search} = Spotify;
console.log(search());

export default Spotify;


