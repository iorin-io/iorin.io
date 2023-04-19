import Head from 'next/head';
import Link from 'next/link'
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Style } from '@material-ui/icons';

const Blank = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
`
const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  z-index: 999;
  background-color: #C6C6C6;
  font-size: 30px;
  color: white;
  padding-left: 50px;
`;

const StyledP =styled.p`
  display: inline-block;
  font-size: 10px;
  padding: 5px;
`
const StyledDiv = styled.div`
  display: inline-block;
  position: absolute;
  right: 20px;
`

const StyledA = styled.a`
  color: white;
  font-size: 12px;
`

const Header = () => {

  return (
    <Blank>
    <StyledHeader>
      iorin.io
      <StyledDiv>
          <StyledP>
            <StyledA href="https://twitter.com/iori0705" target="_blank">Twitter</StyledA>
          </StyledP>
          <StyledP>
            <StyledA href="https://www.instagram.com/10ri__75/" target="_blank">Instagram</StyledA>
          </StyledP>
          <StyledP>
            <StyledA href="https://github.com/iori0705" target="_blank">GitHub</StyledA>
          </StyledP>
      </StyledDiv>
    </StyledHeader>
    </Blank>
  );
}

export default Header;
