import React from 'react';
import styled from 'styled-components';

const BackgroundWrapper = styled.div`
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(124deg, #010201, #4f674f);
  background-size: 400% 400%;
  
  -webkit-animation: AnimationName 4s ease infinite;
  -moz-animation: AnimationName 4s ease infinite;
  animation: AnimationName 4s ease infinite;
  
  @-webkit-keyframes AnimationName {
      0%{background-position:50% 0%}
      50%{background-position:51% 100%}
      100%{background-position:50% 0%}
  }
  @-moz-keyframes AnimationName {
      0%{background-position:50% 0%}
      50%{background-position:51% 100%}
      100%{background-position:50% 0%}
  }
  @keyframes AnimationName { 
      0%{background-position:50% 0%}
      50%{background-position:51% 100%}
      100%{background-position:50% 0%}
  }
`

const LoginWrapper = styled.div`
  position: relative;
`


const Title = styled.h1`
  font-size: 7rem;
  font-weight: 700;
  color: white;
  margin-top: 10%;

  @media (max-width: 575.98px) {
    margin-top: 40%;
    font-size: 4rem;
  }


  @media (min-width: 576px) and (max-width: 767.98px) {
    margin-top: 30%;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 30%; 
  }
  
`;

const Heading = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: -1.2rem;
  color: white;

  @media (max-width: 575px) {
    font-size: 0.75rem;
    margin-top: -0.5rem;
  }
`

const Button = styled.button`
  display: inline-block;
  padding: 1.5rem 4rem;
  background: #2D8A40;
  border: none;
  position: relative;
  margin-top: 100px;
  font-family: inherit;
  font-weight: bolder;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 34px;
  transition: background 200ms ease-in-out, 
              transform 150ms ease;

  :hover,
  :focus {
    background: #1db954;
  }

  @media (max-width: 575px) {
    font-size: 0.75rem;
    padding: 1rem 2rem;
  }

  @media (min-width: 576px) {

  }
`

const Anchor = styled.a`
  display: block;
  text-align: center;
  color: white;
  margin-top: 1rem;
`

const Login = (props) => (
  <BackgroundWrapper>
    <LoginWrapper>
      <Title>Historify</Title>
      <Heading>Uncover your music trends from Spotify.</Heading>
      <Heading>Discover new music and artists based on your preferences.</Heading>

      <Button onClick={() => props.authorizeUser()}>LOGIN WITH SPOTIFY ACCOUNT</Button>
      <Anchor href="https://github.com/jl2672/historify" target="_blank">About</Anchor>
    </LoginWrapper>
  </BackgroundWrapper>
);

export default Login;