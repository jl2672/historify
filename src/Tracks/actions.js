import { apiCallHelper, getAccessToken, config } from '../utils';
import { INVALID_ACCESS_TOKEN } from '../Login/actions';
import _ from 'lodash';

// Action Types
export const GET_TOP_TRACKS_ALLTIME = "GET_TOP_TRACKS_ALLTIME";
export const GET_TOP_TRACKS_SIXMONTH = "GET_TOP_TRACKS_SIXMONTH";
export const GET_TOP_TRACKS_ONEMONTH = "GET_TOP_TRACKS_ONEMONTH";
export const CLEAR_TRACKS = "CLEAR_TRACKS";
export const CREATE_TOP_ARTISTS_PLAYLIST = "CREATE_TOP_ARTISTS_PLAYLIST";
export const CREATE_REC_TRACKS_PLAYLIST = "CREATE_REC_TRACKS_PLAYLIST";
export const CREATE_PLAYLIST_SUCCESS = "CREATE_PLAYLIST_SUCCESS";


// Action creators

export const getTopTracksAllTime = () => dispatch => {
  dispatch({
    type: CLEAR_TRACKS
  });
  const url = apiCallHelper(
    '/me/top/tracks', 
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
        type: GET_TOP_TRACKS_ALLTIME,
        payload: data
      });
    })
    .catch(() => {
      dispatch({
        type: INVALID_ACCESS_TOKEN
      });
    });
};

export const getTopTracksSixMonth = () => dispatch => {
  dispatch({
    type: CLEAR_TRACKS
  });
  const url = apiCallHelper(
    '/me/top/tracks', 
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
        type: GET_TOP_TRACKS_SIXMONTH,
        payload: data
      });
    })
    .catch(() => {
      dispatch({
        type: INVALID_ACCESS_TOKEN
      });
    });
};

export const getTopTracksOneMonth = () => dispatch => {
  dispatch({
    type: CLEAR_TRACKS
  });
  const url = apiCallHelper(
    '/me/top/tracks', 
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
        type: GET_TOP_TRACKS_ONEMONTH,
        payload: data
      });
    })
    .catch(() => {
      dispatch({
        type: INVALID_ACCESS_TOKEN
      });
    });
};

export const clearTracks = () => dispatch => {
  dispatch({
    type: CLEAR_TRACKS
  });
};


export const createTopTracksPlaylist = (userId, playlistType, bodyInfo) => dispatch => {
  
  if (bodyInfo.length === 0 || playlistType === null) {
    dispatch({
      type: NO_CONTENT,
    })
    return;
  }
  const url = config.API_URL + `/users/${userId}/playlists`;
  const name = `Top ${playlistType} tracks`;
  const body = {
    name
  };

  const headers = new Headers({
    'Authorization': 'Bearer ' + getAccessToken(),
    'Content-Type': "application/json",
  });

  // Create playlist
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

    // Put tracks in playlist
    .then(data => {
      const playlistId = data.id;
      const url = config.API_URL + `/playlists/${playlistId}/tracks`
      const headers = new Headers({
        'Authorization': 'Bearer ' + getAccessToken(),
        'Content-Type': "application/json",
      });
      const body = {
        "uris": bodyInfo.map(item => item.uri)
      }
      fetch(url, { 
        method: "POST",
        headers,
        body: JSON.stringify(body)
      })
      .then(res => {
        if (res.status !== 201) {
          alert("PLAYLIST CREATED");
          throw new Error('ERROR TRACKS');
        }
      })
      .catch(() => {
        dispatch({
          type: INVALID_ACCESS_TOKEN
        });
      });
    })
    .catch(() => {
      dispatch({
        type: INVALID_ACCESS_TOKEN
      });
    });
}

export const createRecTracksPlaylist = (userId, playlistType, queryParams) => dispatch => {
  if (queryParams.length === 0 || playlistType === null) {
    dispatch({
      type: NO_CONTENT,
    })
    return;
  }

  const url = config.API_URL + `/users/${userId}/playlists`;
  const name = `Recommendation from top ${playlistType} tracks`;
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

      const seed_tracks = queryParams.length > 4 
                  ? queryParams.slice(0, 4).map(track => track.id).join(',')
                  : queryParams.map(track => track.id).join(',')
  
      const url = apiCallHelper(
        '/recommendations', 
        {seed_tracks: seed_tracks, limit: 50}
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
              alert("PLAYLIST CREATED");
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

      const seed_tracks = queryParams.length > 4 
                  ? _.sampleSize(queryParams, 5).map(track => track.id).join(',')
                  : queryParams.map(track => track.id).join(',')
  
      const url = apiCallHelper(
        '/recommendations', 
        {seed_tracks: seed_tracks, limit: 50}
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