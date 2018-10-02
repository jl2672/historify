import { config } from '../utils';

// action types
export const RENDER_HOME = "RENDER_HOME";

// action creators

/*
 * @return a user object with (important) fields:
 * display_name, images, , id, uri
 */
export const renderHome = () => dispatch => {
  const accessToken = localStorage.getItem("accessToken");
  const url = config.API_URL + '/me'
  const headers = new Headers({
    'Authorization': 'Bearer ' + accessToken
  });
  fetch(url, { headers })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: RENDER_HOME,
        payload: data
      })
    })
}