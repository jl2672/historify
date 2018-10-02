import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

import history from '../history';
import { validateAccessToken } from '../Login/actions';

const saveLogin = () => {
  const values = queryString.parse(window.location.hash);
  if (values.access_token) {
    const accessToken = values.access_token;
    localStorage.setItem("accessToken", accessToken);
  }
  else {
    localStorage.removeItem("accessToken");
    history.replace('/');
  }
}

class CallbackContainer extends Component {
  componentDidMount() {
    saveLogin();
    this.props.validateAccessToken();
    history.replace('/home');
  }

  componentWillUnmount() {
    if (!this.props.isLoggedIn) {
      history.replace('/');
    }
  }

  render() {
    return (
      <h1>Callback</h1>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.loginReducer.isLoggedIn
})

const mapDispatchToProps = dispatch => ({
  validateAccessToken: () => dispatch(validateAccessToken())
})

export default connect(mapStateToProps, mapDispatchToProps)(CallbackContainer);