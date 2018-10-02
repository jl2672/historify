import { apiCallHelper, getAccessToken, config } from '../utils';
import { INVALID_ACCESS_TOKEN } from '../Login/actions';
import _ from 'lodash';

// Action Types
export const GET_TOP_ARTISTS_ALLTIME = "GET_TOP_ARTISTS_ALLTIME";
export const GET_TOP_ARTISTS_SIXMONTH = "GET_TOP_ARTISTS_SIXMONTH";
export const GET_TOP_ARTISTS_ONEMONTH = "GET_TOP_ARTISTS_ONEMONTH";
export const CLEAR_ARTISTS = "CLEAR_ARTISTS";

// Action creators
export const getTopArtistsAllTime = () => dispatch => {
  dispatch({
    type: CLEAR_ARTISTS
  });
  const url = apiCallHelper(
    '/me/top/artists', 
    {limit: 50, time_range: "long_term"}
  );

  const headers = new Headers({
    'Authorization': 'Bearer ' + getAccessToken()
  });

  fetch(url, { headers })
    .then(res => {
      if (res.status !== 200) {
        throw new Error('bad request');
      }
      else {
        return res.json();
      }
    })
    .then(data => {
      dispatch({
        type: GET_TOP_ARTISTS_ALLTIME,
        payload: data
      });
    })
    .catch(() => {
      dispatch({
        type: INVALID_ACCESS_TOKEN
      });
    });
};

export const getTopArtistsSixMonth = () => dispatch => {
  dispatch({
    type: CLEAR_ARTISTS
  });
  const url = apiCallHelper(
    '/me/top/artists', 
    {limit: 50, time_range: "medium_term"}
  );

  const headers = new Headers({
    'Authorization': 'Bearer ' + getAccessToken()
  });

  fetch(url, { headers })
  .then(res => {
    if (res.status !== 200) {
      throw new Error('bad request');
    }
    else {
      return res.json();
    }
  })
  .then(data => {
    dispatch({
      type: GET_TOP_ARTISTS_SIXMONTH,
      payload: data
    });
  })
  .catch(() => {
    dispatch({
      type: INVALID_ACCESS_TOKEN
    });
  });
};

export const getTopArtistsOneMonth = () => dispatch => {
  dispatch({
    type: CLEAR_ARTISTS
  });
  const url = apiCallHelper(
    '/me/top/artists', 
    {limit: 50, time_range: "short_term"}
  );

  const headers = new Headers({
    'Authorization': 'Bearer ' + getAccessToken()
  });

  fetch(url, { headers })
  .then(res => {
    if (res.status !== 200) {
      throw new Error('bad request');
    }
    else {
      return res.json();
    }
  })
  .then(data => {
    dispatch({
      type: GET_TOP_ARTISTS_ONEMONTH,
      payload: data
    });
  })
  .catch(() => {
    dispatch({
      type: INVALID_ACCESS_TOKEN
    });
  });
};



export const createRecTracksPlaylist = (userId, playlistType, queryParams) => dispatch => {
  if (queryParams.length === 0 || playlistType === null) {
    return;
  }

  const url = config.API_URL + `/users/${userId}/playlists`;
  const name = `Recommendation playlist from top ${playlistType} artists`;
  const body = {
    name
  };

  const headers = new Headers({
    'Authorization': 'Bearer ' + getAccessToken(),
    'Content-Type': "application/json",
  });

  // Create Playlist
  fetch(url, { 
    method: "POST",
    headers,
    body: JSON.stringify(body)
    })
    .then(res => {
      if (res.status === 200 || res.status === 201) {
        return res.json();
      }
      else {
        throw new Error('ERROR PLAYLIST')
      }
    })

    // Get tracks
    .then(data => {
      const playlistId = data.id;

      const seed_artists = queryParams.length > 4 
                  ? queryParams.slice(0,4).map(track => track.id).join(',')
                  : queryParams.map(artist => artist.id).join(',')
  
      const url = apiCallHelper(
        '/recommendations', 
        {seed_artists: seed_artists, limit: 50}
      );

      const headers = new Headers({
        'Authorization': 'Bearer ' + getAccessToken()
      });

      fetch(url, { headers })
        .then(res => {
          if (res.status !== 200) {
            throw new Error('bad request');
          }
          else {
            return res.json();
          }
        })

        // Put tracks in playlist
        .then(data => {
          const tracks = data.tracks.map(track => track.uri)

          const url = config.API_URL + `/playlists/${playlistId}/tracks`
          const headers = new Headers({
            'Authorization': 'Bearer ' + getAccessToken(),
            'Content-Type': "application/json",
          });
          const body = {
            "uris": tracks
          }
          fetch(url, { 
            method: "POST",
            headers,
            body: JSON.stringify(body)
          })
          .then(res => {
            if (res.status !== 201) {
              throw new Error('ERROR TRACKS');
            }
          })
          .catch(() => {
            dispatch({
              type: INVALID_ACCESS_TOKEN
            });
          })
        })
        .catch(() => {
          dispatch({
            type: INVALID_ACCESS_TOKEN
          });
        })
    })
    .catch(() => {
      dispatch({
        type: INVALID_ACCESS_TOKEN
      });
    })
};

export const createRandomTracksPlaylist = (userId, playlistType, queryParams) => dispatch => {
  if (queryParams.length === 0 || playlistType === null) {
    return;
  }

  const url = config.API_URL + `/users/${userId}/playlists`;
  const name = `Recommendation from random ${playlistType} tracks`;
  const body = {
    name
  };

  const headers = new Headers({
    'Authorization': 'Bearer ' + getAccessToken(),
    'Content-Type': "application/json",
  });

  // Create Playlist
  fetch(url, { 
    method: "POST",
    headers,
    body: JSON.stringify(body)
    })
    .then(res => {
      if (res.status === 200 || res.status === 201) {
        return res.json();
      }
      else {
        throw new Error('ERROR PLAYLIST')
      }
    })

    // Get tracks
    .then(data => {
      const playlistId = data.id;

      const seed_artists = queryParams.length > 4 
                  ? _.sampleSize(queryParams, 5).map(track => track.id).join(',')
                  : queryParams.map(track => track.id).join(',')
  
      const url = apiCallHelper(
        '/recommendations', 
        {seed_artists: seed_artists, limit: 50}
      );

      const headers = new Headers({
        'Authorization': 'Bearer ' + getAccessToken()
      });

      fetch(url, { headers })
        .then(res => {
          if (res.status !== 200) {
            throw new Error('bad request');
          }
          else {
            return res.json();
          }
        })

        // Put tracks in playlist
        .then(data => {
          const tracks = data.tracks.map(track => track.uri)

          const url = config.API_URL + `/playlists/${playlistId}/tracks`
          const headers = new Headers({
            'Authorization': 'Bearer ' + getAccessToken(),
            'Content-Type': "application/json",
          });
          const body = {
            "uris": tracks
          }
          fetch(url, { 
            method: "POST",
            headers,
            body: JSON.stringify(body)
          })
          .then(res => {
            if (res.status !== 201) {
              throw new Error('ERROR TRACKS');
            }
          })
          .catch(() => {
            dispatch({
              type: INVALID_ACCESS_TOKEN
            });
          })
        })
        .catch(() => {
          dispatch({
            type: INVALID_ACCESS_TOKEN
          });
        })
    })
    .catch(() => {
      dispatch({
        type: INVALID_ACCESS_TOKEN
      });
    })
};