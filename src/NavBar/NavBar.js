import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components';

const NavWrapper = styled.div`
  background-color: LightGray;
  height: 2.65rem;
  text-align: center;
  position: relative;
`

const UnorderedList = styled.ul`
  list-style-type: none;
  margin: 0;
  height: 2.65rem;
  text-align: center;
  background-color: black;
  overflow: hidden;
  opacity: 0.8;
  position: fixed;
  min-width: 100%;
  z-index: 9996;


`

const ListElement = styled.li`
  text-align: center;
  display: inline;
  @media (max-width : 800px) {
    display: none;
  }
`

const Anchor = styled.a`
  height: 2rem;
  font-size: 0.85rem;
  font-weight: 300;
  line-height: 2.65rem;
  color: white;
  text-align: center;
  padding: 5rem 3rem;
  text-decoration: none;
  :hover {
    color: gray;
  }
`

const HamburgerMenu = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: -1rem;
  z-index: 9997;

  :hover,
  :focus {
    cursor: pointer;
  }

  @media (min-width : 800px) {
    display: none;
  }
`

const HamburgerLine1 = styled.div`
  width: 2rem;
  height: 0.2rem;
  background-color: white;
  margin-bottom: 0.3rem;
`

const HamburgerLine2 = styled.div`
  width: 2rem;
  height: 0.2rem;
  background-color: white;
  margin: 0.3rem 0;
`

const HamburgerLine3 = styled.div`
  width: 2rem;
  height: 0.2rem;
  background-color: white;
  margin-top: 0.3rem;
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.93;
  }
`

const ResponsiveMenu = styled.div`
  animation-name: ${fadeIn}; 
  animation-timing-function: ease-in-out;
  animation-duration: 0.5s;
  position: fixed; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0; 
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  z-index: 9998;
  background-color: black;
  color: white;
  text-align: center;
`
const MobileMenuClose = styled.div`
  height: 2rem;
  float: right;
  font-weight: 700;
  font-size: 1.3rem;
  margin: 1.8rem;
  :hover,
  :focus {
    cursor: pointer;
  }
` 

const MobileAnchor = styled.a`
  line-height: 5rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  text-align: center;
  text-decoration: none;
  :hover {
    color: gray;
  }

`

const MobileList = styled.ul`
  text-align: center;
  list-style-type: none;
  margin: 6rem auto 0 auto;
  padding: 0;
`

const MobileListElement = styled.li`
  text-align: center;
  color: white;
` 

const SecondWrapper = styled.div`

`

const Logout = () => {
  localStorage.removeItem("accessToken");
}



class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  }


  
  render() {
    let mobileMenu;

    if (this.state.isOpen) {
      mobileMenu = (
        <ResponsiveMenu>
            <MobileMenuClose onClick={() => this.handleClick()}>X</MobileMenuClose>
            <MobileList>
              <MobileListElement><MobileAnchor href="/home">Home</MobileAnchor></MobileListElement>
              <MobileListElement><MobileAnchor href="/tracks">Top Tracks</MobileAnchor></MobileListElement>
              <MobileListElement><MobileAnchor href="/artists">Top Artists</MobileAnchor></MobileListElement>
              <MobileListElement><MobileAnchor href="/" onClick={() => Logout()}>Logout</MobileAnchor></MobileListElement>
              <MobileListElement><MobileAnchor href="https://github.com/jl2672" target="_blank">About</MobileAnchor></MobileListElement>
            </MobileList>
        </ResponsiveMenu>
      )
    }
    return (
      <>
      <NavWrapper>
          {mobileMenu}
        <UnorderedList>
          <HamburgerMenu onClick={() => this.handleClick()}>
              <HamburgerLine1></HamburgerLine1>
              <HamburgerLine2></HamburgerLine2>
              <HamburgerLine3></HamburgerLine3>
          </HamburgerMenu>
          <ListElement><Anchor href="/home">Home</Anchor></ListElement>
          <ListElement><Anchor href="/tracks">Top Tracks</Anchor></ListElement>
          <ListElement><Anchor href="/artists">Top Artists</Anchor></ListElement>
          <ListElement><Anchor href="/" onClick={() => Logout()}>Logout</Anchor></ListElement>
          <ListElement><Anchor href="https://github.com/jl2672" target="_blank">About</Anchor></ListElement>
        </UnorderedList>




      </NavWrapper>
      </>
    )
  }
}




export default NavBar;