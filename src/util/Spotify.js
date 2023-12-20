const CLIENT_ID = "74c96dcd96a34e608f83f1479fe7dc47"; // Replace with your Spotify API client ID
const REDIRECT_URI = "http://localhost:5173"; // Replace with your redirect URI

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
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);

      // Clear the parameters from the URL
      window.history.pushState("Access Token", null, "/");

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
      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${term}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${accessToken.status}`);
      }
      const jsonResponse = await response.json();
      if (!jsonResponse.tracks) return [];
      console.log(jsonResponse);

      return jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
    } catch (e) {
      console.error(e);
    }
  },

  // Other Spotify API methods can be added here

  // Example: Save playlist to the user's Spotify account
  async savePlaylist(name, trackUris) {
    const url = `https://api.spotify.com/v1/me`;
    if (!name || !trackUris.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken;
    const headers = { Authorization: `Bearer ${accessToken}` };
    try {
      const response = await fetch(url, { headers });
      const jsonResponse = await response.json();
      const userId = jsonResponse;
      // create new playlist
      const playlistResponse = await fetch(url, {
        headers,
        method: "POST",
        body: JSON.stringify({ name: name }),
      });
      const playlistJsonResponse = await playlistResponse.json();
      const playlistId = playlistJsonResponse.id;

      const addTrackResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
        {
          headers,
          method: "POST",
          body: JSON.stringify({ uri: trackUris }),
        }
      );

      return addTrackResponse;
    } catch (e) {
      console.error(e);
    }
  },
};

export default Spotify;
