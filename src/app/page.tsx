"use client";

import { css } from "../../styled-system/css";
import Image from "next/image";
import { Inknut_Antiqua } from "next/font/google";
import * as motion from "framer-motion/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BottomAppearance } from "../components/BottomAppearance";
import { BackgroundImage } from "../components/BackgroundImage";

const Inknut400 = Inknut_Antiqua({
	weight: "400",
	subsets: ["latin"],
});

const fullScreenSize = css({
	height: "100dvh",
	width: "100dvw",
	overflow: "hidden",
});

const mainCss = css({
	color: "#fff",
	userSelect: "none",
});

const unavailableColor = css({
	color: "#909090",
});

const FadeLink: React.FC<{
	children: React.ReactNode;
	className?: string;
	onClick: () => void;
}> = ({ children, onClick, className }) => {
	return (
		<motion.div whileHover={{ scale: 1.1 }}>
			<span
				onClick={onClick}
				className={`${className} ${css({ cursor: "pointer" })}`}
			>
				{children}
			</span>
		</motion.div>
	);
};

export default function Home() {
	const router = useRouter();
	const [isExiting, setIsExiting] = useState(false);

	const handleLinkClick = (href: string) => {
		setIsExiting(true);
		setTimeout(() => {
			router.push(href);
		}, 500);
	};

	useEffect(() => {
		const preventScroll = (event: { preventDefault: () => void }) => {
			event.preventDefault();
		};
		document.body.addEventListener("touchmove", preventScroll, {
			passive: false,
		});
		document.body.addEventListener("wheel", preventScroll, {
			passive: false,
		});
		return () => {
			document.body.removeEventListener("touchmove", preventScroll);
			document.body.removeEventListener("wheel", preventScroll);
		};
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: isExiting ? 0 : 1 }}
			transition={{ duration: 0.5 }}
			className={`${fullScreenSize} ${mainCss} ${Inknut400.className}`}
		>
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
				<BackgroundImage />
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
					height: "100dvh",
				})}
			>
				<div
					className={css({
						fontSize: {
							base: "18px",
							sm: "28px",
						},
						display: "flex",
						flexDirection: "column",
						"& > div": {
							margin: {
								sm: "25px 0",
								base: "10px 0",
							},
						},
					})}
				>
					<BottomAppearance order={4}>
						<FadeLink onClick={() => handleLinkClick("/about")}>About</FadeLink>
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
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1.5, delay: 0.5 }}
					className={css({
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						position: {
							base: "absolute",
							sm: "static",
						},
						right: {
							base: "0",
							sm: "auto",
						},
						top: {
							base: "-130",
							sm: "auto",
						},
					})}
				>
					<Image
						src="/dere.png"
						alt="iorin"
						onClick={() => handleLinkClick("/about")}
						width={180}
						height={180}
						className={css({
							cursor: "pointer",
							visibility: {
								base: "hidden",
								sm: "visible",
							},
						})}
					/>

					<h1
						className={css({
							fontSize: {
								base: "32px",
								sm: "38px",
							},
						})}
					>
						iorin.io
					</h1>
				</motion.div>
			</div>
		</motion.div>
	);
}
