"use client";

import { css } from "../../styled-system/css";
import Image from "next/image";
import { Inknut_Antiqua } from "next/font/google";
import * as motion from "framer-motion/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BottomAppearance } from "../components/BottomAppearance";
import { BackgroundImage } from "../components/BackgroundImage";
import { OnClickSpan } from "../components/OnClickSpan";

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
							base: "3dvh",
							sm: "28px",
						},
						display: "flex",
						flexDirection: "column",
						"& > div": {
							margin: {
								sm: "2.4dvh 0",
								base: "1.8dvh 0",
							},
						},
					})}
				>
					<BottomAppearance order={4}>
						<OnClickSpan
							onClick={() => handleLinkClick("/about")}
							whileHover={{ scale: 1.1 }}
						>
							About
						</OnClickSpan>
					</BottomAppearance>
					<BottomAppearance order={5}>
						<a className={unavailableColor}>Works</a>
					</BottomAppearance>
					<BottomAppearance order={6}>
						<OnClickSpan
							onClick={() => handleLinkClick("/blog")}
							whileHover={{ scale: 1.1 }}
						>
							Blog
						</OnClickSpan>
					</BottomAppearance>
					<BottomAppearance order={7}>
						<a className={unavailableColor}>Photo</a>
					</BottomAppearance>
					<BottomAppearance order={8}>
						<OnClickSpan
							onClick={() => handleLinkClick("/links")}
							whileHover={{ scale: 1.1 }}
						>
							Links
						</OnClickSpan>
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
							base: "6",
							sm: "auto",
						},
						top: {
							base: "-134",
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
						style={{
							maxWidth: "100%",
							height: "auto",
						}}
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

export const containerCss = css({
	margin: "0 auto",
	maxWidth: "800px",
	padding: "32px",
});

export const pageTitleCss = css({
	fontSize: {
		sm: "48px",
		base: "32px",
	},
	marginTop: "24px",
	marginBottom: "32px",
});

export const markdownStyles = css({
	"& h1": {
		fontSize: "28px",
		marginBottom: "16px",
		fontWeight: "bold",
	},
	"& h2": {
		fontSize: "24px",
		marginBottom: "12px",
		fontWeight: "bold",
	},
	"& h3": {
		fontSize: "20px",
		marginBottom: "8px",
		fontWeight: "bold",
	},
	"& h4, & h5": {
		fontSize: "18px",
		marginBottom: "8px",
		fontWeight: "bold",
	},
	"& p": {
		fontSize: "16px",
		marginBottom: "16px",
		lineHeight: "2",
		"& img": {
			display: "block",
			margin: "16px auto",
			maxWidth: "100%",
			height: "auto",
		},
	},
	"& ul": {
		paddingLeft: "24px",
		listStyleType: "disc",
		lineHeight: "2",
	},
	"& ol": {
		paddingLeft: "24px",
		listStyleType: "decimal",
		lineHeight: "2",
	},
	"& a": {
		textDecoration: "underline",
		"&:hover": {},
		lineHeight: "2",
	},
	"& pre": {
		backgroundColor: "#f5f5f5",
		padding: "16px",
		borderRadius: "8px",
		overflowX: "auto",
		marginBottom: "16px",
	},
	"& code": {
		fontFamily: "monospace",
		fontSize: "14px",
		backgroundColor: "#f5f5f5",
		padding: "4px 8px",
		borderRadius: "4px",
	},
	"& blockquote": {
		marginLeft: "16px",
		borderLeft: "4px solid #d0d7de",
		fontStyle: "italic",
		marginBottom: "16px",
	},
	"& table": {
		width: "100%",
		borderCollapse: "collapse",
		marginBottom: "16px",
	},
	"& th, & td": {
		border: "1px solid #d0d7de",
		padding: "8px",
		textAlign: "left",
	},
	"& th": {
		backgroundColor: "#f5f5f5",
		fontWeight: "bold",
	},
	"& img": {
		maxWidth: "100%",
		height: "auto",
		marginBottom: "16px",
		display: "block",
	},
	"& .contains-task-list": {
		listStyle: "none",
		paddingLeft: "0",
	},
	"& .task-list-item": {
		display: "flex",
		alignItems: "center",
		marginBottom: "8px",
	},
	"& .task-list-item input": {
		appearance: "none",
		width: "18px",
		height: "18px",
		borderRadius: "4px",
		marginRight: "8px",
		display: "inline-block",
		position: "relative",
		backgroundColor: "#e0e0e0",
		borderColor: "#a0a0a0",
		"&:checked": {
			backgroundColor: "#2F6F5E",
		},
		"&:checked::after": {
			content: '""',
			position: "absolute",
			top: "2px",
			left: "6px",
			width: "4px",
			height: "8px",
			border: "solid white",
			borderWidth: "0 2px 2px 0",
			transform: "rotate(45deg)",
		},
	},
	"& del": {
		textDecoration: "line-through",
	},
});
