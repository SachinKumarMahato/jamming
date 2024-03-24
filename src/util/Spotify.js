import conf from "../conf/conf";
// let accessToken;

// const Spotify = {
//   getAccessToken() {
//     if (accessToken) {
//       return accessToken;
//     }

//     // Check if the access token is in the URL
//     const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
//     const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

//     if (accessTokenMatch && expiresInMatch) {
//       accessToken = accessTokenMatch[1];
//       const expiresIn = Number(expiresInMatch[1]);

//       // Clear the access token after it expires
//       window.setTimeout(() => (accessToken = ""), expiresIn * 1000);

//       // Clear the parameters from the URL
//       window.history.pushState("Access Token", null, "/");

//       return accessToken;
//     } else {
//       // Redirect the user to Spotify login
//       const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
//       window.location = accessUrl;
//     }
//   },

//   // Use the access token to make a request to the Spotify API
//   async search(term) {
//     const accessToken = Spotify.getAccessToken();
//     try {
//       const response = await fetch(
//         `https://api.spotify.com/v1/search?type=track&q=${term}`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${accessToken.status}`);
//       }
//       const jsonResponse = await response.json();
//       if (!jsonResponse.tracks) return [];

//       return jsonResponse.tracks.items.map((track) => ({
//         id: track.id,
//         name: track.name,
//         artist: track.artists[0].name,
//         album: track.album.name,
//         uri: track.uri,
//       }));
//     } catch (e) {
//       console.error(e);
//     }
//   },

//   //  Save playlist to the user's Spotify account
//   async savePlaylist(name, trackUris) {

//     if (!name || !trackUris.length) {
//       return;
//     }
//     const accessToken = Spotify.getAccessToken();
//     const headers = { Authorization: `Bearer ${accessToken}` };
//     try {
//       const response = await fetch(`https://api.spotify.com/v1/me`, { headers: headers });
//       if(!response.ok){
//         console.error(response);
//       }
//       const jsonResponse = await response.json();

//       const userId = jsonResponse.Id;
//       // create new playlist
//       const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
//         headers: headers,
//         method: "POST",
//         body: JSON.stringify({ name: name }),
//       });
//       const playlistJsonResponse = await playlistResponse.json();
//       const playlistId = playlistJsonResponse.id;

//       const addTrackResponse = await fetch(
//         `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
//         {
//           headers: headers,
//           method: "POST",
//           body: JSON.stringify({ uris: trackUris }),
//         }
//       );

//       return addTrackResponse;
//     } catch (e) {
//       console.error(e);
//     }
//   },
// };

// const {search ,savePlaylist} = Spotify;

// console.log(savePlaylist());

// export default Spotify;

const Spotify = {
  authParameter: {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${conf.SpotifyClientID}&client_secret=${conf.SpotifyClientSecret}`,
  },

  async getAccessToken() {
    const url = "https://accounts.spotify.com/api/token"
    try {
      const response = await fetch(url, this.authParameter);
      const { access_token } = await response.json();
      return access_token;
    } catch (error) {
      console.log(error);
    }
  },
};

export default Spotify;