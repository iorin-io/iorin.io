import Link from "next/link";
import React from "react";
import { css } from "../../styled-system/css";

type HeaderProp = {
  headertext: string;
}

const linkStyle = css({
  color: "white",
  fontSize: "12px",
  padding : "0 5px",
  display: "inline-block",
  verticalAlign: "middle",
  lineHeight: "45px",
})
const linksStyle = css({
  display: "inline-block",
  height: "45px",
  textAlign: "center",
  margin: "0 0 0 auto",
})

const headerStyle = css({
  width: "100%",
  height: "45px",
  backgroundColor: "#97aaab",
  display: "flex",
  padding: "0 20px",
})

const titleStyle = css({
  fontSize: "30px",
  color: "white",
  textDecoration: "none",
  display: "inline-block",
  height: "45px",
  margin: "0 10px",
})

const Header = ({ headertext } : HeaderProp) => {
  return (
    <div>
      <div className={headerStyle}>
        <Link className={titleStyle} href="/">{ headertext }</Link>
        <div className={linksStyle}>
            <a className={linkStyle} href="https://twitter.com/iorin__io" target="_blank">
              Twitter
            </a>
            <a className={linkStyle} href="https://www.instagram.com/iorin_io/" target="_blank">
              Instagram
            </a>
            <a className={linkStyle}
              href="https://github.com/iorin-io/iorin.io"
              target="_blank"
            >
              Source
            </a>
          </div>
      </div>
    </div>
  );
};

export default Header;
