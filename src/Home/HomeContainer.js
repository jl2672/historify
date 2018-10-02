import React, { Component } from 'react';
import { connect } from 'react-redux';

import history from '../history';
import { validateAccessToken } from '../Login/actions';
import { renderHome } from './actions';
import Home from './Home';


class HomeContainer extends Component {
  componentDidMount() {
    this.props.validateAccessToken();
    this.props.renderHome();
  }
  
  render() {
    return (
      <div>

        <Home userData={this.props.userData} />

      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.loginReducer.isLoggedIn,
  userId: state.loginReducer.userId,
  userData: state.homeReducer.userData
});

const mapDispatchToProps = dispatch => ({
  validateAccessToken: () => dispatch(validateAccessToken()),
  renderHome: () => dispatch(renderHome())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);