// components/WorksTitle.tsx
import Link from "next/link";
import { css } from "../../styled-system/css";
import { Inknut_Antiqua } from "next/font/google";

const pageTitleCss = css({
	fontSize: {
		sm: "48px",
		base: "32px",
	},
	marginTop: "24px",
	marginBottom: "32px",
});

const Inknut400 = Inknut_Antiqua({
	weight: "400",
	subsets: ["latin"],
});

const BlogTitle = () => {
	return (
		<Link href="/works">
			<h1 className={`${pageTitleCss} ${Inknut400.className}`}>Works</h1>
		</Link>
	);
};

export default BlogTitle;
