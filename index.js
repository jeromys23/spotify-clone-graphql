const { ApolloServer, gql } = require('apollo-server');
const SpotifyAPI = require('./spotify-api')

//Spotify Type Schema
const typeDefs = gql`

  type Playlist {
      id: String,
      images: [Image]
      followers: FollowerCount
      tracks: TracklistWithContext
      name: String
      type: String
      uri: String
      owner: Person
  }

  type Person {
    display_name: String
  }

  type Album {
    id: String
    images: [Image]
    name: String
    followers: FollowerCount
    release_date: String
    uri: String
    type: String
    artists: [Artist]
    tracks: Tracklist
    total_tracks: Int
  }

  type ArtistAlbums {
      items: [Album]
      total: Int
  }

  type Artist {
      id: String
      images: [Image]
      name: String
      followers: FollowerCount
      uri: String
      type: String
  }
  
  type Image {
    url: String
    height: Int
    width: Int
  }

  type TracklistWithContext {
      items: [TrackData]
      total: Int
  }

  type Tracklist {
      items: [Track]
      tracks: [Track]
  }

  type ArtistList {
    items: [Artist]
  }

  type PlaylistList {
    items: [Playlist]
  }

  type TrackData {
      track: Track
      added_at: String
  }

  type Track {
    album: Album
    artists: [Artist]
    id: String
    name: String
    uri: String
    duration_ms: Int
  }

  type FollowerCount {
      total: Int
  }


  type Query {
    Playlist(id: String): Playlist
    Album(id: String): Album
    Artist(id: String): Artist
    ArtistTopSongs(id: String): Tracklist
    ArtistAlbums(id: String): ArtistAlbums
    RecentlyPlayed: Tracklist
    CurrentlyPlaying: Track
    UserTopTracks(time_range: String): Tracklist
    UserTopArtists(time_range: String): ArtistList
    UserLikedSongs: TracklistWithContext
    UserPlaylists: PlaylistList
  }
`;

const resolvers = {
    Query: {
      Playlist: async (_, { id }, { dataSources }) => {
        return dataSources.spotifyAPI.GetPlaylist(id);
      },
      Album: async (_, { id }, { dataSources }) => {
        return dataSources.spotifyAPI.GetAlbum(id);
      },
      Artist: async (_, { id }, { dataSources }) => {
        return dataSources.spotifyAPI.GetArtist(id);
      },
      ArtistTopSongs: async (_, { id }, { dataSources }) => {
        return dataSources.spotifyAPI.GetArtistTopSongs(id);
      },
      ArtistAlbums: async (_, { id }, { dataSources }) => {
        return dataSources.spotifyAPI.GetArtistAlbums(id);
      },
      RecentlyPlayed: async (_, __, { dataSources }) => {
        return dataSources.spotifyAPI.GetRecentlyPlayed();
      },
      CurrentlyPlaying: async (_, __, { dataSources }) => {
        return dataSources.spotifyAPI.GetCurrentlyPlaying();
      },
      UserTopTracks: async (_, { time_range }, { dataSources }) => {
        return dataSources.spotifyAPI.GetUserTopTracks(time_range);
      },
      UserTopArtists: async (_, { time_range }, { dataSources }) => {
        return dataSources.spotifyAPI.GetUserTopArtists(time_range);
      },
      UserLikedSongs: async (_, __, { dataSources }) => {
        return dataSources.spotifyAPI.GetUserLikedSongs();
      },
      UserPlaylists: async(_, __, { dataSources }) => {
        return dataSources.spotifyAPI.GetUserPlaylists();
      }
    },
  };


  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    context: ({ req }) => {
        const bearerToken = req.headers.authorization || '';
        return { bearerToken }
    },
    dataSources: () => {
      return {
        spotifyAPI: new SpotifyAPI(),
      };
    },
  });


  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`
      🚀  Server is ready at ${url}
      📭  Query at https://studio.apollographql.com/dev
    `);
  });