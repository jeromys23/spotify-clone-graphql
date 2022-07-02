const { RESTDataSource } = require('apollo-datasource-rest');

class SpotifyAPI extends RESTDataSource {
  constructor() {
    // Always call super()
    super();
    // Sets the base URL for the REST API
    this.baseURL = 'https://api.spotify.com/v1';
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.bearerToken);
  }

  async GetPlaylist(id) {
    return this.get(`playlists/${id}`);
  }

  async GetAlbum(id) {
    return this.get(`albums/${id}`);
  }

  async GetArtist(id) {
    return this.get(`artists/${id}`);
  }

  async GetArtistTopSongs(id) {
    return this.get(`artists/${id}/top-tracks?market=US`);
  }

  async GetArtistAlbums(id) {
      return this.get(`artists/${id}/albums`)
  }

  async GetRecentlyPlayed() {
      return this.get("me/player/recently-played")
  }

  async GetCurrentlyPlaying() {
      return this.get("me/player/currently-playing")
  }

  async GetUserTopTracks(time_range) {
      return this.get(`me/top/tracks?time_range=${time_range}`)
  }

  async GetUserTopArtists(time_range) {
      return this.get(`me/top/artists?time_range=${time_range}`)
  }

  async GetUserLikedSongs() {
      return this.get("me/tracks")
  }
  
  async GetUserPlaylists() {
      return this.get("me/playlists")
  }
  async GetTrackData(id) {
    return this.get(`tracks/${id}`)
  }


  
}

module.exports = SpotifyAPI;