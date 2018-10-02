import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import history from '../history';
import { authorizeUser } from '../utils';
import { validateAccessToken } from './actions';
import Login from './Login';



class LoginContainer extends Component {
  componentDidMount() {

    this.props.validateAccessToken();

  }

  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      history.replace('/home');
    }
  }


  
  render() {
    return (
      <div>
        <Login authorizeUser={() => authorizeUser()} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.loginReducer.isLoggedIn,
  userId: state.loginReducer.userId
});

const mapDispatchToProps = dispatch => ({
  validateAccessToken: () => dispatch(validateAccessToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);