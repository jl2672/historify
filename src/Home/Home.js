import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import styled from 'styled-components';


const HomeWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  background-color: black;
`

const ProfileImage = styled.img`
  margin-top: 4rem;
`

const Name = styled.h1`
  color: white;
`

const LinkWrapper = styled.div`
  margin: 3rem 0;
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  background: #252A2B;
  padding: 1rem 1rem;
  margin: auto auto;
  border-radius: 0.5rem;
`


const Home = (props) => {
  const userData = props.userData;
  const displayName = userData.display_name || "guest";
  let profilePictureUrl;
  if (userData.images.length === 0) profilePictureUrl = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  else profilePictureUrl = userData.images[0].url
  const profileUrl = userData.external_urls.spotify || "";



  return (
    <>

    <HomeWrapper>
      <NavBar />
      <div>
        <a href={profileUrl} target="_blank">
        <ProfileImage src={profilePictureUrl} alt="Profile picture" />
        </a>

        <Name>Hello {displayName}!</Name>
      </div>
      <LinkWrapper>
        <StyledLink to='/tracks'>
          Check out your top tracks.
        </StyledLink>
      </LinkWrapper>
      <LinkWrapper>
        <StyledLink to='/artists'>
          Or check out your top artists!
        </StyledLink>
      </LinkWrapper>

    </HomeWrapper>
    
    </>
  );
}

export default Home;