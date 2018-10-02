import { INVALID_ACCESS_TOKEN, VALID_ACCESS_TOKEN } from './actions';

const initialState = {
  isLoggedIn: false,
  userId: 0
};

export default (state=initialState, action) => {
  switch(action.type) {
    case INVALID_ACCESS_TOKEN:
      return {
        isLoggedIn: false,
        userId: 0
      }
    case VALID_ACCESS_TOKEN:
      return {
        isLoggedIn: true,
        userId: action.payload
      }
    default:
      return state;
  }
}