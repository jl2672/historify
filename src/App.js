import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import history from './history';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import store from './store';
import Login from './Login';
import Callback from './Callback'
import Home from './Home';
import Artists from './Artists';
import Tracks from './Tracks';


const AppWrapper = styled.div`
  font-family: "Montserrat", sans-serif;
`

const options = {
  offset: '1rem',
  position: 'bottom center',
  timeout: 3000,
  type: 'success',
  transition: 'fade',
  zIndex: 9999
};


class App extends Component {
  render() {
    return (
      <AppWrapper>
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...options}>
            <Router history={history}>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/callback" component={Callback} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/artists" component={Artists} />
                <Route exact path="/tracks" component={Tracks} />
              </Switch>
            </Router>
          </AlertProvider>
        </Provider>
      </AppWrapper>
    );
  }
}

export default App;