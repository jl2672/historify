import React from 'react';
import styled, { keyframes } from 'styled-components';


const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const TracksWrapper = styled.div`

`



const Element = styled.a`
  animation-name: ${fadeIn}; 
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
  animation-duration: 0.5s;
  display: flex;
  text-decoration: none;
  border-radius: 10px;
  -webkit-transition: ease-out .2s;
  transition: ease-out .2s;
  :hover {
    background: #2D302D;
    cursor: pointer;
  }
`

const Num = styled.span`
  color: white;
  padding-top: 35px;
  padding-bottom: 30px;
  min-width: 40px;
  text-align: center;
`

const Title = styled.span`
  display: block;
  margin-top: -5px;
  color: white;
  font-weight: 800;

  @media (max-width: 575.98px) {
    font-size: 0.77rem;
  }
`

const Cover = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border-radius: 7px;
  float: left;
  min-width: 3rem;
  max-width: 3rem;
  min-height: 4rem;
  max-height: 4rem;
  margin-top: 0.6rem;
`

const InfoDiv = styled.div`
  margin-left: 30px;
  padding-top: 30px;
  padding-bottom: 1rem;
`

const Info = styled.span`
  display: block;
  color: white;
  font-weight: 300;

  @media (max-width: 575.98px) {
    font-size: 0.77rem;
  }
`

const Tracks = (props) => (
  <TracksWrapper>
    {props.items.map(item => {
        let coverUrl;

        if (item.album.images.length === 0) coverUrl = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        else coverUrl = item.album.images[1].url
      
      if (item.uri) {
      return (
        <Element key={props.items.indexOf(item)} href={item.uri || ""}>
        <Num>{props.items.indexOf(item)+1}</Num>       
        <Cover style={{backgroundImage: `url(${coverUrl})`}}></Cover>
        <InfoDiv>
        <Title>{item.name || ""}</Title>
        <Info>{item.artists.map(artist => artist.name).join(', ') || ""}</Info>
        </InfoDiv>
      </Element>
      ) 
    }
    })}
  </TracksWrapper>
  );

export default Tracks;