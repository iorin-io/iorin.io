import Image from "next/image";
import background from "/public/background.webp";
import { css } from "../../styled-system/css";

const backgroundImageStyle = css({
	position: "relative",
	width: "100%",
	height: "100%",
	zIndex: -2,
});
const backgroundOverlayStyle = css({
	position: "absolute",
	backgroundColor: "rgba(0, 0, 0, 0.41)",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	zIndex: -1,
});

export const BackgroundImage = () => (
	<div>
		<Image
            className={backgroundImageStyle}
            src={background}
            alt="background image"
            fill
            style={{
                objectFit: "cover",
                maxWidth: "100%",
                height: "auto"
            }} />
		<div className={backgroundOverlayStyle} />
	</div>
);
