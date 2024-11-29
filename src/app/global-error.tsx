"use client";
export const config = { runtime: 'edge' };

import { css } from "../../styled-system/css";
import { Inknut_Antiqua } from "next/font/google";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Inknut400 = Inknut_Antiqua({
	weight: "400",
	subsets: ["latin"],
});

const containerCss = css({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column",
	height: "100dvh",
	width: "100dvw",
	backgroundColor: "#fffaf0",
	textAlign: "center",
});

const headingCss = css({
	fontSize: {
		base: "32px",
		sm: "48px",
	},
	color: "#FF6B6B",
	marginBottom: "16px",
	fontWeight: "bold",
});

const descriptionCss = css({
	fontSize: {
		base: "16px",
		sm: "20px",
	},
	color: "#555",
	marginBottom: "24px",
});

const errorDetailsCss = css({
	fontSize: {
		base: "14px",
		sm: "16px",
	},
	color: "#333",
	backgroundColor: "#FFE5E5",
	padding: "16px",
	borderRadius: "8px",
	border: "1px solid #FF6B6B",
	marginBottom: "24px",
	maxWidth: "80%",
	overflowWrap: "break-word",
});

const buttonCss = css({
	padding: "12px 24px",
	fontSize: "16px",
	color: "#fff",
	backgroundColor: "#2F6F5E",
	border: "none",
	borderRadius: "8px",
	cursor: "pointer",
	"&:hover": {
		backgroundColor: "#1E4C3E",
	},
});

export default function GlobalError({error, reset,}: {  error: Error & { digest?: string }, reset: () => void}) {
	useEffect(() => {
		console.error(error)
	}, [error])
	const router = useRouter();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className={`${containerCss} ${Inknut400.className}`}
		>
			<h1 className={headingCss}>エラーが発生しました</h1>
			{error.message && (
				<div className={errorDetailsCss}>
					<strong>Error:</strong>
					<p>{error.message}</p>
				</div>
			)}
			<button className={buttonCss} onClick={() => reset()}>
				Try again
			</button>
			<button
				className={buttonCss}
				onClick={() => router.push("/")}
			>
				Topページに戻る
			</button>
		</motion.div>
	);
}
