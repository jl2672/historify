import { RENDER_HOME } from './actions';

const initialState = {
  userData: {
    display_name: "guest",
    external_urls: {
      "spotify": ""
    },
    images: [{
      url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    }]
  }
};

export default function(state=initialState, action) {
  switch(action.type) {
    case RENDER_HOME:
      return {
        ...state,
        userData: action.payload
      };
    default:
      return state;
  }
}