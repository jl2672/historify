import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import _ from 'lodash';
import { withAlert } from 'react-alert';

import { validateAccessToken } from '../Login/actions';
import { getTopArtistsAllTime, getTopArtistsSixMonth, getTopArtistsOneMonth, createRecTracksPlaylist, createRandomTracksPlaylist } from './actions';
import Artists from './Artists';
import NavBar from '../NavBar';


const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
const TopButtonWrapper = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  flex-wrap: wrap;
  margin: -1rem 0 2rem 0;
`

const TopButtonDescription = styled.p`
  color: white;
  font-size: .75rem;
  display: inline;
  max-width: 14rem;
  margin: 0 1rem 0 auto;

  @media (max-width: 575.98px) {
    margin: 0 auto;
  }
`

const CreateButton = styled.button`
  display: inline;
  padding: 1rem 2rem;
  background: #2D8A40;
  border: none;
  position: relative;
  margin: 0 auto 0 1rem;
  font-family: inherit;
  font-weight: bolder;
  color: white;
  font-size: .75rem;
  cursor: pointer;
  border-radius: 2rem;
  transition: background 200ms ease-in-out, 
              transform 150ms ease;

  :hover,
  :focus {
    background: #1db954;
  }

  :disabled {
    :hover,
    :focus {
      cursor: default
    }
    background-color: #cccccc;
    color: #666666;
  }

  @media (max-width: 575.98px) {
    padding: 0.5rem 1rem;
  }
`

const RecButtonWrapper = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 2rem 0 0 0;
`

const RecButtonDescription = styled.p`
  color: white;
  font-size: .75rem;
  display: inline;
  max-width: 14rem;
  margin: 0 1rem 0 auto;

  @media (max-width: 575.98px) {
    margin: 0 auto;
  }
`

const ArtistsContainerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  min-width: 100%;
  background-color: black;
  background-size: cover;
`

const SecondWrapper = styled.div`
  margin: 0 7%;

  @media (max-width: 575.98px) {
    margin: 0 2%;
  }

  @media (min-width: 576px) and (max-width: 767.98px) {
    margin: 0 5%;
  }
`

const ButtonsContainer = styled.div`
  display: table;
  margin: 3rem auto;
  padding: 0 4.5rem 0 4.5rem;
  background: #2E3436;
  border-radius: 1rem;

  @media (max-width: 575.98px) {
    padding: 0rem;
    margin: 2.5rem auto;
  }

  @media (min-width: 576px) and (max-width: 767.98px) {
    margin: 3rem auto;
    padding: 0rem;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin: 3rem auto;
    padding: 0.5rem 2rem;
  }
`

const Button = styled.button`
  flex: 1
  font-family: inherit;
  font-weight: 500;
  background: #2E3436;
  padding: 1.5rem 4rem;
  color: ${props => (props.active===true) ? "#1db954" : "white"};
  border-style: none;
  margin-left: 1rem;
  margin-right: 1rem;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
  text-decoration: none;
  outline: none;
  :hover {
    color: #1db954;
    cursor: pointer;
  }

  @media (max-width: 575.98px) {
    padding: 1rem 0.5rem;
    font-size: 0.25rem;
    margin: 0 1rem;
  }

  @media (min-width: 576px) and (max-width: 767.98px) {
    margin: 0 1rem;
    padding: 1rem 2rem;
    font-size: 0.5rem;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin: 0 1rem;
    padding: 1rem 2rem;
    font-size: 0.5rem;
  }
  
`

const Header = styled.h1`
  color: white;
  text-align: center;
  font-weight: 900;
  font-size: 4rem;


  @media (max-width: 575.98px) {
    font-size: 2.5rem;
  }
`

const HeaderInfo = styled.h4`
  color: white;
  text-align: center;
  font-weight: 500;
  font-size: 1.5rem;
  margin-top: -1.4rem;
  margin-bottom: 5rem;

  @media (max-width: 575.98px) {
    font-size: 1rem;
    margin-top: -0.5rem;
  }
`

const message = 'Playlist created!'


class ArtistsContainer extends Component {
  componentDidMount() {
    this.props.validateAccessToken();
  }
  
  componentDidUpdate() {
    this.props.validateAccessToken();
  }

  recOnClick() {
    this.props.createRecTracksPlaylist(this.props.userId, this.props.activeButton, this.props.artists.items)
    this.props.alert.show(message);
  }

  randOnClick() {
    this.props.createRandomTracksPlaylist(this.props.userId, this.props.activeButton, this.props.artists.items)
    this.props.alert.show(message);
  }
  render() {
    const activeCheck = this.props.activeButton;

    const recDescription = (
      this.props.activeButton
      ? `Make a recommendation playlist that takes up to 5 of your ${this.props.activeButton} top artists and gives you 50 tracks!`
      : "Choose a category to begin!"
    )

    const randomDescription = (
      this.props.activeButton
      ? `Make a playlist that takes up to 5 random artists of your ${this.props.activeButton} top artists and gives you 50 tracks!`
      : "Choose a category to begin!"
    )



    return (
        <ArtistsContainerWrapper>
            <NavBar />
          <Header>TOP ARTISTS</Header>
          <HeaderInfo>Find your most listened to artists.</HeaderInfo>
          <div>
        <TopButtonWrapper>
            <TopButtonDescription>
              {recDescription}
            </TopButtonDescription>
          <CreateButton
            disabled={!this.props.activeButton}
            onClick={() => this.recOnClick()}>
            Create!
          </CreateButton>
          </TopButtonWrapper>
          
          <RecButtonWrapper>
            <RecButtonDescription>
            {randomDescription}
            </RecButtonDescription>
            <CreateButton 
              disabled={!this.props.activeButton}
              onClick={() => this.randOnClick()}>
              Create!
            </CreateButton>
          </RecButtonWrapper>
          </div>
          <SecondWrapper>
            <ButtonsContainer>
              <Button 
                active={activeCheck==="all time"} 
                onClick={() => this.props.getTopArtistsAllTime()}>
                ALL TIME
              </Button>

              <Button 
                active={activeCheck==="six month"} 
                onClick={() => this.props.getTopArtistsSixMonth()}>
                SIX MONTHS
              </Button>

              <Button 
                active={activeCheck==="one month"} 
                onClick={() => this.props.getTopArtistsOneMonth()}>
                ONE MONTH
              </Button>
            </ButtonsContainer>

            <Artists items={this.props.artists.items} />
          </SecondWrapper>
        </ArtistsContainerWrapper>

    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.loginReducer.isLoggedIn,
  artists: state.artistsReducer.artists,
  activeButton: state.artistsReducer.activeButton,
  userId: state.loginReducer.userId
});

const mapDispatchToProps = dispatch => ({
  validateAccessToken: () => dispatch(validateAccessToken()),
  getTopArtistsAllTime: () => dispatch(getTopArtistsAllTime()),
  getTopArtistsSixMonth: () => dispatch(getTopArtistsSixMonth()),
  getTopArtistsOneMonth: () => dispatch(getTopArtistsOneMonth()),
  createRecTracksPlaylist: (userId, activeButton, queryParams) => dispatch(createRecTracksPlaylist(userId, activeButton, queryParams)),
  createRandomTracksPlaylist: (userId, activeButton, queryParams) => dispatch(createRandomTracksPlaylist(userId, activeButton, queryParams))
});

export default connect(mapStateToProps, mapDispatchToProps)(withAlert(ArtistsContainer));