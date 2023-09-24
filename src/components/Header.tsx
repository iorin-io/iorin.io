import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Style } from "@material-ui/icons";

const Blank = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 0px;
`;
const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  z-index: 999;
  background-color: #97aaab;
  font-size: 30px;
  color: white;
  padding-left: 50px;
`;

const StyledP = styled.p`
  display: inline-block;
  font-size: 10px;
  padding: 5px;
`;
const StyledDiv = styled.div`
  display: inline-block;
  position: absolute;
  right: 20px;
`;

const StyledA = styled.a`
  color: white;
  font-size: 12px;
`;
const Title = styled.a`
  text-decoration: none;
  color: white;
`;
type HeaderProp = {
  headertext: string;
}

const Header = ({ headertext } : HeaderProp) => {
  return (
    <Blank>
      <StyledHeader>
        <Title href="/">{ headertext }</Title>
        <StyledDiv>
          <StyledP>
            <StyledA href="https://twitter.com/iorin__io" target="_blank">
              Twitter
            </StyledA>
          </StyledP>
          <StyledP>
            <StyledA href="https://www.instagram.com/iorin_io/" target="_blank">
              Instagram
            </StyledA>
          </StyledP>
          <StyledP>
            <StyledA
              href="https://github.com/iorin-io/iorin.io"
              target="_blank"
            >
              Source
            </StyledA>
          </StyledP>
        </StyledDiv>
      </StyledHeader>
    </Blank>
  );
};

export default Header;
