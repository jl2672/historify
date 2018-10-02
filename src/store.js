import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import loginReducer from './Login/reducers';
import homeReducer from './Home/reducers';
import artistsReducer from './Artists/reducers';
import tracksReducer from './Tracks/reducers';
import {reducer as burgerMenu} from 'redux-burger-menu';

// combine reducers
const rootReducer = combineReducers({
  loginReducer,
  homeReducer,
  artistsReducer,
  tracksReducer,
  burgerMenu
});

// create initial state
const initialState = {};

// setup redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// enumerate middleware
const middleware = [thunk];

// create store
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
);

export default store;