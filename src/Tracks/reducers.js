import {
  GET_TOP_TRACKS_ALLTIME,
  GET_TOP_TRACKS_SIXMONTH,
  GET_TOP_TRACKS_ONEMONTH,
  CLEAR_TRACKS
}
from './actions';

const initialState = {
  tracks: {
    items: [
      {
        album: {images: []},
        artists: []
      }
    ]
  },
  activeButton: null
};

export default (state=initialState, action) => {
  switch(action.type) {
    case GET_TOP_TRACKS_ALLTIME:
      return {
        tracks: action.payload,
        activeButton: "all time"
      }
    case GET_TOP_TRACKS_SIXMONTH:
      return {
        tracks: action.payload,
        activeButton: "six month"
      }
    case GET_TOP_TRACKS_ONEMONTH:
      return {
        tracks: action.payload,
        activeButton: "one month"
      }
    case CLEAR_TRACKS:
      return {
        ...state,
        tracks: {
          items: [
            {
              album: {images: []},
              artists: []
            }
          ]
        }
      }
    default:
      return state;
  };
};