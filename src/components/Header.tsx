import Link from "next/link";
import React from "react";
import { css } from "../../styled-system/css";

type HeaderProp = {
  headertext: string;
}

const headerStyle = css({
  backgroundColor: "#97aaab",
  height: "100vh",
  padding: "0 20px",
  position: "fixed",
})

const titleStyle = css({
  fontSize: "30px",
  color: "white",
  textDecoration: "none",
  height: "45px",
  margin: "0 10px",
})

const linkStyle = css({
  color: "white",
  fontSize: "12px",
  padding : "0 5px",
  verticalAlign: "middle",
  lineHeight: "45px",
})
const listStyle = css({
  textAlign: "center",
})

const Header = ({ headertext } : HeaderProp) => {
  return (
    <div>
      <div className={headerStyle}>
        <Link className={titleStyle} href="/">{ headertext }</Link>
        <ul className={listStyle}>
            <li><a className={linkStyle} href="https://twitter.com/iorin__io" target="_blank">
              Twitter
            </a></li>
            <li><a className={linkStyle} href="https://www.instagram.com/iorin_io/" target="_blank">
              Instagram
            </a></li>
            <li><a className={linkStyle}
              href="https://github.com/iorin-io/iorin.io"
              target="_blank"
            >
              Source
            </a></li>
          </ul>
      </div>
    </div>
  );
};

export default Header;
