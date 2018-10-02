import {
  GET_TOP_ARTISTS_ALLTIME,
  GET_TOP_ARTISTS_SIXMONTH,
  GET_TOP_ARTISTS_ONEMONTH,
  CLEAR_ARTISTS
}
from './actions';

const initialState = {
  artists: {
    items: [
      {
        images: [],
        genres: []
      }
    ]
  },
  activeButton: null,
};

export default (state=initialState, action) => {
  switch(action.type) {
    case GET_TOP_ARTISTS_ALLTIME:
      return {
        artists: action.payload,
        activeButton: "all time"
      }
    case GET_TOP_ARTISTS_SIXMONTH:
      return {
        artists: action.payload,
        activeButton: "six month"
      }
    case GET_TOP_ARTISTS_ONEMONTH:
      return {
        artists: action.payload,
        activeButton: "one month"
      }
    case CLEAR_ARTISTS:
      return {
        ...state,
        artists: {
          items: [
            {
              images: [],
              genres: []
            }
          ]
        }
      };
    default:
      return state;
  };
};