import { config } from '../utils';
import history from '../history';
// action types
export const INVALID_ACCESS_TOKEN = "INVALID_ACCESS_TOKEN";
export const VALID_ACCESS_TOKEN = "VALID_ACCESS_TOKEN"

// action creators
export const validateAccessToken = () => dispatch => {
  const accessToken = localStorage.getItem("accessToken");

  // access token does not exist
  if (accessToken === null) {
    dispatch({
      type: INVALID_ACCESS_TOKEN
    });
    history.replace('/');
    return;
  }

  const headers = new Headers({
    'Authorization': 'Bearer ' + accessToken
  });

  // access token can't be used anymore
  fetch(config.API_URL + '/me', { headers })
  .then(res => {
    if (res.status !== 200) {
      dispatch({
        type: INVALID_ACCESS_TOKEN
      });
      history.replace('/');
    }
    else {
      return res.json();
    }
  })
  .then(data => {
    dispatch({
      type: VALID_ACCESS_TOKEN,
      payload: data.id
    })
  })
}