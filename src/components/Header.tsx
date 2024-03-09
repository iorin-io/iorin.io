import Link from "next/link";
import React from "react";
import { css } from "../../styled-system/css";
import headerConfig from "@/config/headerConfig";

type HeaderProp = {
  headerText: string;
  links: { href: string; label: string }[];
}

const headerStyle = css({
  backgroundColor: "#97aaab",
  height: "100vh",
  padding: "10px 20px",
	width: "clamp(130px, 20vw, 170px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
})

const titleStyle = css({
  fontSize: "30px",
  color: "white",
  textDecoration: "none",
  height: "45px",
	textAlign: "center",
})

const linkStyle = css({
  color: "white",
  fontSize: "14px",
  padding : "0 5px",
  verticalAlign: "middle",
  lineHeight: "40px",
})
const listStyle = css({
  textAlign: "center",
})

const externalLinksListStyle = css({
  textAlign: "center",
})

const Header = () => {
  const { headerText, links } = headerConfig;
  return (
    <div>
      <div className={headerStyle}>
        <ul className={listStyle}>
					<li><Link className={titleStyle} href="/">{ headerText }</Link></li>
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.href} className={linkStyle}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className={externalLinksListStyle}>
        <li><Link className={linkStyle} href="https://twitter.com/iorin__io" target="_blank">Twitter</Link></li>
        <li><Link className={linkStyle} href="https://www.instagram.com/iorin_io/" target="_blank">Instagram</Link></li>
        <li><Link className={linkStyle} href="https://github.com/iorin-io" target="_blank">GitHub</Link></li>
      </ul>
      </div>

    </div>
  );
};

export default Header;
