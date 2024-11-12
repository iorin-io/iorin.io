import { css } from "../../styled-system/css";
import Image from "next/image";
import background from "../../public/background.webp";
import { Inknut_Antiqua } from "next/font/google";

const Inknut400 = Inknut_Antiqua({
	weight: "400",
	subsets: ["latin"],
});

const backgroundImageStyle = css({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	objectFit: "cover",
	zIndex: -2,
});
const backgroundOverlayStyle = css({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	backgroundColor: "rgba(0, 0, 0, 0.41)", // 41%の黒の不透明度
	zIndex: -1,
});

const color = css({
	color: "#fff",
});

export default function Home() {
	return (
		<div className={`${color} ${Inknut400}`}>
			<Image
				className={backgroundImageStyle}
				src={background}
				alt="background image"
			/>
			<div className={backgroundOverlayStyle} />
			<div>
				<a>About</a>
			</div>
			<div>
				<a>Works</a>
			</div>
			<div>
				<a>Blog</a>
			</div>
			<div>
				<a>Photo</a>
			</div>
			<div>
				<a>Contact</a>
			</div>
		</div>
	);
}
