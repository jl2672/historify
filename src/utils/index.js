import queryString from 'query-string';

// Default configuration for Spotify
export const config = {
  API_URL: 'https://api.spotify.com/v1',
  SPOTIFY_AUTHORIZE_URL: 'https://accounts.spotify.com/authorize',
  SPOTIFY_AUTH_SCOPES: 'user-read-recently-played user-top-read playlist-modify-public playlist-read-private',
  SPOTIFY_CLIENT_ID: '99269217d4954906aaa629fecd82c278',
  CALLBACK_URL: `${window.location.origin}/callback`,
  DEFAULT_COUNTRY_CODE: 'US'
};

/*
 * Takes a base url string and a query object and attaches queries onto base url
 * @return a url with base "url" and populated with queries from "query"
 */
export const urlHelper = (url, query) => {
  let queryUrl = url;
  if (query !== null) {
    queryUrl +=
      '?' + 
      Object.keys(query).map(obj => (
        encodeURIComponent(obj) + '=' + encodeURIComponent(query[obj])
      )).join('&');
  }
  return queryUrl;
}



/*
 * TODO
 */
export const apiCallHelper = (urlDetails, queryDetails) => {
  const query = queryString.stringify(queryDetails);
  const url = config.API_URL + urlDetails + '?' + query;
  return url;
}

export const authorizeUser = () => {
  
  const loginOptions = {
    client_id: config.SPOTIFY_CLIENT_ID,
    response_type: 'token',
    redirect_uri: config.CALLBACK_URL,
    scope: config.SPOTIFY_AUTH_SCOPES,
    show_dialog: true
  }

  const authorizeUrl = urlHelper(config.SPOTIFY_AUTHORIZE_URL, loginOptions);

  window.location.href = authorizeUrl;
}

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
}