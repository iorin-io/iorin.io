import { css } from "../../styled-system/css";
import Image from "next/image";
import background from "/public/background.webp";
import { Inknut_Antiqua } from "next/font/google";
import * as motion from "framer-motion/client";
import { ReactNode } from "react";

const Inknut400 = Inknut_Antiqua({
	weight: "400",
	subsets: ["latin"],
});

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

const fullScreenSize = css({
	height: "100dvh",
	width: "100dvw",
});

const color = css({
	color: "#fff",
});

const unavailableColor = css({
	color: "#909090",
});

interface BottomAppearanceProps {
	children: ReactNode;
	order: number;
}

const BottomAppearance: React.FC<BottomAppearanceProps> = ({
	children,
	order,
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.5,
				delay: 0.2 * order,
				ease: "easeOut",
			}}
		>
			{children}
		</motion.div>
	);
};

export default function Home() {
	return (
		<div className={`${fullScreenSize} ${color} ${Inknut400.className}`}>
			<motion.div
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
				}}
				transition={{ duration: 1.5, ease: "easeInOut" }}
				className={css({
					width: "100%",
					height: "100%",
				})}
			>
				<Image
					className={backgroundImageStyle}
					src={background}
					alt="background image"
					fill
					style={{ objectFit: "cover" }}
				/>
				<div className={backgroundOverlayStyle} />
			</motion.div>
			<div
				className={css({
					position: "absolute",
					bottom: 0,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-end",
					flexDirection: "row",
					width: "100%",
					padding: "50px",
				})}
			>
				<div
					className={css({
						fontSize: "28px",
						display: "flex",
						flexDirection: "column",
						"& > div": {
							margin: "25px 0",
						},
					})}
				>
					<BottomAppearance order={4}>
						<a className={unavailableColor}>About</a>
					</BottomAppearance>
					<BottomAppearance order={5}>
						<a className={unavailableColor}>Works</a>
					</BottomAppearance>
					<BottomAppearance order={6}>
						<a className={unavailableColor}>Blog</a>
					</BottomAppearance>
					<BottomAppearance order={7}>
						<a className={unavailableColor}>Photo</a>
					</BottomAppearance>
					<BottomAppearance order={8}>
						<a className={unavailableColor}>Contact</a>
					</BottomAppearance>
				</div>
				<div
					className={css({
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					})}
				>
					<BottomAppearance order={9}>
						<Image src="/dere.png" alt="iorin" width={180} height={180} />
					</BottomAppearance>
					<BottomAppearance order={10}>
						<h1 className={css({ fontSize: "38px" })}>iorin.io</h1>
					</BottomAppearance>
				</div>
			</div>
		</div>
	);
}
